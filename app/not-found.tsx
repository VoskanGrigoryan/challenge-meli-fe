"use client";

import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container size="md" py="xl">
      <Stack align="center" justify="center" h="100%">
        <Title order={2} c="dimmed">
          404 – Page not found
        </Title>
        <Text size="md" ta="center" c="dimmed" maw={400}>
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </Text>

        <Group mt="md">
          <Button
            component={Link}
            href="/"
            variant="light"
            leftSection={<IconArrowLeft size={16} />}
          >
            Back to Home
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
