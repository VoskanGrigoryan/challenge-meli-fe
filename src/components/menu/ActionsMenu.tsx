'use client';

import { ActionIcon, Menu } from "@mantine/core";
import { IconDotsVertical, IconEdit, IconFileXFilled } from "@tabler/icons-react";

 const ActionsMenu = ({ issueKey, onDelete }: { issueKey: string; onDelete?: (issueKey: string) => void }) => {
  return (
    <Menu shadow="md" position="bottom-end" width={200} transitionProps={{ transition: 'rotate-right', duration: 150 }}>
      <Menu.Target>
        <ActionIcon variant="subtle" size="sm" color="gray">
          <IconDotsVertical size={20} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Acciones</Menu.Label>
        <Menu.Item leftSection={<IconEdit size={14} />}>Editar</Menu.Item>
        <Menu.Item
          leftSection={<IconFileXFilled size={14} />}
          color="red"
          onClick={() => onDelete && onDelete(issueKey)}
        >
          Eliminar
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ActionsMenu;