// Example selector test (replace with your actual selectors)
describe('jira selectors', () => {
  it('should select issues from state (example)', () => {
    const state = {
      jiraApi: {
        queries: {},
        mutations: {},
        provided: {},
        subscriptions: {},
        config: {},
        issues: [{ key: 'MTM-1', summary: 'Test', status: 'To Do', labels: [] }],
      },
    };
    // Replace with your selector if you have one
    // expect(selectIssues(state)).toHaveLength(1);
    expect(state.jiraApi.issues).toHaveLength(1);
  });
});
