import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Building2, Globe, MapPin, Link as LinkIcon, University } from "lucide-react";

function mergeUserRegistration(patch: Record<string, any>) {
    const existing = localStorage.getItem("userRegistration");
    const base = existing ? JSON.parse(existing) : {};
    const merged = { ...base, ...patch, registrationType: "college" }; // keep type
    localStorage.setItem("userRegistration", JSON.stringify(merged));
    return merged;
}

export default function CollegeDetails() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        instituteName: "",
        institutionType: "",
        cityState: "",
        affiliatedUniversity: "",
        fullAddress: "",
        country: "",
        department: "",
        website: "",
    });

    const handleInputChange = (field: keyof typeof formData, value: string) =>
        setFormData((p) => ({ ...p, [field]: value }));

    const handleNext = () => {
        const details = {
            ...formData,
            step: "collegeDetails",
            registrationType: "college",
            updatedAt: new Date().toISOString(),
        };

        // DO NOT overwrite – merge to preserve officialEmailId/password from step 1
        mergeUserRegistration(details);

        navigate("/register/college/account");
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
            <main className="flex-1 grid grid-cols-1 md:grid-cols-2">
                <div className="hidden md:block">
                    <img
                        src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                        alt="Professional"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex items-start justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <div className="w-full max-w-4xl mt-10 mb-10 px-6 md:px-12">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                            Register Your College or Institution
                        </h1>

                        <div className="bg-white rounded-lg shadow p-6 md:p-8">
                            <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">College Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-sm text-gray-700">
                                        Name <span className="text-gray-400 text-xs">(College / Institute / University)</span>
                                    </Label>
                                    <div className="relative mt-1">
                                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            placeholder="College / Institute / University Name"
                                            value={formData.instituteName}
                                            onChange={(e) => handleInputChange("instituteName", e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-sm text-gray-700">Type of Institution</Label>
                                    <Select
                                        value={formData.institutionType}
                                        onValueChange={(v) => handleInputChange("institutionType", v)}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Type of Institution" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="college">College</SelectItem>
                                            <SelectItem value="institute">Institute</SelectItem>
                                            <SelectItem value="university">University</SelectItem>
                                            <SelectItem value="autonomous">Autonomous</SelectItem>
                                            <SelectItem value="deemed">Deemed University</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label className="text-sm text-gray-700">City / State</Label>
                                    <div className="relative mt-1">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            placeholder="City / State"
                                            value={formData.cityState}
                                            onChange={(e) => handleInputChange("cityState", e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-sm text-gray-700">Affiliated University</Label>
                                    <div className="relative mt-1">
                                        <University className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            placeholder="Affiliated University"
                                            value={formData.affiliatedUniversity}
                                            onChange={(e) => handleInputChange("affiliatedUniversity", e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-sm text-gray-700">
                                        Full Address <span className="text-gray-400 text-xs">(College / Institute / University)</span>
                                    </Label>
                                    <Input
                                        placeholder="Full Address"
                                        value={formData.fullAddress}
                                        onChange={(e) => handleInputChange("fullAddress", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm text-gray-700">Country</Label>
                                    <div className="relative mt-1">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            placeholder="Country"
                                            value={formData.country}
                                            onChange={(e) => handleInputChange("country", e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-sm text-gray-700">Department</Label>
                                    <Input
                                        placeholder="Department"
                                        value={formData.department}
                                        onChange={(e) => handleInputChange("department", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm text-gray-700">
                                        Website <span className="text-gray-400 text-xs">(College / Institute / University)</span>
                                    </Label>
                                    <div className="relative mt-1">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            placeholder="https://example.edu.in"
                                            value={formData.website}
                                            onChange={(e) => handleInputChange("website", e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
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
