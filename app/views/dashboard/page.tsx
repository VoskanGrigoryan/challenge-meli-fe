"use client";

import IssueCard from "@/src/components/IssueCard";
import styles from "./Dashboard.module.css";
import { Grid } from "@mantine/core";
import { getAllJiraIssues } from "@/src/services/jiraService";
import { useEffect } from "react";

interface Issue {
  id: string;
  fields: any;
}

const Dashboard = () => {

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const issues = await getAllJiraIssues();
        console.log(issues);
      } catch (error) {
        console.error("Failed to fetch issues from JIRA:", error);
      }
    };

    fetchIssues();
  }, []);
  return (
    <div className={styles.container}>
      <Grid>
        {/* {issues.map((issue) => (
          <Grid.Col key={issue.id} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
            <IssueCard issue={issue} />
          </Grid.Col>
        ))} */}
      </Grid>
    </div>
  );
};

export default Dashboard;
