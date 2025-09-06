import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Lock, Phone } from "lucide-react";

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
    confirmPassword: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    localStorage.setItem('studentRegistrationStep1', JSON.stringify(formData));
    navigate('/register/student/education');
  };

  return (
      <div className="min-h-screen flex flex-col">
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

        {/* Body */}
        <div className="flex flex-1">
          {/* Left Image */}
          <div className="w-1/3 hidden md:block">
            <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="Professional woman"
                className="w-full h-full object-cover"
            />
          </div>

          {/* Right Form */}
          <div className="w-full md:w-2/3 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="bg-white rounded-lg p-10 w-full max-w-2xl mx-8 shadow-lg">
              {/* Title */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Tell Us About Yourself</h2>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-medium text-gray-700">User Name</span>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">First Name</Label>
                    <Input
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Last Name</Label>
                    <Input
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="mt-1"
                    />
                  </div>
                </div>

                {/* College Name & Department */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">College/Institute/University</Label>
                    <Select onValueChange={(value) => handleInputChange('name', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bml">BML Munjal University</SelectItem>
                        <SelectItem value="du">Delhi University</SelectItem>
                        <SelectItem value="iit">IIT Delhi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Department</Label>
                    <Input
                        placeholder="Design"
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="mt-1"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">Email ID</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                          placeholder="name@student.bml.edu.in"
                          value={formData.emailId}
                          onChange={(e) => handleInputChange('emailId', e.target.value)}
                          className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Phone No.</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                          placeholder="+91 7070708541"
                          value={formData.phoneNo}
                          onChange={(e) => handleInputChange('phoneNo', e.target.value)}
                          className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                          type="password"
                          placeholder="••••••••••"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="pl-10"
                      />
                    </div>
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
                          className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <Button
                    onClick={handleNext}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-6"
                >
                  Next
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
