import { useMemo, useState } from "react";
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
import { Calendar as CalendarIcon } from "lucide-react";
import HttpClient from "@/utils/httpClient";

function mergeUserRegistration(patch: Record<string, any>) {
    const existing = localStorage.getItem("userRegistration");
    const base = existing ? JSON.parse(existing) : {};
    const merged = { ...base, ...patch, registrationType: "college" };
    localStorage.setItem("userRegistration", JSON.stringify(merged));
    return merged;
}

export default function AccountSetup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        studentCount: "",
        startMonth: "", // yyyy-mm
        branchOfStudents: "",
        isAuthorized: false,
        agreeTerms: false,
    });

    const [errors, setErrors] = useState<{ [k: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (field: keyof typeof form, value: string | boolean) =>
        setForm((p) => ({ ...p, [field]: value as any }));

    const canSubmit = useMemo(() => {
        if (!form.studentCount || !form.startMonth || !form.branchOfStudents) return false;
        if (!form.isAuthorized || !form.agreeTerms) return false;
        const n = Number(form.studentCount);
        return Number.isFinite(n) && n > 0;
    }, [form]);

    const handleCreate = async () => {
        if (!canSubmit) {
            setErrors({ general: 'Please fill in all required fields and accept terms' });
            return;
        }

        setIsLoading(true);
        try {
            const registrationId = localStorage.getItem("collegeRegistrationId");
            if (!registrationId) {
                throw new Error('Registration ID not found. Please start over.');
            }

            const httpClient = new HttpClient({ baseURL: 'http://localhost:4000/api' });
            
            const payload = {
                studentCount: parseInt(form.studentCount),
                startMonth: form.startMonth,
                branchOfStudents: form.branchOfStudents,
                isAuthorized: form.isAuthorized,
                agreeTerms: form.agreeTerms,
            };

            await httpClient.put(`/colleges/register/${registrationId}/account-setup`, payload);
            
            // Save step data
            const stepData = {
                ...form,
                step: "accountSetup",
                registrationType: "college",
                updatedAt: new Date().toISOString(),
            };

            mergeUserRegistration(stepData);
            navigate("/register/college/personalisation");
        } catch (error) {
            console.error('Account setup failed:', error);
            setErrors({ general: 'Failed to setup account. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-900 overflow-hidden">
            {/* Header - Fixed */}
            <header className="bg-white shadow flex items-center justify-between px-3 sm:px-6 md:px-8 lg:px-16 py-3 sm:py-4 flex-shrink-0">
                <div className="font-bold text-base sm:text-lg md:text-xl text-black">
                    <span className="text-red-600">YENI</span> Ai
                </div>
                <nav className="hidden sm:flex gap-2 md:gap-4 lg:gap-6 text-gray-700 font-medium text-xs sm:text-sm md:text-base">
                    <a className="hover:text-red-500">Home</a>
                    <a className="hover:text-red-500">About Us</a>
                    <a className="hover:text-red-500">Our Programs</a>
                    <a className="hover:text-red-500">Blogs</a>
                    <a className="hover:text-red-500">Contact Us</a>
                </nav>
                <button className="bg-red-500 text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded hover:bg-red-600 text-xs sm:text-sm md:text-base">Enquire Today</button>
            </header>

            {/* Content - Fixed height with proper scrolling */}
            <main className="flex-1 flex overflow-hidden">
                {/* Left image - 50% - Fixed, no scroll */}
                <div className="w-1/2 hidden lg:block">
                    <img
                        src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                        alt="Professional"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right panel - 50% - Scrollable */}
                <div className="w-full lg:w-1/2 flex items-start justify-center bg-gradient-to-br from-gray-800 to-gray-900 overflow-y-auto">
                    <div className="w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl mt-4 sm:mt-6 md:mt-8 lg:mt-10 mb-6 sm:mb-8 lg:mb-10 px-3 sm:px-4 md:px-6 lg:px-12">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 sm:mb-6">
                            Register Your College or Institution
                        </h1>

                        <div className="bg-white rounded-lg shadow p-4 sm:p-6 md:p-8">
                            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Account Setup</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                                <div>
                                    <Label className="text-sm text-gray-700">No. of Students to Onboard</Label>
                                    <Input
                                        placeholder="Student No"
                                        inputMode="numeric"
                                        value={form.studentCount}
                                        onChange={(e) => onChange("studentCount", e.target.value)}
                                        className="mt-1 text-sm sm:text-base"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm text-gray-700">Preferred Start Month</Label>
                                    <div className="relative mt-1">
                                        <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            type="month"
                                            placeholder="Start"
                                            value={form.startMonth}
                                            onChange={(e) => onChange("startMonth", e.target.value)}
                                            className="pl-10 text-sm sm:text-base"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <Label className="text-sm text-gray-700">Branch of Students</Label>
                                    <div className="mt-1">
                                        <Select
                                            value={form.branchOfStudents}
                                            onValueChange={(v) => onChange("branchOfStudents", v)}
                                        >
                                            <SelectTrigger className="text-sm sm:text-base">
                                                <SelectValue placeholder="Choose branch" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="cse">Computer Science & Engineering</SelectItem>
                                                <SelectItem value="ece">Electronics & Communication</SelectItem>
                                                <SelectItem value="mech">Mechanical Engineering</SelectItem>
                                                <SelectItem value="civil">Civil Engineering</SelectItem>
                                                <SelectItem value="mba">MBA</SelectItem>
                                                <SelectItem value="others">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <label className="flex items-start gap-3 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        className="mt-1"
                                        checked={form.isAuthorized}
                                        onChange={(e) => onChange("isAuthorized", e.target.checked)}
                                    />
                                    <span>I confirm I am authorized to represent this institution.</span>
                                </label>

                                <label className="flex items-start gap-3 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        className="mt-1"
                                        checked={form.agreeTerms}
                                        onChange={(e) => onChange("agreeTerms", e.target.checked)}
                                    />
                                    <span>
                    I agree to the{" "}
                                        <a className="underline" href="#" onClick={(e) => e.preventDefault()}>
                      Terms &amp; Privacy Policy
                    </a>.
                  </span>
                                </label>
                            </div>

                            <div className="mt-6">
                                {errors.general && <p className="text-red-500 text-sm mb-3 text-center">{errors.general}</p>}
                                <Button
                                    onClick={handleCreate}
                                    disabled={!canSubmit || isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 sm:py-3 text-sm sm:text-base"
                                >
                                    {isLoading ? 'Setting up...' : 'Create Admin Account'}
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
