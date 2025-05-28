import axios from "axios";

const JIRA_API_URL = `${process.env.JIRA_DOMAIN}/rest/api/3`;

const auth = {
  username: process.env.JIRA_EMAIL!,
  password: process.env.JIRA_API_TOKEN!,
};

export const createJiraIssue = async (title: string) => {
  const response = await axios.post(
    `${JIRA_API_URL}/issue`,
    {
      fields: {
        project: { key: process.env.JIRA_PROJECT_KEY },
        summary: title,
        issuetype: { name: "Task" },
      },
    },
    { auth }
  );
  return response.data.key; // Returns issue ID like PROJ-123
};
