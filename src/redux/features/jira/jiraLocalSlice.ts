import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIssue } from "@/src/components/card/IssueCard";

interface JiraLocalState {
  issues: IIssue[];
}

const initialState: JiraLocalState = {
  issues: [],
};

const jiraLocalSlice = createSlice({
  name: "jiraLocal",
  initialState,
  reducers: {
    setIssues(state, action: PayloadAction<IIssue[]>) {
      state.issues = action.payload;
    },
    sortIssuesBySummary(state) {
      state.issues.sort((a, b) => a.summary.localeCompare(b.summary));
    },
    sortIssuesByStatus(state) {
      const statusOrder: Record<string, number> = {
        "to do": 11,
        "in progress": 21,
        done: 31,
      };
      state.issues.sort((a, b) => {
        const aOrder = statusOrder[a.status.toLowerCase()] ?? 99;
        const bOrder = statusOrder[b.status.toLowerCase()] ?? 99;
        return aOrder - bOrder;
      });
    },
    addIssue(state, action: PayloadAction<IIssue>) {
      state.issues.push(action.payload);
    },
    updateIssue(state, action: PayloadAction<IIssue>) {
      const idx = state.issues.findIndex((i) => i.key === action.payload.key);
      if (idx !== -1) {
        state.issues[idx] = action.payload;
      }
    },
    deleteIssue(state, action: PayloadAction<string>) {
      state.issues = state.issues.filter((i) => i.key !== action.payload);
    },
  },
});

export const {
  setIssues,
  sortIssuesBySummary,
  sortIssuesByStatus,
  addIssue,
  updateIssue,
  deleteIssue,
} = jiraLocalSlice.actions;
export default jiraLocalSlice.reducer;
