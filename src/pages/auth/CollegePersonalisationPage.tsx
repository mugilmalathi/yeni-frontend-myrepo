import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HttpClient from "@/utils/httpClient";

export default function CollegePersonalisationPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const handleOpenDashboard = async () => {
        setIsLoading(true);
        setError("");
        
        try {
            const registrationId = localStorage.getItem("collegeRegistrationId");
            if (!registrationId) {
                throw new Error('Registration ID not found. Please start over.');
            }

            const httpClient = new HttpClient({ baseURL: 'http://localhost:4000/api' });
            
            const payload = {
                acceptTerms: true,
            };

            const response = await httpClient.post<{ role: string; message: string }>(`/colleges/register/${registrationId}/finalize`, payload);
            
            // Clear registration data
            localStorage.removeItem("collegeRegistrationId");
            localStorage.removeItem("collegeRegistrationStep1");
            localStorage.removeItem("userRegistration");
            
            // Navigate to login page
            navigate("/login");
        } catch (error) {
            console.error('Finalization failed:', error);
            setError('Failed to complete registration. Please try again.');
        } finally {
            setIsLoading(false);
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
                {/* Left side - Woman image - Fixed, no scroll */}
                <div className="w-1/2 hidden lg:block">
                    <img
                        src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                        alt="Professional woman"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Content - Scrollable */}
                <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0b2b50] text-white p-4 sm:p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-sm sm:max-w-md md:max-w-lg text-center">
                        <div className="mb-4 sm:mb-6 flex justify-center">
                            {/* Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 sm:h-16 sm:w-16 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-blue-400">
                            Personalising Your Journey
                        </h1>
                        <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
                            Based on the details provided above, our AI model will create a
                            personalised dashboard for you.
                        </p>
                        {error && <p className="text-red-500 text-xs sm:text-sm mb-3 sm:mb-4 text-center">{error}</p>}
                        <button
                            onClick={handleOpenDashboard}
                            disabled={isLoading}
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm sm:text-base"
                        >
                            {isLoading ? 'Completing Registration...' : 'Open Dashboard'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
