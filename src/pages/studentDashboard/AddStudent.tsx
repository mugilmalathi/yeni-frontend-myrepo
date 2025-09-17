import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar, Mail, Phone, User, FileText } from "lucide-react";

type Student = {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  degree: string;
  start: string;
  end: string;
  department: string;
  phone: string;
  specialization: string;
  details: string;
  studentId: string;
  createdAt: string;
};

export default function AddStudent() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<Student>({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    degree: "",
    start: "",
    end: "",
    department: "",
    phone: "",
    specialization: "",
    details: "",
    studentId: "",
    createdAt: "",
  });

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handle = (key: keyof Student, val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  const handleFiles = (files: FileList | null) => {
    if (!files || !files[0]) return;
    const file = files[0];
    setSelectedFileName(file.name);
    // If you need to persist file temporarily, you could store to state here.
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // very light validation
    if (!form.name || !form.email || !form.studentId) {
      alert("Please fill Name, Email, and Student ID");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const toSave: Student = {
      ...form,
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage (append to 'students' array)
    const existing = localStorage.getItem("students");
    const list: Student[] = existing ? JSON.parse(existing) : [];
    list.push(toSave);
    localStorage.setItem("students", JSON.stringify(list));
    localStorage.setItem("lastAddedStudent", JSON.stringify(toSave));

    // Navigate to success page
    navigate("/studentDashboard/students/success");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white rounded-xl shadow-sm">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Add Student</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left */}
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Student Name</Label>
                  <Input
                    placeholder="Student Name"
                    className="mt-1"
                    value={form.name}
                    onChange={(e) => handle("name", e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">College Email ID</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="name@student.bml.edu.in"
                      className="pl-10"
                      value={form.email}
                      onChange={(e) => handle("email", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Password</Label>
                  <Input
                    type="password"
                    placeholder="********"
                    className="mt-1"
                    value={form.password}
                    onChange={(e) => handle("password", e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Degree / Course*</Label>
                  <Input
                    placeholder="B.Tech CSE"
                    className="mt-1"
                    value={form.degree}
                    onChange={(e) => handle("degree", e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Start Month & Year</Label>
                  <div className="relative mt-1">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Aug 2023"
                      className="pl-10"
                      value={form.start}
                      onChange={(e) => handle("start", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">End Month & Year</Label>
                  <div className="relative mt-1">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="May 2027"
                      className="pl-10"
                      value={form.end}
                      onChange={(e) => handle("end", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Department</Label>
                  <Input
                    placeholder="Design / CSE / IT"
                    className="mt-1"
                    value={form.department}
                    onChange={(e) => handle("department", e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Phone No.</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="+91 98765 43210"
                      className="pl-10"
                      value={form.phone}
                      onChange={(e) => handle("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Confirm Password</Label>
                  <Input
                    type="password"
                    placeholder="********"
                    className="mt-1"
                    value={form.confirmPassword}
                    onChange={(e) => handle("confirmPassword", e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Specialization / Stream</Label>
                  <Input
                    placeholder="AI/ML, Data Analytics"
                    className="mt-1"
                    value={form.specialization}
                    onChange={(e) => handle("specialization", e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Details</Label>
                  <Input
                    placeholder="Any additional info"
                    className="mt-1"
                    value={form.details}
                    onChange={(e) => handle("details", e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">User Student ID</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="STU-0001"
                      className="pl-10"
                      value={form.studentId}
                      onChange={(e) => handle("studentId", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* File Upload Section */}
            <div
              className={`mt-8 p-6 border-2 border-dashed rounded-lg text-center transition-colors ${
                isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                handleFiles(e.dataTransfer.files);
              }}
            >
              <div className="space-y-2">
                <FileText className="w-12 h-12 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-600">Drag and drop files here</p>
                <p className="text-xs text-gray-500">or</p>

                {/* Hidden input */}
                <input
                  ref={fileInputRef}
                  id="studentFile"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />

                {/* Browse button triggers hidden input */}
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Browse Files
                </Button>

                {/* Selected file name */}
                {selectedFileName && (
                  <p className="mt-2 text-sm text-gray-700">
                    Selected: <span className="font-medium">{selectedFileName}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium"
              >
                Add Student
              </Button>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center mt-4">
              By sending this request you confirm that you accept our{" "}
              <span className="text-blue-600 underline cursor-pointer">Terms of Service</span>{" "}
              and{" "}
              <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
