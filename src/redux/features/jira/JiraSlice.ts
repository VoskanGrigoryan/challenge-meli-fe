import { IIssue } from "@/src/components/card/IssueCard";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JiraIssue } from "./jiraTypes";

export const jiraApi = createApi({
  reducerPath: "jiraApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/jira",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Issues"],
  endpoints: (builder) => ({
    // Get all issues
    getAllJiraIssues: builder.query<IIssue[], void>({
      query: () => "",
      providesTags: ["Issues"],
      transformResponse: (response: { issues: JiraIssue[] }) =>
        response.issues.map((issue) => ({
          key: issue.key,
          summary: issue.fields.summary,
          status: issue.fields.status.name,
          labels: issue.fields.labels || [],
          description:
            issue.fields.description?.content?.[0]?.content?.[0]?.text || "",
          color: issue.fields.status.statusCategory.colorName || "gray",
        })),
    }),

    // Create issue
    createJiraIssue: builder.mutation<
      { key: string },
      {
        summary: string;
        description?: string;
        labels?: string[];
      }
    >({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      // Removed invalidatesTags to prevent refetch after mutation
    }),
    
    // Delete issue
    deleteJiraIssue: builder.mutation<void, string>({
      query: (issueKey) => ({
        url: `?issueKey=${issueKey}`,
        method: "DELETE",
      }),
      // Removed invalidatesTags to prevent refetch after mutation
    }),

    // Change issue status (transition)
    changeIssueStatus: builder.mutation<
      void,
      { issueKey: string; status: string }
    >({
      query: ({ issueKey, status }) => ({
        url: "?action=transition",
        method: "POST",
        body: {
          issueKey,
          transitionId: getTransitionId(status),
        },
      }),
      // Removed invalidatesTags to prevent refetch after mutation
    }),
  }),
});

// Helper function for transition IDs
const getTransitionId = (status: string): string => {
  const transitions: Record<string, string> = {
    "to do": "11",
    "in progress": "21",
    done: "31",
  };
  return transitions[status?.toLowerCase()] || "21";
};

export const {
  useGetAllJiraIssuesQuery,
  useCreateJiraIssueMutation,
  useDeleteJiraIssueMutation,
  useChangeIssueStatusMutation,
} = jiraApi;
