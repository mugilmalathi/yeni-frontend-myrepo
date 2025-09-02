import { Bell } from "lucide-react"
import { useLocation } from "react-router-dom"

export default function Header() {
  const location = useLocation()

  // Map routes to titles
  const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/practice": "Practice Zone",
  "/upskilling": "Upskilling Zone",
  "/reports": "Reports",
  "/resume-update": "Resume Updates",
  "/settings": "Settings",
  "/help": "Help Center",
  "/logout": "Logout",
}


  // Get title based on current path
const title = routeTitles[location.pathname] || "Dashboard"

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white">
      {/* Dynamic Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
        {title}
      </h1>

      {/* Right section */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 cursor-pointer" />
        {/* Profile avatar (optional) */}
        {/* 
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
        /> 
        */}
      </div>
    </header>
  )
}
