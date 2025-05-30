import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIssue } from '@/src/components/card/IssueCard';

interface JiraLocalState {
  issues: IIssue[];
}

const initialState: JiraLocalState = {
  issues: [],
};

const jiraLocalSlice = createSlice({
  name: 'jiraLocal',
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
        'to do': 11,
        'in progress': 21,
        'done': 31,
      };
      state.issues.sort((a, b) => {
        const aOrder = statusOrder[a.status.toLowerCase()] ?? 99;
        const bOrder = statusOrder[b.status.toLowerCase()] ?? 99;
        return aOrder - bOrder;
      });
    },
    // Add more sort/filter reducers as needed
  },
});

export const { setIssues, sortIssuesBySummary, sortIssuesByStatus } = jiraLocalSlice.actions;
export default jiraLocalSlice.reducer;
