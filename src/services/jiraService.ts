import axios from "axios";
import { ICreateIssueInput } from "../redux/features/jira/jiraTypes";

const JIRA_API_URL = process.env.JIRA_DOMAIN;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

if (!JIRA_API_URL) {
  throw new Error("JIRA_DOMAIN environment variable is required");
}
if (!JIRA_EMAIL) {
  throw new Error("JIRA_EMAIL environment variable is required");
}
if (!JIRA_API_TOKEN) {
  throw new Error("JIRA_API_TOKEN environment variable is required");
}

const auth = {
  username: JIRA_EMAIL,
  password: JIRA_API_TOKEN,
};

// Trae todos los issues del proyecto actual (con mas tiempo se podria agregar paginacion)
export const getAllJiraIssues = async (maxResults = 50, startAt = 0) => {
  if (!JIRA_PROJECT_KEY) {
    throw new Error("JIRA_PROJECT_KEY environment variable is required");
  }

  const response = await axios.get(`${JIRA_API_URL}/search`, {
    auth,
    params: {
      jql: `project = ${JIRA_PROJECT_KEY}`,
      maxResults,
      startAt,
      fields: "summary,status,labels",
    },
  });

  return response.data.issues; // Lista de todos los issues
};

export const createJiraIssue = async ({
  summary,
  description,
  labels = [],
}: ICreateIssueInput) => {
  if (!JIRA_PROJECT_KEY) {
    throw new Error("JIRA_PROJECT_KEY environment variable is required");
  }

  const fields = {
    project: { key: JIRA_PROJECT_KEY! },
    issuetype: { name: "Task" },
    summary,
    ...(description && { description }),
    ...(labels.length > 0 && { labels }),
  };

  const response = await axios.post(
    `${JIRA_API_URL}/issue`,
    { fields },
    { auth }
  );

  return response.data.key; // MTM-123 <-- ID del issue creado
};

//Trea posibles IDs para los estados de Jira. Podria hardcodear los IDs pero no seria buena practica / seguro
const getTransitionIdByName = async (issueKey: string, statusName: string) => {
  const res = await axios.get(`${JIRA_API_URL}/issue/${issueKey}/transitions`, {
    auth,
    headers: { Accept: "application/json" },
  });

  const match = res.data.transitions.find(
    (t: any) => t.name.toLowerCase() === statusName.toLowerCase()
  );

  if (!match) throw new Error(`No transition found for status: ${statusName}`);
  return match.id;
};

//Edit tiene que ser un POST porque Jira no permite usar un PUT/PATCH
export const changeIssueStatus = async (
  issueKey: string,
  newStatus: "To Do" | "In Progress" | "Done"
) => {
  const transitionId = await getTransitionIdByName(issueKey, newStatus);

  await axios.post(
    `${JIRA_API_URL}/issue/${issueKey}/transitions`,
    { transition: { id: transitionId } },
    { auth }
  );
};

export const deleteJiraIssue = async (issueKey: string) => {
  await axios.delete(`${JIRA_API_URL}/issue/${issueKey}`, { auth });
  return issueKey;
};
