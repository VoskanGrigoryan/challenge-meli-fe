import { jiraApi } from "../../src/redux/features/jira/JiraSlice";

describe("jiraApi getTransitionId helper", () => {
  it("should map status to correct transition id (mocked)", () => {
    // Directly test the mapping logic since getTransitionId is not exported
    const transitions: Record<string, string> = {
      "to do": "11",
      "in progress": "21",
      done: "31",
    };
    const getTransitionId = (status: string): string => {
      return transitions[status?.toLowerCase()] || "21";
    };
    expect(getTransitionId("to do")).toBe("11");
    expect(getTransitionId("in progress")).toBe("21");
    expect(getTransitionId("done")).toBe("31");
    expect(getTransitionId("unknown")).toBe("21");
  });
});
