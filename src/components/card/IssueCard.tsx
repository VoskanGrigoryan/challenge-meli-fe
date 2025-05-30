import {  Badge, Group, Text } from "@mantine/core";
import MyPaper from "../../ui/paper";
import ActionsMenu from "../menu/ActionsMenu";
import StatusMenu from "../menu/StatusMenu";

export interface IIssue {
  key: string;
  summary: string;
  status: string;
  labels: string[];
  description: string;
  color: string;
}

interface IssueCardProps {
  issue: IIssue;
  onDelete?: (issueKey: string) => void;
}

export default function IssueCard({ issue, onDelete }: IssueCardProps) {

  return (
    <MyPaper>
      <Group justify="space-between" mb="xs" align="flex-start">
        <StatusMenu issue={issue}  />
        <ActionsMenu issueKey={issue.key} onDelete={onDelete} />
      </Group>

      <Group gap="xs" justify="start">
        <Text fw={500} size="md">
        {issue?.summary} 
      </Text>
      <Text size="xs">
        {issue?.key && `(${issue.key})`}
      </Text>
      </Group>

      <Text size="sm" c="dimmed" mt="xs" lineClamp={4}>
        {issue?.description || "No description provided."}
      </Text>

      <Group gap="xs" justify="start" mt="sm">
        {(() => {
          const MAX_BADGES = 3; // 2 rows of 4 badges each
          const visibleLabels = issue?.labels.slice(0, MAX_BADGES);
          const extraCount = issue?.labels.length - MAX_BADGES;
          return (
            <>
              {visibleLabels.map((label: string) => (
                <Badge
                size="sm"
                  key={label}
                  variant="outline"
                  color="blue"
                >
                  {label}
                </Badge>
              ))}
              {extraCount > 0 && (
                <Badge variant="filled" color="gray" style={{ cursor: "pointer" }}>
                  +{extraCount} more
                </Badge>
              )}
            </>
          );
        })()}
      </Group>
    </MyPaper>
  );
}
