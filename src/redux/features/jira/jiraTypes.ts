export interface JiraIssue {
  key: string;          // e.g., "PROJ-123"
  summary: string;      // Task title
  status: string;       // e.g., "To Do", "Done"
}

export interface ICreateIssueInput {
  summary: string;
  description?: string;
  labels?: string[];
}

// Add Jira API response types
export interface JiraIssueFields {
  summary: string;
  description?: {
    type: string;
    version: number;
    content: Array<{
      type: string;
      content: Array<{
        type: string;
        text: string;
      }>;
    }>;
  };
  status: {
    self: string;
    description: string;
    iconUrl: string;
    name: string;
    id: string;
    statusCategory: {
      self: string;
      id: number;
      key: string;
      colorName: string;
      name: string;
    };
  };
  labels: string[];
}

export interface JiraIssue {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: JiraIssueFields;
}