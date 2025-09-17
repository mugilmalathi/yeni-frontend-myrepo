import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import HttpClient from "@/utils/httpClient";
import { API_BASE_URL } from "@/utils/constants";
import { cookieStore, AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/lib/utils";


export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const [submitting, setSubmitting] = useState(false);
  const http = new HttpClient({ baseURL: API_BASE_URL });

  const handleLogin = async () => {
    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const res = await http.post<{ token: string; refreshToken: string; user: { role: string } }>(
          "/auth/login",
          { email, password }
      );
      cookieStore.set(AUTH_TOKEN_KEY, res.token, 7);
      cookieStore.set(REFRESH_TOKEN_KEY, res.refreshToken, 14);
      const role = res.user?.role || 'student';
      navigate(role === 'student' ? '/dashboard' : '/studentDashboard');
    } catch (e: any) {
      setError(e?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot password functionality will be implemented soon.");
  };

  return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 z-10 w-full">
          <div className="flex items-center gap-2">
            <div className="font-bold text-lg sm:text-xl text-black">
              <span className="text-red-600">YENI</span> Ai
            </div>
          </div>
          <nav className="hidden md:flex gap-4 lg:gap-8 text-gray-700 font-medium text-sm lg:text-base">
            <a href="#" className="hover:text-red-500">Home</a>
            <a href="#" className="hover:text-red-500">About Us</a>
            <a href="#" className="hover:text-red-500">Our Programs</a>
            <a href="#" className="hover:text-red-500">Blogs</a>
            <a href="#" className="hover:text-red-500">Contact Us</a>
          </nav>
          <button className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-red-600 text-sm lg:text-base">
            Enquire Today
          </button>
        </header>

        {/* Content (fills remaining viewport height; zero white gap) */}
        <main className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900">
          {/* Grid ensures full width/height; no absolute positioning */}
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-4rem)]">
            {/* Left: image */}
            <div className="hidden md:block">
              <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                  alt="Professional team"
                  className="w-full h-full object-cover"
              />
            </div>

            {/* Right: form */}
            <div className="flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-md mx-auto shadow-xl">
                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Login Details
                  </h2>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      {error}
                    </div>
                )}

                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">Email</Label>
                      <Input
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Password</Label>
                      <Input
                          type="password"
                          placeholder="password"
                          value={formData.password}
                          onChange={(e) =>
                              handleInputChange("password", e.target.value)
                          }
                          className="mt-1"
                      />
                    </div>
                  </div>

                  <Button
                      onClick={handleLogin}
                      disabled={submitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3"
                  >
                    {submitting ? 'Signing in...' : 'Login'}
                  </Button>

                  <div className="text-center">
                    <button
                        onClick={handleForgotPassword}
                        className="text-blue-600 hover:underline text-sm"
                    >
                      Forget Password?
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <button
                          onClick={() => navigate("/register")}
                          className="text-blue-600 hover:underline font-medium"
                      >
                        Register here
                      </button>
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    By sending the request you can confirm that you accept our{" "}
                    <span className="text-blue-600 underline cursor-pointer">
                    Terms of Service
                  </span>{" "}
                    and{" "}
                    <span className="text-blue-600 underline cursor-pointer">
                    Privacy Policy
                  </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}
