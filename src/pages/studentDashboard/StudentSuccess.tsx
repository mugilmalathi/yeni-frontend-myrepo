import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GraduationCap, CheckCircle2 } from "lucide-react";

export default function StudentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white rounded-xl shadow-sm">
        <CardContent className="p-10">
          <div className="flex flex-col items-center text-center">
            {/* Illustration */}
            <div className="mb-4">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
                <GraduationCap className="h-12 w-12 text-blue-600" />
              </div>
            </div>

            {/* Title + subtext */}
            <h2 className="text-2xl font-bold text-blue-600">
              Student Successfully Added
            </h2>

            <p className="mt-2 text-gray-700">
              Student will be Notified on Mail with the Login Credentials
            </p>

            <p className="mt-4 text-sm text-gray-500">
              You’ve successfully added a new student to your institution’s dashboard.
            </p>

            {/* Checklist */}
            <div className="mt-6 w-full max-w-2xl space-y-4 text-left">
              {[
                "The student will receive an email with a unique login link (Passlink)",
                "They can begin their journey by accessing the VR platform",
                "Their progress and reports will be visible in your admin dashboard under “Student Analytics”",
              ].map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-700">{line}</p>
                </div>
              ))}
            </div>

            {/* Home button */}
            <Button
              className="mt-8 rounded-full bg-blue-600 px-8 py-6 text-white hover:bg-blue-700"
              onClick={() => navigate("/studentDashboard")}
            >
              Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
