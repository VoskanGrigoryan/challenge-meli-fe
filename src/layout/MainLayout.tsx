"use client";

import { AppShell, Burger, Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./MainLayout.module.css";

export function MainLayout({
  children,
  headerTitle,
}: {
  children: React.ReactNode;
  headerTitle?: string;
}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
      style={{ margin: 0, padding: 0 }}
    >
      <AppShell.Header className={classes.meliBackgroundColor}>
        <Group
          h="100%"
          px="md"
          justify="space-between"
          style={{ width: "100%" }}
        >
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            color="#fff"
          />
          <span style={{ flex: 1 }} />
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: "#000", fontSize: 22, letterSpacing: 1 }}>
              {headerTitle}
            </span>
          </span>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
