"use client";

import { AppShell, Group } from "@mantine/core";
import classes from "./MainLayout.module.css";

export function MainLayout({
  children,
  headerTitle,
}: {
  children: React.ReactNode;
  headerTitle?: string;
}) {
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
          <span style={{ flex: 1 }} />
          <span style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontSize: 24,
                letterSpacing: 1,
              }}
            >
              {headerTitle}
            </span>
          </span>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
