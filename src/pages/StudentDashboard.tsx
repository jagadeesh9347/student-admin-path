import { StudentDashboard as StudentDashboardComponent } from "@/components/dashboard/StudentDashboard";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const StudentDashboard = () => {
  return (
    <DashboardLayout>
      <StudentDashboardComponent />
    </DashboardLayout>
  );
};

export default StudentDashboard;