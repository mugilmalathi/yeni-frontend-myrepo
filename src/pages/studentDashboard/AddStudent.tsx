import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar, Mail, Phone, User, GraduationCap, FileText } from "lucide-react";

export default function AddStudent() {
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
              <h2 className="text-xl font-semibold">User Name</h2>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">Student Name</Label>
                <Input placeholder="Student Name" className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">College Email ID</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="name@student.bml.edu.in" className="pl-10" />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Password</Label>
                <Input type="password" placeholder="name@student.bml.edu.in" className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Degree / Course*</Label>
                <Input placeholder="Degree" className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Start Month & Year</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Start Month and Year" className="pl-10" />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">End Month & Year</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Phone No." className="pl-10" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">Department</Label>
                <Input placeholder="Design" className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Phone No.</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="+91 7070708541" className="pl-10" />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Confirm Password</Label>
                <Input type="password" placeholder="••••••••••" className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Specialization / Stream</Label>
                <Input placeholder="Specialization" className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Details</Label>
                <Input placeholder="Details" className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">User Student ID</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Student ID" className="pl-10" />
                </div>
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <div className="space-y-2">
              <FileText className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="text-sm text-gray-600">Drag and drop files here</p>
              <p className="text-xs text-gray-500">or</p>
              <Button variant="outline" size="sm">
                Browse Files
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium">
              Add Student
            </Button>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-4">
            By sending this request you can confirm that you accept our{" "}
            <span className="text-blue-600 underline cursor-pointer">Terms of Service</span> and{" "}
            <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}