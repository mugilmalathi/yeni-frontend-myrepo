import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ResumeUpdates() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md">
        <CardContent className="p-8">
          {/* Header */}
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Upload your Updated Resume</h2>
          <p className="text-gray-600 mb-8">
            Make sure your resume is updated with your latest education, internships, and achievements. 
            We’ll extract skills and roles from your resume to personalize your learning path.
          </p>

          {/* Personal Info */}
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <Input placeholder="First Name" defaultValue="Ankita" />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <Input placeholder="Last Name" defaultValue="Anand" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="Email" defaultValue="ankita.anand2426@bml.edu.in" />
            </div>
            <div>
              <label className="text-sm font-medium">Phone No.</label>
              <Input placeholder="Phone" defaultValue="+91 9634641432" />
            </div>
          </div>

          {/* Professional Objective */}
          <h3 className="text-lg font-semibold mb-4">Professional Objective</h3>
          <Textarea 
            rows={4}
            defaultValue="Curious, data-driven analyst skilled in Excel, SQL, Power BI, and Python. I turn messy data into clear dashboards and forecasting insights that guide action. Known for structured problem-solving, clean storytelling visuals, and calm execution under deadlines."
          />
          
          {/* Social Media Handles */}
          <h3 className="text-lg font-semibold my-6">Social Media Handles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium">LinkedIn</label>
              <Input placeholder="LinkedIn Profile" defaultValue="https://www.linkedin.com/in/ankita--anand/" />
            </div>
            <div>
              <label className="text-sm font-medium">Facebook, Instagram</label>
              <Input placeholder="Link Here" />
            </div>
          </div>

          {/* Work Experience */}
          <h3 className="text-lg font-semibold my-6">Work Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium">Company</label>
              <Input placeholder="Company" defaultValue="Merkle Sokrat" />
            </div>
            <div>
              <label className="text-sm font-medium">Job Title</label>
              <Input placeholder="Job Title" defaultValue="Business Analyst Intern" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <Button className="w-full md:w-auto px-8 py-2">Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
