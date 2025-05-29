import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createIssue, deleteIssue, markIssueDone } from "./jiraThunks";
import { JiraIssue } from "./jiraTypes";

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

const setLoading = (state: JiraState) => {
  state.loading = true;
  state.error = null;
};

const setError = (state: JiraState, action: any, defaultMsg: string) => {
  state.loading = false;
  state.error = action.error.message ?? defaultMsg;
};

const jiraSlice = createSlice({
  name: "jira",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createIssue.pending, setLoading)
      .addCase(
        createIssue.fulfilled,
        (state, action: PayloadAction<JiraIssue>) => {
          state.loading = false;
          state.issues.push(action.payload);
        }
      )
      .addCase(createIssue.rejected, (state, action) =>
        setError(state, action, "Failed to create issue")
      )
      .addCase(deleteIssue.pending, setLoading)
      .addCase(
        deleteIssue.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.issues = state.issues.filter((i) => i.key !== action.payload);
        }
      )
      .addCase(deleteIssue.rejected, (state, action) =>
        setError(state, action, "Failed to delete issue")
      )
      .addCase(markIssueDone.pending, setLoading)
      .addCase(
        markIssueDone.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          const issue = state.issues.find((i) => i.key === action.payload);
          if (issue) issue.status = "Done";
        }
      )
      .addCase(markIssueDone.rejected, (state, action) =>
        setError(state, action, "Failed to update issue status")
      );
  },
});

export default jiraSlice.reducer;
