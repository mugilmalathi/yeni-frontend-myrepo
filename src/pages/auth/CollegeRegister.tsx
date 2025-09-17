import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Phone, User } from "lucide-react";

function mergeUserRegistration(patch: Record<string, any>) {
  const existing = localStorage.getItem("userRegistration");
  const base = existing ? JSON.parse(existing) : {};
  const merged = { ...base, ...patch };
  localStorage.setItem("userRegistration", JSON.stringify(merged));
  return merged;
}

export default function CollegeRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    officialEmailId: "",
    phoneNo: "",
    designation: "",
    department: "",
    password: "",
    confirmPassword: "",
    role: "college",
  });

  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validateForm = () => {
    const e: { [k: string]: string } = {};
    const email = formData.officialEmailId.trim().toLowerCase();

    if (!formData.firstName.trim()) e.firstName = "First name is required";
    if (!formData.lastName.trim()) e.lastName = "Last name is required";
    if (!email) e.officialEmailId = "Official email is required";
    if (email && !/\S+@\S+\.\S+/.test(email)) e.officialEmailId = "Please enter a valid email";
    if (!formData.phoneNo.trim()) e.phoneNo = "Phone number is required";
    if (!formData.designation.trim()) e.designation = "Designation is required";
    if (!formData.department.trim()) e.department = "Department is required";
    if (!formData.password.trim()) e.password = "Password is required";
    if (!formData.confirmPassword.trim()) e.confirmPassword = "Confirm password is required";
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      e.confirmPassword = "Passwords do not match";
    }
    return e;
  };

  const handleNext = () => {
    const v = validateForm();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    const payload = {
      // keep credentials in the canonical record
      registrationType: "college",
      step: "personalDetails",
      registrationDate: new Date().toISOString(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      officialEmailId: formData.officialEmailId.trim().toLowerCase(),
      phoneNo: formData.phoneNo.trim(),
      designation: formData.designation.trim(),
      department: formData.department.trim(),
      password: formData.password, // store as-is (hash in real app)
      role: "college",
    };

    // Save step snapshot (optional but handy for debugging)
    localStorage.setItem("collegeRegistrationStep1", JSON.stringify(payload));

    // Merge into the single source of truth
    mergeUserRegistration(payload);

    navigate("/register/college/details");
  };

  return (
      <div className="min-h-screen flex flex-col bg-gray-900">
        {/* Header */}
        <header className="bg-white shadow flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4">
          <div className="font-bold text-lg sm:text-xl text-black">
            <span className="text-red-600">YENI</span> Ai
          </div>
          <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
            <a className="hover:text-red-500">Home</a>
            <a className="hover:text-red-500">About Us</a>
            <a className="hover:text-red-500">Our Programs</a>
            <a className="hover:text-red-500">Blogs</a>
            <a className="hover:text-red-500">Contact Us</a>
          </nav>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Enquire Today</button>
        </header>

        {/* Content */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-2">
          {/* Left image */}
          <div className="hidden lg:block">
            <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="Professional"
                className="w-full h-full object-cover"
            />
          </div>

          {/* Right panel */}
          <div className="flex items-start justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6">
            <div className="w-full max-w-4xl mt-6 sm:mt-10 mb-10">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-6 text-center lg:text-left">
                Register Your College or Institution
              </h1>

              <div className="bg-white rounded-lg shadow p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Personal Details</p>
                    <p className="text-sm text-gray-500">User Name & Login</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label className="text-sm text-gray-700">First Name</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="pl-10"
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <Label className="text-sm text-gray-700">Last Name</Label>
                    <Input
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="mt-1"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>

                  <div>
                    <Label className="text-sm text-gray-700">
                      Official Email ID <span className="text-gray-400 text-xs">(College / Institute / University)</span>
                    </Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                          placeholder="name@institution.edu.in"
                          value={formData.officialEmailId}
                          onChange={(e) => handleInputChange("officialEmailId", e.target.value)}
                          className="pl-10"
                      />
                    </div>
                    {errors.officialEmailId && <p className="text-red-500 text-xs mt-1">{errors.officialEmailId}</p>}
                  </div>

                  <div>
                    <Label className="text-sm text-gray-700">Phone No.</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                          placeholder="+91-XXXXXXXXXX"
                          value={formData.phoneNo}
                          onChange={(e) => handleInputChange("phoneNo", e.target.value)}
                          className="pl-10"
                      />
                    </div>
                    {errors.phoneNo && <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>}
                  </div>

                  <div>
                    <Label className="text-sm text-gray-700">Designation</Label>
                    <Input
                        placeholder="Designation"
                        value={formData.designation}
                        onChange={(e) => handleInputChange("designation", e.target.value)}
                        className="mt-1"
                    />
                    {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                  </div>

                  <div>
                    <Label className="text-sm text-gray-700">Department</Label>
                    <Input
                        placeholder="Department"
                        value={formData.department}
                        onChange={(e) => handleInputChange("department", e.target.value)}
                        className="mt-1"
                    />
                    {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                  </div>

                  <div>
                    <Label className="text-sm text-gray-700">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="pl-10"
                      />
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <Label className="text-sm text-gray-700">Confirm Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                          type="password"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className="pl-10"
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="mt-6">
                  <Button onClick={handleNext} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                    Next
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    By sending the request you confirm that you accept our{" "}
                    <a className="underline" href="#" onClick={(e) => e.preventDefault()}>
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a className="underline" href="#" onClick={(e) => e.preventDefault()}>
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}
