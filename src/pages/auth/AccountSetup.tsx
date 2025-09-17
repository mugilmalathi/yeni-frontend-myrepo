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

    const onChange = (field: keyof typeof form, value: string | boolean) =>
        setForm((p) => ({ ...p, [field]: value as any }));

    const canSubmit = useMemo(() => {
        if (!form.studentCount || !form.startMonth || !form.branchOfStudents) return false;
        if (!form.isAuthorized || !form.agreeTerms) return false;
        const n = Number(form.studentCount);
        return Number.isFinite(n) && n > 0;
    }, [form]);

    const handleCreate = () => {
        const payload = {
            ...form,
            step: "accountSetup",
            registrationType: "college",
            updatedAt: new Date().toISOString(),
        };

        // Merge to preserve officialEmailId/password set in step 1
        const finalState = mergeUserRegistration(payload);

        // Optional safety: ensure we still have credentials present for login
        // (useful if user jumped steps)
        if (!finalState.officialEmailId || !finalState.password) {
            // If missing, try to recover from step snapshot
            const s1 = localStorage.getItem("collegeRegistrationStep1");
            if (s1) {
                const { officialEmailId, password } = JSON.parse(s1);
                mergeUserRegistration({ officialEmailId, password });
            }
        }

        // proceed to personalization or finish
        navigate("/register/college/personalisation");
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
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Setup</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-sm text-gray-700">No. of Students to Onboard</Label>
                                    <Input
                                        placeholder="Student No"
                                        inputMode="numeric"
                                        value={form.studentCount}
                                        onChange={(e) => onChange("studentCount", e.target.value)}
                                        className="mt-1"
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
                                            className="pl-10"
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
                                            <SelectTrigger>
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
                                <Button
                                    onClick={handleCreate}
                                    disabled={!canSubmit}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3"
                                >
                                    Create Admin Account
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
