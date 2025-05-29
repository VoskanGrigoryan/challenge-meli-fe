export interface JiraIssue {
  key: string;          // e.g., "PROJ-123"
  summary: string;      // Task title
  status: string;       // e.g., "To Do", "Done"
}

// Payload types for thunks
export type CreateIssuePayload = string;  // Title of the issue
export type DeleteIssuePayload = string; // Issue key (e.g., "PROJ-123")
export type MarkDonePayload = string;    // Issue key

export interface JiraError {
  message: string;
  statusCode?: number;
}

export interface ICreateIssueInput {
  summary: string;
  description?: string;
  labels?: string[];
}