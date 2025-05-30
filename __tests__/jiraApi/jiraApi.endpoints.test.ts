import { jiraApi } from "@/src/redux/features/jira/JiraSlice";

describe('jiraApi endpoints', () => {
  it('should have getAllJiraIssues endpoint', () => {
    expect(jiraApi.endpoints.getAllJiraIssues).toBeDefined();
  });
  it('should have createJiraIssue endpoint', () => {
    expect(jiraApi.endpoints.createJiraIssue).toBeDefined();
  });
  it('should have deleteJiraIssue endpoint', () => {
    expect(jiraApi.endpoints.deleteJiraIssue).toBeDefined();
  });
  it('should have changeIssueStatus endpoint', () => {
    expect(jiraApi.endpoints.changeIssueStatus).toBeDefined();
  });
});
