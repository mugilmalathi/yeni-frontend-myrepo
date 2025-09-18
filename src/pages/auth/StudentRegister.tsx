import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Lock, Phone } from "lucide-react";
import HttpClient from "@/utils/httpClient";
import { API_BASE_URL } from "@/utils/constants";
import { cookieStore, REGISTRATION_ID_KEY } from "@/lib/utils";

export default function StudentRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    name: "",
    department: "",
    emailId: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    role: "student" // Add role field
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.name.trim()) newErrors.name = "College/Institute is required";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    if (!formData.emailId.trim()) newErrors.emailId = "Email is required";
    if (!formData.phoneNo.trim()) newErrors.phoneNo = "Phone number is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm password is required";
    
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.emailId && !/\S+@\S+\.\S+/.test(formData.emailId)) {
      newErrors.emailId = "Please enter a valid email";
    }

    return newErrors;
  };

  const [submitting, setSubmitting] = useState(false);

  const http = new HttpClient({ baseURL: API_BASE_URL });

  const handleNext = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        collegeName: formData.name,
        department: formData.department,
        emailId: formData.emailId,
        phoneNo: formData.phoneNo,
        password: formData.password,
      };
      const res = await http.post<{ registrationId: string; nextStep: string }>(
        "/students/register/step1",
        payload
      );
      if (res?.registrationId) {
        cookieStore.set(REGISTRATION_ID_KEY, res.registrationId, 3);
        navigate("/register/student/education");
      } else {
        setErrors({ general: "Unexpected response. Please try again." });
      }
    } catch (e: any) {
      setErrors({ general: e?.message || "Registration failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <header className="bg-white shadow flex items-center justify-between px-3 sm:px-6 md:px-8 lg:px-16 py-3 sm:py-4 z-10 w-full flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="font-bold text-base sm:text-lg md:text-xl text-black">
            <span className="text-red-600">YENI</span> Ai
          </div>
        </div>
        <nav className="hidden sm:flex gap-2 md:gap-4 lg:gap-8 text-gray-700 font-medium text-xs sm:text-sm md:text-base">
          <a href="#" className="hover:text-red-500">Home</a>
          <a href="#" className="hover:text-red-500">About Us</a>
          <a href="#" className="hover:text-red-500">Our Programs</a>
          <a href="#" className="hover:text-red-500">Blogs</a>
          <a href="#" className="hover:text-red-500">Contact Us</a>
        </nav>
        <button className="bg-red-500 text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded hover:bg-red-600 text-xs sm:text-sm md:text-base">
          Enquire Today
        </button>
      </header>

      {/* Body - Fixed height with proper scrolling */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Image - 50% - Fixed, no scroll */}
        <div className="w-1/2 hidden lg:block">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
            alt="Professional woman"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form - 50% - Scrollable */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-3 sm:p-4 md:p-6 overflow-y-auto">
          <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-2 sm:mx-4 shadow-lg">
            {/* Title */}
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">Tell Us About Yourself</h2>
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
                <span className="text-sm sm:text-base md:text-lg font-medium text-gray-700">User Name</span>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label className="text-sm text-gray-600">First Name</Label>
                  <Input
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="mt-1 text-sm sm:text-base"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Last Name</Label>
                  <Input
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="mt-1 text-sm sm:text-base"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* College Name & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label className="text-sm text-gray-600">College/Institute/University</Label>
                  <Select onValueChange={(value) => handleInputChange('name', value)}>
                    <SelectTrigger className="mt-1 text-sm sm:text-base">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bml">BML Munjal University</SelectItem>
                      <SelectItem value="du">Delhi University</SelectItem>
                      <SelectItem value="iit">IIT Delhi</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Department</Label>
                  <Input
                    placeholder="Design"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="mt-1 text-sm sm:text-base"
                  />
                  {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Email ID</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="name@student.bml.edu.in"
                      value={formData.emailId}
                      onChange={(e) => handleInputChange('emailId', e.target.value)}
                      className="pl-10 text-sm sm:text-base"
                    />
                  </div>
                  {errors.emailId && <p className="text-red-500 text-xs mt-1">{errors.emailId}</p>}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Phone No.</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="+91 7070708541"
                      value={formData.phoneNo}
                      onChange={(e) => handleInputChange('phoneNo', e.target.value)}
                      className="pl-10 text-sm sm:text-base"
                    />
                  </div>
                  {errors.phoneNo && <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>}
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="password"
                      placeholder="••••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 text-sm sm:text-base"
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Confirm Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="password"
                      placeholder="••••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 text-sm sm:text-base"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Error */}
              {errors.general && (
                <p className="text-red-500 text-sm">{errors.general}</p>
              )}

              {/* Next Button */}
              <Button
                onClick={handleNext}
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 mt-4 sm:mt-6 text-sm sm:text-base"
              >
                {submitting ? "Submitting..." : "Next"}
              </Button>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center mt-4">
                By sending the request you confirm that you accept our{" "}
                <span className="text-blue-600 underline cursor-pointer">Terms of Service</span> and{" "}
                <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}