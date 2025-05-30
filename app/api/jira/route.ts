import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Configuration
const JIRA_API_URL = process.env.JIRA_DOMAIN;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

if (!JIRA_API_URL || !JIRA_EMAIL || !JIRA_API_TOKEN || !JIRA_PROJECT_KEY) {
  throw new Error("Missing Jira configuration");
}

const auth = {
  username: JIRA_EMAIL,
  password: JIRA_API_TOKEN
};

// Error interface for axios error handling
interface JiraApiError {
  response?: { data?: unknown; status?: number };
  message?: string;
}

// GET - Fetch issues
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const jql = searchParams.get("jql") || `project=${JIRA_PROJECT_KEY}`;
  
  try {
    const response = await axios.get(`${JIRA_API_URL}/search`, {
      auth,
      params: {
        jql,
        fields: "summary,description,labels,status"
      }
    });
    return NextResponse.json({ issues: response.data.issues });
  } catch (error) {
    const err = error as JiraApiError;
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: err.response?.status || 500 }
    );
  }
}

// POST - Create issue or transition status
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");
  const data = await req.json();

  try {
    // Handle status transitions
    if (action === "transition") {
      const { issueKey, transitionId } = data;
      await axios.post(
        `${JIRA_API_URL}/issue/${issueKey}/transitions`,
        { transition: { id: transitionId } },
        { auth }
      );
      return NextResponse.json({ success: true });
    }

    // Handle regular issue creation
    const { summary, description, labels } = data;
    const response = await axios.post(
      `${JIRA_API_URL}/issue`,
      {
        fields: {
          project: { key: JIRA_PROJECT_KEY },
          summary,
          description: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: description || "" }
                ]
              }
            ]
          },
          issuetype: { name: "Task" },
          // Sanitize labels: replace spaces with dashes
          labels: (labels || []).map((label: string) => label.replace(/\s+/g, "-")),
        }
      },
      { auth }
    );
    return NextResponse.json({ key: response.data.key });

  } catch (error) {
    const err = error as JiraApiError;
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: err.response?.status || 500 }
    );
  }
}

// DELETE - Remove issue
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const issueKey = searchParams.get("issueKey");

  if (!issueKey) {
    return NextResponse.json(
      { error: "issueKey parameter is required" },
      { status: 400 }
    );
  }

  try {
    await axios.delete(`${JIRA_API_URL}/issue/${issueKey}`, { auth });
    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as JiraApiError;
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: err.response?.status || 500 }
    );
  }
}