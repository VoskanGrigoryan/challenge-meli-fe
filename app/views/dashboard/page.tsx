"use client";

import { Grid, Title, Tooltip } from "@mantine/core";
import styles from "./Dashboard.module.css";
import IssueCard, { IIssue } from "@/src/components/card/IssueCard";
import {
  useGetAllJiraIssuesQuery,
  useDeleteJiraIssueMutation,
} from "@/src/redux/features/jira/JiraSlice";
import { notFound } from "next/navigation";
import Loading from "@/app/loading";
import MyButton from "@/src/ui/button";
import {
  IconFilePlus,
  IconReload,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import ToastNotification from "@/src/components/toast/ToastNotification";
import IssueModal from "@/src/components/modal/IssueModal";
import { useDisclosure } from "@mantine/hooks";
import { ToastProvider } from "@/src/components/toast/ToastProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  setIssues,
  deleteIssue,
} from "@/src/redux/features/jira/jiraLocalSlice";

function DashboardContent() {
  const {
    data: issues = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAllJiraIssuesQuery();

  const dispatch = useDispatch();
  const localIssues = useSelector((state: any) => state?.jiraLocal?.issues);

  const [deleteJiraIssue, { isSuccess: isDeleteSuccess, reset: resetDelete }] =
    useDeleteJiraIssueMutation();

  const [showNotification, setShowNotification] = useState(false);
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [sortDesc, setSortDesc] = useState(false);

  // Save issues to local state when fetched
  useEffect(() => {
    if (issues.length > 0) {
      dispatch(setIssues(issues));
    }
  }, [issues, dispatch]);

  useEffect(() => {
    if (isDeleteSuccess) {
      setShowNotification(true);
      resetDelete(); // clean mutation state after triggering
    }
  }, [isDeleteSuccess, resetDelete]);

  // Local state to hold sorted issues for rendering
  const [sortedIssues, setSortedIssues] = useState<IIssue[]>([]);
  const [hasSorted, setHasSorted] = useState(false);

  // Keep sortedIssues in sync with localIssues, but only if not sorted by user
  useEffect(() => {
    if (!hasSorted) {
      setSortedIssues(localIssues || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localIssues, hasSorted]);

  const handleSort = React.useCallback(() => {
    if (!sortedIssues) return;
    const sorted = [...sortedIssues].sort((a, b) => {
      const aId = parseInt(a.key.split("-").pop() || "0", 10);
      const bId = parseInt(b.key.split("-").pop() || "0", 10);
      return sortDesc ? bId - aId : aId - bId;
    });
    setSortedIssues(sorted);
    setSortDesc((prev) => !prev);
    setHasSorted(true);
  }, [sortedIssues, sortDesc]);

  // When issues are refetched, reset hasSorted so the list updates
  useEffect(() => {
    setHasSorted(false);
  }, [issues]);

  // Local delete handler to update local Redux after API
  const handleDelete = async (issueKey: string) => {
    try {
      await deleteJiraIssue(issueKey).unwrap();
      dispatch(deleteIssue(issueKey));
      setShowNotification(true);
    } catch (e) {
      // Optionally handle error
    } finally {
      resetDelete();
    }
  };

  if (isLoading || isFetching) return <Loading />;
  if (isError) notFound();

  return (
    <div className={styles.container}>
      {showNotification && (
        <ToastNotification
          title="Éxito"
          message="Tarjeta eliminada exitosamente! El cambio se verá reflejado en Jira al actualizar."
          onClose={() => setShowNotification(false)}
        />
      )}
      <IssueModal opened={modalOpened} onClose={closeModal} />
      <Grid className={styles.menuContainer}>
        <Grid.Col span={{ base: 6, sm: 4, md: 4, lg: 4 }}>
          <MyButton variant="outline" onClick={() => refetch()} type="button">
            Actualizar lista <IconReload size={20} />
          </MyButton>
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 4, md: 4, lg: 4 }}>
          <MyButton onClick={openModal} type="button">
            Agregar tarea <IconFilePlus size={22} />
          </MyButton>
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 4, md: 4, lg: 4 }}>
          <Tooltip
            label="Sort por ID (descendiente/ascendiente)"
            position="bottom"
            withArrow
          >
            <MyButton onClick={handleSort} type="button">
              Sort
              {sortDesc ? (
                <IconSortAscending size={20} style={{ marginLeft: 2 }} />
              ) : (
                <IconSortDescending size={20} style={{ marginLeft: 2 }} />
              )}
            </MyButton>
          </Tooltip>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col
          span={{ base: 12, md: 6, lg: 4, xl: 4 }}
          style={{ marginBottom: "20px" }}
        >
          <Title order={5}>To Do</Title>
          {sortedIssues
            .filter((issue) => issue.status.toLowerCase() === "to do")
            .map((issue) => (
              <IssueCard
                key={issue.key}
                issue={issue}
                onDelete={handleDelete}
              />
            ))}
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, md: 6, lg: 4, xl: 4 }}
          style={{ marginBottom: "20px" }}
        >
          <Title order={5}>In Progress</Title>
          {sortedIssues
            .filter((issue) => issue.status.toLowerCase() === "in progress")
            .map((issue) => (
              <IssueCard
                key={issue.key}
                issue={issue}
                onDelete={handleDelete}
              />
            ))}
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, md: 6, lg: 4, xl: 4 }}
          style={{ marginBottom: 20 }}
        >
          <Title order={5}>Done</Title>
          {sortedIssues
            .filter((issue) => issue.status.toLowerCase() === "done")
            .map((issue) => (
              <IssueCard
                key={issue.key}
                issue={issue}
                onDelete={handleDelete}
              />
            ))}
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ToastProvider>
      <DashboardContent />
    </ToastProvider>
  );
}
