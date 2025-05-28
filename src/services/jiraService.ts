import axios from "axios";

const JIRA_API_URL = "https://your-domain.atlassian.net/rest/api/3";
const auth = {
  username: "your@email.com",
  password: "YOUR_API_TOKEN", // From Jira settings
};

export const createJiraIssue = async (title: string) => {
  const response = await axios.post(
    `${JIRA_API_URL}/issue`,
    {
      fields: {
        project: { key: "YOUR_PROJECT_KEY" },
        summary: title,
        issuetype: { name: "Task" },
      },
    },
    { auth }
  );
  return response.data.key; // Returns issue ID like PROJ-123
};
