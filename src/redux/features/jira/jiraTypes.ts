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