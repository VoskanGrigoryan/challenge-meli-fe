import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createIssue, deleteIssue, markIssueDone } from "./jiraThunks";

interface JiraIssue {
  key: string;
  summary: string;
  status: string;
}

interface JiraState {
  issues: JiraIssue[];
  loading: boolean;
  error: string | null;
}

const initialState: JiraState = {
  issues: [],
  loading: false,
  error: null,
};

const jiraSlice = createSlice({
  name: "jira",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE ISSUE
      .addCase(createIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIssue.fulfilled, (state, action: PayloadAction<JiraIssue>) => {
        state.loading = false;
        state.issues.push(action.payload);
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to create issue";
      })

      // DELETE ISSUE
      .addCase(deleteIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIssue.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.issues = state.issues.filter((i) => i.key !== action.payload);
      })
      .addCase(deleteIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete issue";
      })

      // MARK ISSUE DONE
      .addCase(markIssueDone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markIssueDone.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        const issue = state.issues.find((i) => i.key === action.payload);
        if (issue) issue.status = "Done";
      })
      .addCase(markIssueDone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to update issue status";
      });
  },
});

export default jiraSlice.reducer;