import { jiraApi } from "../../src/redux/features/jira/JiraSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

describe("jiraApi RTK Query endpoints", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: { [jiraApi.reducerPath]: jiraApi.reducer },
      middleware: (gDM) => gDM().concat(jiraApi.middleware),
    });
    setupListeners(store.dispatch);
  });

  it("should have getAllJiraIssues endpoint", () => {
    const endpoint = jiraApi.endpoints.getAllJiraIssues;
    expect(endpoint).toBeDefined();
  });

  it("should have createJiraIssue endpoint", () => {
    const endpoint = jiraApi.endpoints.createJiraIssue;
    expect(endpoint).toBeDefined();
  });

  it("should have deleteJiraIssue endpoint", () => {
    const endpoint = jiraApi.endpoints.deleteJiraIssue;
    expect(endpoint).toBeDefined();
  });

  it("should have changeIssueStatus endpoint", () => {
    const endpoint = jiraApi.endpoints.changeIssueStatus;
    expect(endpoint).toBeDefined();
  });
});
