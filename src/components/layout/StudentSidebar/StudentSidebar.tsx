import {
  Home,
  UserPlus,
  Briefcase,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
} from "lucide-react";
import NavItem from "../../atom/NavItem/NavItem";
import { useState } from "react";

export default function StudentSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden p-3 fixed top-3 left-3 z-50 bg-white rounded-md shadow-md"
        onClick={() => setOpen(!open)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full bg-white border-r flex flex-col transform transition-transform duration-300 z-40
        w-64 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-4 font-bold text-xl text-black">
          <span className="text-red-600">YENI</span> Ai
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          {/* Main Nav */}
          <div className="space-y-3">
            <NavItem icon={<Home />} label="Dashboard" href="/studentDashboard" />
            <NavItem icon={<UserPlus />} label="Add Student" href="/studentDashboard/add-student" />
            <NavItem icon={<Briefcase />} label="Add New Job" href="/studentDashboard/add-job" />
          </div>

          {/* Divider */}
          <div className="border-t-2 border-blue-500 my-6"></div>

          {/* Section Title */}
          <p className="px-2 text-xs font-semibold text-gray-500 uppercase mb-2">
            Settings
          </p>

          {/* Extra Nav */}
          <div className="space-y-3">
            <NavItem icon={<Settings />} label="Settings" href="/studentDashboard/settings" />
            <NavItem icon={<HelpCircle />} label="Help Center" href="/studentDashboard/help" />
            <NavItem icon={<LogOut />} label="Log Out" href="/logout" />
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t flex items-center space-x-3">
          <img
            src="https://avatar.iran.liara.run/public/62"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-black">Pankaj</p>
            <p className="text-xs text-gray-500">pankajkumar@gmail.com</p>
          </div>
        </div>
      </aside>
    </>
  );
}