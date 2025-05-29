import { ActionIcon, Badge, Group, Text } from "@mantine/core";
import MyPaper from "../ui/paper";
import { IconDotsVertical } from "@tabler/icons-react";
import { useJiraColor } from "../hooks/useJiraColor";

export default function IssueCard() {
  const { mapJiraColorToMantine } = useJiraColor();

  return (
    <MyPaper>
      <Group justify="space-between" mb="sm" align="flex-start">
        <Badge
          variant="light"
          color={mapJiraColorToMantine(
            issue.fields.status.statusCategory.colorName
          )}
        >
          {issue.fields.status.name}
        </Badge>
        <ActionIcon variant="subtle" size="sm" color="gray">
          <IconDotsVertical size={20} stroke={1.5} />
        </ActionIcon>
      </Group>

      <Text fw={500} size="md" lineClamp={2}>
        {issue.fields.summary}
      </Text>

      <Text size="sm" c="dimmed" mt="xs" lineClamp={4}>
        {issue?.fields?.description?.content[0]?.content[0]?.text ||
          "No description provided."}
      </Text>

      <Group gap="xs" justify="start" mt="md">
        {issue.fields.labels.map((label: string) => (
          <Badge
            key={label}
            variant="filled"
            color="blue"
            style={{ cursor: "pointer" }}
          >
            {label}
          </Badge>
        ))}
      </Group>
    </MyPaper>
  );
}
