import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/dashboard/Dashboard";
import LandingPage from "@/pages/Home/LandingPage";
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
import Evaluation from "@/pages/evaluation/Evaluation";
import UpskillingExperience from "@/pages/upskillingExperience/UpskillingExperience";
import RegisterSelection from "@/pages/auth/RegisterSelection";
import StudentRegister from "@/pages/auth/StudentRegister";
import StudentEducation from "@/pages/auth/StudentEducation";
import StudentResume from "@/pages/auth/StudentResume";
import CollegeRegister from "@/pages/auth/CollegeRegister";
import Login from "@/pages/auth/Login";
import PersonalisationPage from "@/pages/auth/PersonalisationPage.tsx";
import CollegeDetails from "@/pages/auth/CollegeDetails.tsx";
import AccountSetup from "@/pages/auth/AccountSetup.tsx";
import CollegePersonalisationPage from "@/pages/auth/CollegePersonalisationPage.tsx";
import ResumeBuilder from "@/pages/auth/ResumeBuilder.tsx";
import StudentSuccess from "@/pages/studentDashboard/StudentSuccess";
import SettingsPage from "@/pages/studentDashboard/Settings";
import HelpCenter from "@/pages/studentDashboard/HelpCenter";
import LogoutPage from "@/pages/studentDashboard/Logout";
import AIInterface from "@/pages/evaluation/AIInterface";
import AIInterview from "@/pages/evaluation/AIInterview";
import UpskillingAI from "@/pages/upskillingExperience/UpskillingAI";
import { cookieStore, AUTH_TOKEN_KEY } from "@/lib/utils";

function Protected({ children }: { children: JSX.Element }) {
  const token = cookieStore.get(AUTH_TOKEN_KEY);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/register" element={<RegisterSelection />} />
        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/register/student/education" element={<StudentEducation />} />
        <Route path="/register/student/resume" element={<StudentResume />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/register/college" element={<CollegeRegister />} />
        <Route path="/register/college/details" element={<CollegeDetails />} />
        <Route path="/register/college/account" element={<AccountSetup />} />
        <Route path="/register/student/personalisation" element={<PersonalisationPage />} />
        <Route path="/register/college/personalisation" element={<CollegePersonalisationPage />} />
        <Route path="/login" element={<Login />} />

        {/* Student Dashboard Routes */}
        <Route path="/studentDashboard/*" element={
          <Protected>
            <div className="flex h-screen w-screen overflow-hidden">
              <StudentSidebar />
              <div className="flex flex-col flex-1 w-full">
                <StudentHeader />
                <main className="flex-1 w-full p-4 overflow-y-auto bg-gray-50">
                  <Routes>
                    <Route index element={<StudentDashboard />} />
                    <Route path="add-student" element={<AddStudent />} />
                    <Route path="add-job" element={<AddNewJob />} />
                    <Route path="students/success" element={<StudentSuccess />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="help" element={<HelpCenter />} />
                    <Route path="logout" element={<LogoutPage />} />
                  </Routes>
                </main>
              </div>
            </div>
          </Protected>
        } />

        {/* Regular Dashboard Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={
          <Protected>
            <div className="flex h-screen w-screen overflow-hidden">
              <Sidebar />
              <div className="flex flex-col flex-1 w-full">
                <Header />
                <main className="flex-1 w-full p-4 overflow-y-auto bg-gray-50">
                  <Dashboard />
                </main>
              </div>
            </div>
          </Protected>
        } />
        <Route path="/practice" element={
          <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
              <Header />
              <main className="flex-1 w-full p-4 overflow-y-auto bg-gray-50">
                <PracticeZone />
              </main>
            </div>
          </div>
        } />
        <Route path="/upskilling" element={
          <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
              <Header />
              <main className="flex-1 w-full p-4 overflow-y-auto bg-gray-50">
                <UpskillingZone />
              </main>
            </div>
          </div>
        } />
        <Route path="/reports" element={
          <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
              <Header />
              <main className="flex-1 w-full p-4 overflow-y-auto bg-gray-50">
                <Reports />
              </main>
            </div>
          </div>
        } />
        <Route path="/resume-update" element={
          <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
              <Header />
              <main className="flex-1 w-full p-4 overflow-y-auto bg-gray-50">
                <ResumeUpdates />
              </main>
            </div>
          </div>
        } />
        <Route
          path="/evaluation/:jobId"
          element={
            <div className="flex h-screen w-screen overflow-hidden">
              <Sidebar />
              <div className="flex flex-col flex-1 w-full">
                <Header />
                <main className="flex-1 w-full p-4 overflow-y-auto bg-gray-50">
                  <Evaluation />
                </main>
              </div>
            </div>
          }
        />

        <Route
          path="/evaluation/:jobId/ai"
          element={
            <div className="flex h-screen w-screen overflow-hidden">
              <Sidebar />
              <div className="flex flex-col flex-1 w-full">
                <Header />
                <main className="flex-1 w-full p-4 overflow-y-auto bg-gray-50">
                  <AIInterface />
                </main>
              </div>
            </div>
          }
        />

        <Route
          path="/evaluation/:jobId/interview"
          element={<AIInterview />}
        />
        <Route
          path="/upskilling-experience/:skillId"
          element={
            <div className="flex h-screen w-screen overflow-hidden">
              <Sidebar />
              <div className="flex flex-col flex-1 w-full">
                <Header />
                <main className="flex-1 w-full p-4 overflow-y-auto bg-gray-50">
                  <UpskillingExperience />
                </main>
              </div>
            </div>
          }
        />

        <Route
          path="/upskilling-experience/:skillId/ai"
          element={
            <div className="flex h-screen w-screen overflow-hidden">
              <Sidebar />
              <div className="flex flex-col flex-1 w-full">
                <Header />
                <main className="flex-1 w-full p-4 overflow-y-auto bg-gray-50">
                  <UpskillingAI />
                </main>
              </div>
            </div>
          }
        />
        <Route path="/settings" element={
          <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
              <Header />
              <main className="flex-1 w-full p-4 overflow-y-auto bg-gray-50">
                <SettingsPage />
              </main>
            </div>
          </div>
        } />
        <Route path="/help" element={
          <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
              <Header />
              <main className="flex-1 w-full p-4 overflow-y-auto bg-gray-50">
                <HelpCenter />
              </main>
            </div>
          </div>
        } />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}