import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function UpskillingExperience() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Domain Knowledge – Banking & Financial Services
          </h1>
          <Badge className="bg-blue-100 text-blue-700 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium self-start sm:self-auto">
            Skill: Domain Knowledge
          </Badge>
        </div>
        
        <div className="w-full h-px bg-gray-300"></div>
      </div>

      {/* Brief Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-blue-600">Brief:</h2>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          Master the essential terminology, processes, and workflows specific to the Banking & Financial Services industry. 
          This module will equip you with the domain expertise needed to communicate effectively with stakeholders and 
          understand business requirements in financial contexts.
        </p>
      </div>

      {/* What You'll Learn Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-blue-600">What You'll Learn:</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 text-sm sm:text-base">Banking terminology & core concepts</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 text-sm sm:text-base">Financial products & services overview</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 text-sm sm:text-base">Regulatory compliance basics</span>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 text-sm sm:text-base">Customer journey mapping</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 text-sm sm:text-base">Risk management principles</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 text-sm sm:text-base">Digital banking trends</span>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Modules Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-blue-600">Learning Modules:</h2>
        
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <span className="text-gray-800 font-medium text-sm sm:text-base">Introduction to Banking Fundamentals</span>
            <Badge className="bg-green-100 text-green-700 text-xs">15 min</Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <span className="text-gray-600 text-sm sm:text-base">Financial Products Deep Dive</span>
            <Badge className="bg-gray-100 text-gray-600 text-xs">20 min</Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <span className="text-gray-600 text-sm sm:text-base">Compliance & Risk Assessment</span>
            <Badge className="bg-gray-100 text-gray-600 text-xs">25 min</Badge>
          </div>
        </div>
      </div>

      {/* Start Experience Button */}
      <div className="pt-4 pb-6">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium w-full sm:w-auto">
          Start Experience
        </Button>
      </div>
    </div>
  );
}