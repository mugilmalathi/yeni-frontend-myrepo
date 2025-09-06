import { Bell } from "lucide-react"
import { useLocation } from "react-router-dom"

export default function StudentHeader() {
  const location = useLocation()

  // Map routes to titles
  const routeTitles: Record<string, string> = {
    "/studentDashboard": "College Admin Dashboard",
    "/studentDashboard/add-student": "Add Student",
    "/studentDashboard/add-job": "Add New Job",
    "/studentDashboard/settings": "Settings",
    "/studentDashboard/help": "Help Center",
  }

  // Get title based on current path
  const title = routeTitles[location.pathname] || "College Admin Dashboard"

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white">
      {/* Dynamic Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
        {title}
      </h1>

      {/* Right section */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 cursor-pointer" />
      </div>
    </header>
  )
}