import { MainLayout } from "@/src/layout/MainLayout";
import Dashboard from "./views/dashboard/page";

export default async function Home() {
  return (
    <MainLayout headerTitle={"Panel de tareas"}>
      <Dashboard />
    </MainLayout>
  );
}
