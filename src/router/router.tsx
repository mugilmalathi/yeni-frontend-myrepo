import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/dashboard/Dashboard";
import Header from "@/components/layout/Header/Header";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import StudentSidebar from "@/components/layout/StudentSidebar/StudentSidebar";
import StudentHeader from "@/components/layout/StudentHeader/StudentHeader";
import StudentDashboard from "@/pages/studentDashboard/Dashboard";
import AddStudent from "@/pages/studentDashboard/AddStudent";
import AddNewJob from "@/pages/studentDashboard/AddNewJob";
import PracticeZone from "@/pages/practicezone/Practicezone";
import UpskillingZone from "@/pages/upskillingzone/UpskillingZone";
import Reports from "@/pages/reports/Reports";
import ResumeUpdates from "@/pages/resumeUpdates/ResumeUpdates";



// Placeholder pages until you create them



function SettingsPage() {
  return <h1>Settings Page</h1>;
}
function HelpCenter() {
  return <h1>Help Center Page</h1>;
}
function LogoutPage() {
  return <h1>Logging out...</h1>;
}

export default function AppRouter() {
  const isStudentDashboard = location.pathname.startsWith('/studentDashboard');

  return (
    <BrowserRouter>
      <Routes>
        {/* Student Dashboard Routes */}
        <Route path="/studentDashboard/*" element={
          <div className="flex h-screen w-screen overflow-hidden">
            <StudentSidebar />
            <div className="flex flex-col flex-1 w-full">
              <StudentHeader />
              <main className="flex-1 w-full p-4 overflow-y-auto bg-gray-50">
                <Routes>
                  <Route path="/" element={<StudentDashboard />} />
                  <Route path="/add-student" element={<AddStudent />} />
                  <Route path="/add-job" element={<AddNewJob />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/help" element={<HelpCenter />} />
                </Routes>
              </main>
            </div>
          </div>
        } />

        {/* Regular Dashboard Routes */}
        <Route path="/*" element={
          <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
              <Header />
              <main className="flex-1 w-full p-4 overflow-y-auto bg-gray-50">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/practice" element={<PracticeZone />} />
                  <Route path="/upskilling" element={<UpskillingZone />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/resume-update" element={<ResumeUpdates />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/help" element={<HelpCenter />} />
                  <Route path="/logout" element={<LogoutPage />} />
                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </main>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

