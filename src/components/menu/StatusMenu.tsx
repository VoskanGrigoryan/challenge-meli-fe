"use client";

import { useJiraColor } from "@/src/hooks/useJiraColor";
import { Badge, Menu } from "@mantine/core";
import {} from "@tabler/icons-react";
import { IIssue } from "../card/IssueCard";
import {
  useChangeIssueStatusMutation,
  useGetAllJiraIssuesQuery,
} from "@/src/redux/features/jira/JiraSlice";
import { useToast } from "../toast/ToastProvider";
import { useDispatch } from "react-redux";
import { updateIssue } from "@/src/redux/features/jira/jiraLocalSlice";

const StatusMenu = ({ issue }: { issue: IIssue }) => {
  const { mapJiraColorToMantine } = useJiraColor();
  const [changeIssueStatus, { isLoading }] = useChangeIssueStatusMutation();
  const { refetch } = useGetAllJiraIssuesQuery();
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const handleStatusChange = async (status: string) => {
    try {
      await changeIssueStatus({ issueKey: issue.key, status }).unwrap();
      dispatch(updateIssue({ ...issue, status }));
      showToast({
        title: "Estado actualizado",
        message: `El estado fue cambiado a '${status}'.`,
        color: "blue",
      });
    } catch (error) {
      const err = error as { data?: { message?: string } };
      showToast({
        title: "Error al cambiar estado",
        message:
          err?.data?.message || "No se pudo cambiar el estado del issue.",
        color: "red",
      });
    }
  };

  return (
    <Menu
      shadow="md"
      position="bottom-start"
      width={200}
      transitionProps={{ transition: "rotate-right", duration: 150 }}
    >
      <Menu.Target>
        <Badge radius={"xs"} color={mapJiraColorToMantine(issue?.color)}>
          {issue?.status}
        </Badge>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Cambiar estado</Menu.Label>
        <Menu.Item
          onClick={() => handleStatusChange("To Do")}
          color={"blue"}
          disabled={isLoading}
        >
          To Do
        </Menu.Item>
        <Menu.Item
          onClick={() => handleStatusChange("In Progress")}
          color={"orange"}
          disabled={isLoading}
        >
          In Progress
        </Menu.Item>
        <Menu.Item
          onClick={() => handleStatusChange("Done")}
          color={"green"}
          disabled={isLoading}
        >
          Done
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default StatusMenu;
