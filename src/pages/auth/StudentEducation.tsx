import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import HttpClient from "@/utils/httpClient";
import { API_BASE_URL } from "@/utils/constants";
import { cookieStore, REGISTRATION_ID_KEY } from "@/lib/utils";

export default function StudentEducation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    degree: "",
    specialization: "",
    yearOfGraduation: "",
    details: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" })); // clear error on change
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.degree.trim()) newErrors.degree = "Degree is required";
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

    const registrationId = cookieStore.get(REGISTRATION_ID_KEY);
    if (!registrationId) {
      setErrors({ general: "Missing registration ID. Please restart registration." });
      return;
    }

    setSubmitting(true);
    try {
      await http.put(`/students/register/${registrationId}/education`, formData);
      navigate("/register/student/resume");
    } catch (e: any) {
      setErrors({ general: e?.message || "Failed to save education" });
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

        {/* Background - Fixed height with proper scrolling */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Image - 50% - Fixed, no scroll */}
          <div className="w-1/2 hidden lg:block">
            <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="Professional woman"
                className="w-full h-full object-cover"
            />
          </div>

          {/* Form - 50% - Scrollable */}
          <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 overflow-y-auto">
            <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg mx-2 sm:mx-4 shadow-lg">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                Tell Us About Your Education
              </h2>

              <div className="space-y-6">
                {/* Degree & Specialization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="degree" className="text-sm text-gray-600">
                      Degree / Course*
                    </Label>
                    <Input
                        id="degree"
                        placeholder="Degree"
                        value={formData.degree}
                        onChange={(e) => handleInputChange("degree", e.target.value)}
                        className="mt-1 text-sm sm:text-base"
                    />
                    {errors.degree && (
                        <p className="text-red-500 text-xs mt-1">{errors.degree}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="specialization" className="text-sm text-gray-600">
                      Specialization / Stream
                    </Label>
                    <Input
                        id="specialization"
                        placeholder="Specialization"
                        value={formData.specialization}
                        onChange={(e) =>
                            handleInputChange("specialization", e.target.value)
                        }
                        className="mt-1 text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Year of Graduation & Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="graduation" className="text-sm text-gray-600">
                      Year of Graduation
                    </Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                          id="graduation"
                          placeholder="July, 2025"
                          value={formData.yearOfGraduation}
                          onChange={(e) =>
                              handleInputChange("yearOfGraduation", e.target.value)
                          }
                          className="pl-10 text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="details" className="text-sm text-gray-600">
                      Details
                    </Label>
                    <Input
                        id="details"
                        placeholder="Details"
                        value={formData.details}
                        onChange={(e) => handleInputChange("details", e.target.value)}
                        className="mt-1 text-sm sm:text-base"
                    />
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 mt-6 sm:mt-8 text-sm sm:text-base"
                >
                  {submitting ? "Submitting..." : "Next"}
                </Button>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  By sending the request you confirm that you accept our{" "}
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
      </div>
  );
}
