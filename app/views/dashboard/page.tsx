"use client";

import { Grid } from "@mantine/core";
import styles from "./Dashboard.module.css";
import IssueCard from "@/src/components/card/IssueCard";
import {
  useGetAllJiraIssuesQuery,
  useDeleteJiraIssueMutation,
} from "@/src/redux/features/jira/JiraSlice";
import { notFound } from "next/navigation";
import Loading from "@/app/loading";
import MyButton from "@/src/ui/button";
import { IconFilePlus, IconReload } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import ToastNotification from "@/src/components/toast/ToastNotification";
import IssueModal from "@/src/components/modal/IssueModal";
import { useDisclosure } from "@mantine/hooks";
import { ToastProvider } from "@/src/components/toast/ToastProvider";

function DashboardContent() {
  const {
    data: issues = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAllJiraIssuesQuery();

  const [deleteJiraIssue, { isSuccess: isDeleteSuccess, reset: resetDelete }] =
    useDeleteJiraIssueMutation();

  const [showNotification, setShowNotification] = useState(false);
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  useEffect(() => {
    if (isDeleteSuccess) {
      setShowNotification(true);
      resetDelete(); // clean mutation state after triggering
    }
  }, [isDeleteSuccess, resetDelete]);

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
        <Grid.Col span={{ base: 6, md: 6, lg: 5 }}>
          <MyButton variant="outline" onClick={() => refetch()} type="button">
            Actualizar lista <IconReload size={20} />
          </MyButton>
        </Grid.Col>
        <Grid.Col span={{ base: 6, md: 6, lg: 5 }}>
          <MyButton onClick={openModal} type="button">
            Agregar tarea <IconFilePlus size={22} />
          </MyButton>
        </Grid.Col>
      </Grid>

      <Grid>
        {issues.map((issue) => (
          <Grid.Col key={issue.key} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
            <IssueCard issue={issue} onDelete={deleteJiraIssue} />
          </Grid.Col>
        ))}
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
