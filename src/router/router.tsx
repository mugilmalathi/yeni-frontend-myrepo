import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/dashboard/Dashboard";
import Header from "@/components/layout/Header/Header";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import PracticeZone from "@/pages/practicezone/Practicezone";
import UpskillingZone from "@/pages/upskillingzone/UpskillingZone";
import Reports from "@/pages/reports/Reports";
import ResumeUpdates from "@/pages/resumeUpdates/ResumeUpdates";
import Evaluation from "@/pages/evaluation/Evaluation";
import UpskillingExperience from "@/pages/upskillingExperience/UpskillingExperience";



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
  return (
    <BrowserRouter>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex flex-col flex-1 w-full">
          <Header />
          <main className="flex-1 w-full p-4 overflow-y-auto bg-gray-50">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/practice" element={<PracticeZone />} />
              <Route path="/upskilling" element={<UpskillingZone />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/resume-update" element={<ResumeUpdates />} />
              <Route path="/evaluation/:jobId" element={<Evaluation />} />
              <Route path="/upskilling-experience/:skillId" element={<UpskillingExperience />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/logout" element={<LogoutPage />} />

              {/* Default redirect */}
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

