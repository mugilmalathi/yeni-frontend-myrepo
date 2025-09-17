import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // clear any local/session data you set during auth
    localStorage.removeItem("lastAddedStudent");
    // localStorage.clear(); // <- use this if you want to clear everything
    navigate("/", { replace: true });
  }, [navigate]);

  return null; // nothing to render; immediate redirect
}
