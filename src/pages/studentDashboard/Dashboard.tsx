import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  Clock,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Sample image (you can replace with your own asset) ---
const SAMPLE_IMG =
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop";

// Reusable Job Card
type JobCardProps = {
  title: string;
  experienceLabel: string;
  company: string;
  image?: string;
  badge?: { label: string; tone: "added" | "cta"; onClick?: () => void };
};

function JobCard({
  title,
  experienceLabel,
  company,
  image = SAMPLE_IMG,
  badge,
}: JobCardProps) {
  return (
    <Card className="overflow-hidden border shadow-sm">
      {/* Image */}
      <div className="h-40 w-full bg-gray-200">
        <img
          src={image}
          alt={title}
          className="h-40 w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Body */}
      <CardContent className="p-4">
        <h4 className="text-xl font-semibold text-gray-900">{title}</h4>

        {/* Experience badge */}
        <div className="mt-2 inline-flex items-center rounded-md bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-900">
          {experienceLabel}
        </div>

        {/* Company + right-side status/cta pill */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-800 text-lg">{company}</p>

          {badge?.tone === "added" ? (
            // Non-clickable pill
            <span className="select-none rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              {badge.label}
            </span>
          ) : badge?.tone === "cta" ? (
            <Button
              size="sm"
              className="rounded-full px-4"
              onClick={badge.onClick}
            >
              {badge.label}
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-blue-600 text-white rounded-xl p-6">
        <h2 className="text-2xl font-bold">
          Welcome, Pankaj – BML Munjal University
        </h2>
        <p className="text-sm mt-2">
          You are now managing immersive training for 20 active students across
          2 batches.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by Students, Job Roles, or Student ID"
            className="pl-10"
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
          Search
        </Button>
      </div>

      {/* Student Summary */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Student Summary</h3>
          <p className="text-sm text-gray-600">
            Students who have used YENI AI Portal in last 7 Days
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <CardContent className="p-0 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Total Enrolled Students
                </p>
                <p className="text-3xl font-bold text-gray-800">102</p>
              </div>
              <Users className="w-8 h-8 text-gray-400" />
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Students</p>
                <p className="text-3xl font-bold text-green-600">75</p>
              </div>
              <UserCheck className="w-8 h-8 text-gray-400" />
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inactive Students</p>
                <p className="text-3xl font-bold text-red-600">27</p>
              </div>
              <UserX className="w-8 h-8 text-gray-400" />
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-3xl font-bold text-orange-500">12</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-6 h-6 text-gray-400" />
                <Button
                  size="sm"
                  className="mt-1 text-xs bg-blue-600 hover:bg-blue-700"
                >
                  Check
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <CardContent className="p-0">
              <h4 className="font-semibold text-gray-800 mb-2">
                Average Student Score
              </h4>
              <p className="text-sm text-gray-600 mb-4">For Practice Zone</p>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">78%</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <h4 className="font-semibold text-gray-800 mb-2">
                Average Student Score
              </h4>
              <p className="text-sm text-gray-600 mb-4">For Upskilling Zone</p>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  85%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <h4 className="font-semibold text-gray-800 mb-2">
                Student Web & VR Login
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                It is based on the Number of times user Logins platform
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Web Login</span>
                  <span className="font-semibold">245</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">VR Login</span>
                  <span className="font-semibold">89</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summary View */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Summary View</h3>
        <div className="flex gap-2">
          <Input placeholder="Search" className="w-1/3" />
          <Button>Filter</Button>
          <Button variant="outline">Download Report</Button>
        </div>
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Batch</th>
                <th className="p-3">Stream</th>
                <th className="p-3">Progress</th>
                <th className="p-3">Role Matched</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t">
                <td className="p-3">Riya Mehta</td>
                <td className="p-3">riya@abc.edu</td>
                <td className="p-3">2025</td>
                <td className="p-3">CS & Engg</td>
                <td className="p-3">
                  <span className="text-green-600 font-medium">60%</span>
                </td>
                <td className="p-3">Business Analyst</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Amit Sinha</td>
                <td className="p-3">amit@xyz.edu</td>
                <td className="p-3">2024</td>
                <td className="p-3">IT</td>
                <td className="p-3">
                  <span className="text-red-600 font-medium">55%</span>
                </td>
                <td className="p-3">Data Analyst</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Priya Nair</td>
                <td className="p-3">priya@abc.edu</td>
                <td className="p-3">2025</td>
                <td className="p-3">Finance</td>
                <td className="p-3">
                  <span className="text-orange-500 font-medium">25%</span>
                </td>
                <td className="p-3">HR Executive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Current Job Roles Available */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Current Job Roles Available</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1: Added (not clickable) */}
          <JobCard
            title="Data Analyst"
            experienceLabel="3-2 Years Experience"
            company="Deloitte"
            badge={{ label: "Added", tone: "added" }}
          />

          {/* Card 2: Click to Add (clickable) */}
          <JobCard
            title="Data Analyst"
            experienceLabel="3-2 Years Experience"
            company="Deloitte"
            badge={{
              label: "Click to Add",
              tone: "cta",
              onClick: () => {
                console.log("Add job clicked");
              },
            }}
          />

          {/* Card 3: Add New Job */}
          <Card
            onClick={() => navigate("/studentDashboard/add-job")}
            className="flex h-full cursor-pointer items-center justify-center border-2 border-dashed border-gray-300 bg-white hover:border-blue-500"
          >
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Plus className="mb-3 h-8 w-8" />
              <p className="text-lg font-medium text-gray-900">Add New Job</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
