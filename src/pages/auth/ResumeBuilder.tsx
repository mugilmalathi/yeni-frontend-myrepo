import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Linkedin, Facebook } from "lucide-react";

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    professionalObjective: "",
    linkedin: "",
    facebook: "",
    company: "",
    jobTitle: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Save resume data to localStorage
    const resumeData = {
      ...formData,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    
    // Complete student registration
    const step1Data = JSON.parse(localStorage.getItem('studentRegistrationStep1') || '{}');
    const step2Data = JSON.parse(localStorage.getItem('studentRegistrationStep2') || '{}');
    
    const completeRegistration = {
      ...step1Data,
      ...step2Data,
      resumeData,
      registrationType: 'student',
      registrationDate: new Date().toISOString()
    };

    localStorage.setItem('userRegistration', JSON.stringify(completeRegistration));
    navigate('/register/student/personalisation');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
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

      {/* Background */}
      <div className="flex-1 flex">
        {/* Left side - Woman image */}
        <div className="hidden lg:block lg:w-1/3">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
            alt="Professional woman"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Resume Builder Form */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-4xl mx-4 shadow-lg overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Resume Builder</h2>
            </div>

            {/* Personal Information */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">First Name</Label>
                  <Input
                    placeholder="Pankaj Kumar"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Last Name</Label>
                  <Input
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="pankajkumar@gmail.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Phone No.</Label>
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
            </div>

            {/* Professional Objective */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Professional Objective</h3>
              <Textarea
                placeholder="Write objective here"
                rows={4}
                value={formData.professionalObjective}
                onChange={(e) => handleInputChange('professionalObjective', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Social Media Handles */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Social Media Handles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">LinkedIn</Label>
                  <div className="relative mt-1">
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="LinkedIn ID"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Facebook, Instagram</Label>
                  <div className="relative mt-1">
                    <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Link Here"
                      value={formData.facebook}
                      onChange={(e) => handleInputChange('facebook', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Work Experience</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Company</Label>
                  <Input
                    placeholder="Company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Job Title</Label>
                  <Input
                    placeholder="Job Title"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => navigate('/register/student/resume')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save & Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}