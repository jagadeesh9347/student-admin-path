import { AdminDashboard as AdminDashboardComponent } from "@/components/dashboard/AdminDashboard";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <AdminDashboardComponent />
    </DashboardLayout>
  );
};

export default AdminDashboard;