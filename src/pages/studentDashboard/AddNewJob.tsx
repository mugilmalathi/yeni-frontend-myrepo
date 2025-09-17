import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  Briefcase,
  MapPin,
  Calendar,
  FileText,
  Plus,
  Trash2,
  EllipsisVertical,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Step = 1 | 2 | 3;

export default function AddNewJob() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);

  // minimal state for demo (you can expand this later)
  const [jobRoleName, setJobRoleName] = useState("Business Analyst");
  const [companyName, setCompanyName] = useState("Capgemini");
  const [sector, setSector] = useState("banking");
  const [difficulty, setDifficulty] = useState("Advance");
  const [skills, setSkills] = useState("C++, Java, ...");
  const [location, setLocation] = useState("Delhi");
  const [jobProfileText, setJobProfileText] = useState(
    "As a Business Analyst, you will bridge business stakeholders and technical teams, gather requirements, analyze data, and deliver actionable insights"
  );

  // uploads (UI only)
  const leftUploadRef = useRef<HTMLInputElement | null>(null);
  const rightUploadRef = useRef<HTMLInputElement | null>(null);

  // questions list (Step 2)
  const [questions, setQuestions] = useState<string[]>([
    "Can you explain the difference between functional and non-functional requirements in a banking application?",
    "What are the key regulatory compliance standards in banking that a BA should be aware of?",
    "How would you design a requirements-gathering process for a new digital payments feature?",
    "Explain the concept of KYC (Know Your Customer) and why it's important in banking.",
    "How do you approach creating a Business Requirement Document (BRD) for a mobile banking app?",
    "Explain the concept of KYC (Know Your Customer) and why it's important in banking.",
    "How would you design a requirements-gathering process for a new digital payments feature?",
    "What are the key regulatory compliance standards in banking that a BA should be aware of?",
  ]);

  const addQuestion = (idx: number) => {
    const copy = [...questions];
    copy.splice(idx + 1, 0, "New question…");
    setQuestions(copy);
  };

  const removeQuestion = (idx: number) => {
    const copy = [...questions];
    copy.splice(idx, 1);
    setQuestions(copy);
  };

  const progress = 50; // static like the screenshot

  // --- Step 3 handler ---
  const handleSubmitJob = () => setStep(3);

  return (
    <div className="max-w-5xl mx-auto">
      {step !== 3 && (
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Add New Job</h2>
      )}

      <Card className="bg-white rounded-xl shadow-sm">
        <CardContent className="p-8">
          {step === 1 && (
            <>
              {/* Two-column form like screenshot */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <Label className="text-xs text-gray-600">Job Role Name</Label>
                    <div className="relative mt-1">
                      <Briefcase className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={jobRoleName}
                        onChange={(e) => setJobRoleName(e.target.value)}
                        placeholder="Enter Job Name"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Company Name</Label>
                    <div className="relative mt-1">
                      <Building2 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Company Name"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Job Description (Brief)</Label>
                    <Input placeholder="Enter Job Description" />
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Key Skills Required</Label>
                    <Input
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="C++, Java, .."
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Location</Label>
                    <div className="relative mt-1">
                      <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Delhi"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <Label className="text-xs text-gray-600">Sector</Label>
                    <Input
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      placeholder="banking"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Difficulty Level</Label>
                    <Input
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      placeholder="Beginner/Int/Adv"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Drag and Drop the Job Profile.</Label>
                    <Textarea
                      value={jobProfileText}
                      onChange={(e) => setJobProfileText(e.target.value)}
                      placeholder="Enter Job Description and Details"
                      rows={3}
                    />
                  </div>

                  {/* Right upload dashed box */}
                  <UploadBox
                    label="Add PDF or word"
                    inputRef={rightUploadRef}
                  />
                </div>
              </div>

              {/* Middle row: questionnaire + extra docs */}
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">
                    Drag and Drop the AI Questionnaire Document
                  </Label>
                  <Textarea placeholder="Enter the Questionnaires available" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">
                    Add Extra documents relevant to the Job Profile for AI Training
                  </Label>
                  <div className="grid grid-cols-[1fr_140px] gap-4">
                    <Textarea
                      placeholder="Documents to train the AI on the relevant Job Profile"
                      rows={3}
                    />
                    <UploadBox label="Add PDF or word" inputRef={leftUploadRef} />
                  </div>
                </div>
              </div>

              {/* Training meter */}
              <div className="mt-8">
                <div className="rounded-md bg-gray-50 p-3 text-xs text-gray-600">
                  <span className="font-semibold">AI Training Requirement Meter</span>{" "}
                  (This shows if the data mentioned above is enough for training AI)
                </div>
                <div className="mt-2 h-2 w-full rounded bg-gray-200">
                  <div
                    className="h-2 rounded bg-blue-600"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-gray-600">{progress}%</div>
              </div>

              {/* CTA */}
              <Button
                className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setStep(2)}
              >
                Add job Description
              </Button>

              {/* Terms */}
              <p className="mt-3 text-center text-xs text-gray-500">
                By sending the request you can confirm that you accept our{" "}
                <span className="cursor-pointer text-blue-600 underline">Terms of Service</span>{" "}
                and{" "}
                <span className="cursor-pointer text-blue-600 underline">Privacy Policy</span>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-md border bg-white p-4 shadow-sm"
                  >
                    <p className="pr-4 text-gray-800">{q}</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="rounded-md p-2 hover:bg-gray-100"
                        aria-label="more"
                      >
                        <EllipsisVertical className="h-5 w-5 text-gray-500" />
                      </button>
                      <button
                        type="button"
                        className="rounded-md bg-green-500 p-2 text-white hover:bg-green-600"
                        onClick={() => addQuestion(idx)}
                        aria-label="add"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        className="rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
                        onClick={() => removeQuestion(idx)}
                        aria-label="delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleSubmitJob}
              >
                Add Job
              </Button>

              <p className="mt-3 text-center text-xs text-gray-500">
                By sending the request you can confirm that you accept our{" "}
                <span className="cursor-pointer text-blue-600 underline">Terms of Service</span>{" "}
                and{" "}
                <span className="cursor-pointer text-blue-600 underline">Privacy Policy</span>
              </p>
            </>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
                  <ClipboardList className="h-12 w-12 text-blue-600" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-blue-700">
                Job Role Submitted for Review
              </h2>

              <p className="mt-2 text-gray-800">Thank you for submitting a job role!</p>

              <p className="mt-4 max-w-2xl text-sm text-gray-600">
                Your submission has been received and is currently under review by the Yeni AI
                Content Team. We ensure every job simulation meets quality and industry relevance
                standards before publishing.
              </p>

              <div className="mt-6 w-full max-w-xl space-y-3 text-left">
                {[
                  "Your submission will be reviewed and enhanced (if needed) by our experts",
                  "You'll receive a notification once it's approved and live on the platform",
                  "You can track the status under My Submissions > Job Roles in your dashboard",
                ].map((line) => (
                  <div key={line} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-gray-700">{line}</p>
                  </div>
                ))}
              </div>

              <Button
                className="mt-8 rounded-full bg-blue-600 px-8 py-6 text-white hover:bg-blue-700"
                onClick={() => navigate("/studentDashboard")}
              >
                Home
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/** Small dashed upload box like screenshot */
function UploadBox({
  label,
  inputRef,
}: {
  label: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="flex h-[90px] items-center justify-center rounded-md border-2 border-dashed border-indigo-300">
      <input ref={inputRef} type="file" className="hidden" />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 text-indigo-700"
      >
        <FileText className="h-5 w-5" />
        <span className="text-sm font-medium">{label}</span>
      </button>
    </div>
  );
}
