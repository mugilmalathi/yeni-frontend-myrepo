import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Evaluation() {
  
  const navigate = useNavigate();
  const { jobId = "1" } = useParams();
  const [jobRole, setJobRole] = useState("");

  // Auto-navigate when job role is entered (like the HTML page)
  useEffect(() => {
    if (jobRole.trim() && jobRole.length > 2) {
      const timer = setTimeout(() => {
        navigate(`/evaluation/${jobId}/interview`, { 
          state: { 
            jobRole: jobRole.trim(),
            company: "Generic" // You can make this dynamic based on jobId
          } 
        });
      }, 1000); // 1 second delay to allow user to see the input

      return () => clearTimeout(timer);
    }
  }, [jobRole, navigate, jobId]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Business Analyst – Banking Domain
          </h1>
          <Badge className="bg-blue-100 text-blue-700 px-4 py-1 text-sm font-medium">
            Sector: Banking & Financial Services
          </Badge>
        </div>
        
        <p className="text-gray-600 text-sm">
          Company: Capgemini
        </p>
        
        <div className="w-full h-px bg-gray-300"></div>
      </div>

      {/* Brief Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-blue-600">Brief:</h2>
        <p className="text-gray-700 leading-relaxed">
          As a Business Analyst, you will act as a bridge between business stakeholders and the technical team. This simulation will 
          test your ability to gather requirements, interpret data, and present insights to clients and internal stakeholders.
        </p>
      </div>

      {/* Key Areas Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-blue-600">Key Areas You'll Be Tested On:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">Requirement gathering & communication</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">Domain knowledge (Banking processes)</span>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">Analytical thinking</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">Client presentation & confidence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Job Role Input Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-blue-600">Enter Job Role:</h2>
        <div className="max-w-md">
          <Input
            type="text"
            placeholder="e.g. Business Analyst"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Start Evaluation Button */}
      <div className="pt-4">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-base font-medium"
          onClick={() => {
            if (jobRole.trim()) {
              // Navigate immediately to AI Interview
              navigate(`/evaluation/${jobId}/interview`, { 
                state: { 
                  jobRole: jobRole.trim(),
                  company: "Generic"
                } 
              });
            }
          }}
          disabled={!jobRole.trim()}
          >
          Start Interview
        </Button>
        {jobRole.trim() && (
          <p className="text-sm text-gray-500 mt-2">
            Auto-navigating in a moment, or click "Start Interview" to go immediately
          </p>
        )}
      </div>
    </div>
  );
}