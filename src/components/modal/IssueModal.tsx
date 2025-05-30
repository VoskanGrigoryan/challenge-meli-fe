"use client";

import {
  Modal,
  Select,
  TextInput,
  TagsInput,
  Grid,
  Divider,
  Textarea,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import MyButton from "@/src/ui/button";
import {
  useCreateJiraIssueMutation,
  useChangeIssueStatusMutation,
} from "@/src/redux/features/jira/JiraSlice";
import { useToast } from "@/src/components/toast/ToastProvider";

interface FormValues {
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  labels: string[];
}

export default function IssueModal({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) {
  const form = useForm<FormValues>({
    initialValues: {
      title: "",
      description: "",
      status: "To Do",
      labels: [],
    },
    validate: {
      title: (value) =>
        value.trim().length < 3
          ? "El titulo tiene que tener mas de 3 caracteres"
          : null,
    },
  });

  const [createJiraIssue, { isLoading: isCreating }] =
    useCreateJiraIssueMutation();
  const [changeIssueStatus] = useChangeIssueStatusMutation();
  const { showToast } = useToast();

  const handleSubmit = async (values: FormValues) => {
    try {
      // Create the issue
      const result = await createJiraIssue({
        summary: values.title,
        description: values.description,
        labels: values.labels,
      }).unwrap();

      // Update status if not default
      if (values.status !== "To Do") {
        await changeIssueStatus({
          issueKey: result.key,
          status: values.status,
        }).unwrap();
      }

      showToast({
        title: "Tarea creada exitosamente!",
        message: "Ya podes ver el cambio reflejado en Jira.",
      });
      setTimeout(() => {
        form.reset();
        onClose();
      }, 1000); // Close modal after 1 second
    } catch (error) {
      showToast({
        title: "Error",
        message: "No se pudo crear la tarea. Intentá de nuevo.",
        color: "red",
        duration: 3000,
      });
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Crear nueva tarea"
      size="lg"
      centered
      overlayProps={{ blur: 3 }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="md">
          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              label="Titulo"
              placeholder="Resumen de la tarea"
              {...form.getInputProps("title")}
              error={form.errors.title}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Textarea
              label="Descripción"
              placeholder="Detalle de la tarea"
              minRows={4}
              autosize
              {...form.getInputProps("description")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Select
              allowDeselect={false}
              label="Status"
              data={["To Do", "In Progress", "Done"]}
              {...form.getInputProps("status")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TagsInput
              label="Labels"
              placeholder="Apretá enter para agregar una etiqueta"
              clearable
              {...form.getInputProps("labels")}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Divider my="sm" />
            <Box
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-end",
              }}
            >
              <MyButton
                variant="outline"
                type="button"
                onClick={handleClose}
                disabled={isCreating}
              >
                Cancelar
              </MyButton>
              <MyButton
                type="submit"
                loading={isCreating}
                disabled={!form.isValid()}
              >
                {isCreating ? "Creando..." : "Crear tarea"}
              </MyButton>
            </Box>
          </Grid.Col>
        </Grid>
      </form>
    </Modal>
  );
}
