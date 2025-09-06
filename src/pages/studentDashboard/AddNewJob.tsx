import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Briefcase, MapPin, DollarSign, Calendar, FileText, Users } from "lucide-react";

export default function AddNewJob() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white rounded-xl shadow-sm">
        <CardContent className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Add New Job</h2>
            <p className="text-gray-600 mt-2">Create a new job posting for students to practice with</p>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">Job Title*</Label>
                <div className="relative mt-1">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="e.g. Business Analyst" className="pl-10" />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Company Name*</Label>
                <div className="relative mt-1">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="e.g. Capgemini" className="pl-10" />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Location</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="e.g. Mumbai, India" className="pl-10" />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Salary Range</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="e.g. 5-8 LPA" className="pl-10" />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Experience Level</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                    <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Application Deadline</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input type="date" className="pl-10" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">Department/Sector*</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banking">Banking & Financial Services</SelectItem>
                    <SelectItem value="it">Information Technology</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Employment Type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fulltime">Full-time</SelectItem>
                    <SelectItem value="parttime">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Required Skills</Label>
                <Input placeholder="e.g. SQL, Excel, Communication" className="mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Job Description</Label>
                <Textarea 
                  placeholder="Enter detailed job description..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Number of Positions</Label>
                <div className="relative mt-1">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="e.g. 5" type="number" className="pl-10" />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Job ID</Label>
                <Input placeholder="Auto-generated" disabled className="mt-1 bg-gray-50" />
              </div>
            </div>
          </div>

          {/* Additional Requirements */}
          <div className="mt-8 space-y-4">
            <Label className="text-sm font-medium text-gray-700">Additional Requirements</Label>
            <Textarea 
              placeholder="Any additional requirements, qualifications, or notes..."
              rows={3}
            />
          </div>

          {/* File Upload Section */}
          <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <div className="space-y-2">
              <FileText className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="text-sm text-gray-600">Upload Job Description Document</p>
              <p className="text-xs text-gray-500">Drag and drop files here or</p>
              <Button variant="outline" size="sm">
                Browse Files
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <Button variant="outline" className="flex-1">
              Save as Draft
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              Publish Job
            </Button>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-4">
            By creating this job posting you confirm that you accept our{" "}
            <span className="text-blue-600 underline cursor-pointer">Terms of Service</span> and{" "}
            <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}