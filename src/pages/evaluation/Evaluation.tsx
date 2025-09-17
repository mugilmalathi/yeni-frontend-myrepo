import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";

export default function Evaluation() {
  
  const navigate = useNavigate();
  const { jobId = "1" } = useParams();

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

      {/* Start Evaluation Button */}
      <div className="pt-4">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-base font-medium"
          onClick={() => navigate(`/evaluation/${jobId}/ai`)}
          >
          Start Evaluation
        </Button>
      </div>
    </div>
  );
}