import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    // Check if user exists in localStorage
    const userRegistration = localStorage.getItem('userRegistration');
    
    if (userRegistration) {
      const userData = JSON.parse(userRegistration);
      
      // Simple validation - check if email matches
      if (userData.emailId === formData.email) {
        localStorage.setItem('isLoggedIn', 'true');
        
        // Route based on email domain
        if (formData.email.includes('@gmail.com')) {
          localStorage.setItem('userType', 'student');
          navigate('/dashboard');
        } else if (formData.email.includes('@org.co.in')) {
          localStorage.setItem('userType', 'college');
          navigate('/studentDashboard');
        } else {
          // Default routing based on registration type
          if (userData.registrationType === 'student') {
            navigate('/dashboard');
          } else {
            navigate('/studentDashboard');
          }
        }
      } else {
        alert('Invalid credentials');
      }
    } else {
      alert('No user found. Please register first.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow flex items-center justify-between px-16 py-4 z-10 w-full">
        <div className="flex items-center gap-2">
          <div className="font-bold text-xl text-black">
            <span className="text-red-600">YENI</span> Ai
          </div>
        </div>
        <nav className="flex gap-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-red-500">Home</a>
          <a href="#" className="hover:text-red-500">About Us</a>
          <a href="#" className="hover:text-red-500">Our Programs</a>
          <a href="#" className="hover:text-red-500">Blogs</a>
          <a href="#" className="hover:text-red-500">Contact Us</a>
        </nav>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Enquire Today
        </button>
      </header>

      {/* Background */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
        
        {/* Left side - Woman image */}
        <div className="absolute left-0 top-0 w-1/3 h-full">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
            alt="Professional woman"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Login form */}
        <div className="absolute right-0 top-0 w-2/3 h-full flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-md mx-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div>
                <Label className="text-sm text-gray-600">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input 
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-600">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input 
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button 
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                Sign In
              </Button>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button 
                    onClick={() => navigate('/register')}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}