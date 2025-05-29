// jiraThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  CreateIssuePayload,
  DeleteIssuePayload,
  MarkDonePayload,
  JiraIssue,
} from "./jiraTypes";

// FETCH ALL ISSUES
export const fetchAllIssues = createAsyncThunk<JiraIssue[]>(
  "jira/fetchAllIssues",
  async () => {
    const response = await axios.get("/api/jira/issues");
    return response.data as JiraIssue[];
  }
);

// CREATE ISSUE
export const createIssue = createAsyncThunk<JiraIssue, CreateIssuePayload>(
  "jira/createIssue",
  async (title) => {
    const response = await axios.post("/api/jira/create", { title });
    return response.data as JiraIssue;
  }
);

// DELETE ISSUE
export const deleteIssue = createAsyncThunk<string, DeleteIssuePayload>(
  "jira/deleteIssue",
  async (issueKey) => {
    await axios.delete(`/api/jira/delete?key=${issueKey}`);
    return issueKey;
  }
);

// MARK ISSUE AS DONE
export const markIssueDone = createAsyncThunk<string, MarkDonePayload>(
  "jira/markDone",
  async (issueKey) => {
    await axios.post("/api/jira/complete", { issueKey });
    return issueKey;
  }
);
