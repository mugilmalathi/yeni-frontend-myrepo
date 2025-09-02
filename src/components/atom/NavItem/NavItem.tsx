import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: ReactNode;
  label: string;
  href: string;
}

export default function NavItem({ icon, label, href }: NavItemProps) {
  const location = useLocation();
  const active = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 sm:px-4 py-2 rounded-lg cursor-pointer text-xs sm:text-sm font-medium transition-colors",
        active
          ? "bg-blue-100 text-blue-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-black"
      )}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </Link>
  );
}
