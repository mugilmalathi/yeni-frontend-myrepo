import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Mail, Lock, Phone, User } from "lucide-react";

export default function CollegeRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    instituteName: "",
    adminName: "",
    emailId: "",
    phoneNo: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    // Store college registration data
    const registrationData = {
      ...formData,
      registrationType: 'college',
      registrationDate: new Date().toISOString()
    };

    localStorage.setItem('userRegistration', JSON.stringify(registrationData));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', 'college');
    
    navigate('/studentDashboard');
  };

  return (
  <main className="flex-1 bg-gray-900">
    <div className="flex h-full min-h-[calc(100vh-72px)]">
      {/* Left: Image */}
      <div className="hidden md:block basis-1/3 relative">
        <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
            alt="Professional woman"
            className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right: Form on dark gradient (fills fully, no white gutter) */}
      <div className="basis-full md:basis-2/3 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">College/Institute Registration</h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-medium text-gray-700">Institution Details</span>
            </div>
          </div>

          {/* Form (unchanged) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-600">Institute/College Name*</Label>
                <div className="relative mt-1">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                      placeholder="Institute Name"
                      value={formData.instituteName}
                      onChange={(e) => handleInputChange('instituteName', e.target.value)}
                      className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-600">Admin Name*</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                      placeholder="Admin Name"
                      value={formData.adminName}
                      onChange={(e) => handleInputChange('adminName', e.target.value)}
                      className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-600">Official Email ID*</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                      placeholder="admin@institution.org.co.in"
                      value={formData.emailId}
                      onChange={(e) => handleInputChange('emailId', e.target.value)}
                      className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-600">Phone Number*</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                      placeholder="+91 9876543210"
                      value={formData.phoneNo}
                      onChange={(e) => handleInputChange('phoneNo', e.target.value)}
                      className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-600">Password*</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                      type="password"
                      placeholder="••••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-600">Address*</Label>
                <Input
                    placeholder="Complete Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-600">City*</Label>
                <Input
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-600">State*</Label>
                <Select onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="haryana">Haryana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm text-gray-600">Pincode*</Label>
                <Input
                    placeholder="123456"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-600">Confirm Password*</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
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
          </div>

          {/* Register Button */}
          <div className="flex flex-col justify-center mt-6">
            <Button
                onClick={handleRegister}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  </main>

);
}