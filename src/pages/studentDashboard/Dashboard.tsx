import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, UserCheck, UserX, Clock } from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-blue-600 text-white rounded-xl p-6">
        <h2 className="text-2xl font-bold">Welcome, Pankaj – BML Munjal University</h2>
        <p className="text-sm mt-2">
          You are now managing immersive training for 20 active students across 2 batches.
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
          <p className="text-sm text-gray-600">Students who have used YENI AI Portal in last 7 Days</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <CardContent className="p-0 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Enrolled Students</p>
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
                <Button size="sm" className="mt-1 text-xs bg-blue-600 hover:bg-blue-700">
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
              <h4 className="font-semibold text-gray-800 mb-2">Average Student Score</h4>
              <p className="text-sm text-gray-600 mb-4">For Practice Zone</p>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">78%</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <h4 className="font-semibold text-gray-800 mb-2">Average Student Score</h4>
              <p className="text-sm text-gray-600 mb-4">For Upskilling Zone</p>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <h4 className="font-semibold text-gray-800 mb-2">Student Web & VR Login</h4>
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
    </div>
  );
}