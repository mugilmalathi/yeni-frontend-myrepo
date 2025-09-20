import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, Video, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function AIInterview() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get job role from navigation state
  const jobRole = location.state?.jobRole || "Business Analyst";
  const company = location.state?.company || "Generic";
  
  // Interview state
  const [currentQuestion, setCurrentQuestion] = useState("Tell me about yourself.");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions] = useState(2);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = () => {
    // Move to next question
    if (questionNumber < totalQuestions) {
      setQuestionNumber(prev => prev + 1);
      setCurrentQuestion("What are your strengths and weaknesses?");
    } else {
      // Interview completed
      alert("Interview completed!");
    }
  };

  const handleEndInterview = () => {
    if (confirm("Are you sure you want to end the interview?")) {
      navigate(-1);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">AI Interview</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Video Feed */}
        <div className="flex-1 p-6">
          <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
            {/* Video placeholder - replace with actual video element */}
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <div className="text-white text-center">
                <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Camera Feed</p>
                <p className="text-sm opacity-75">Your video will appear here</p>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <Button
                size="sm"
                className={`rounded-full w-10 h-10 ${
                  isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={() => setIsRecording(!isRecording)}
              >
                <Video className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                className="rounded-full w-10 h-10 bg-blue-600 hover:bg-blue-700"
              >
                <Mic className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Device Selection */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Camera Selection
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>FaceTime HD Camera</option>
                <option>USB Camera</option>
                <option>Built-in Camera</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Microphone Selection
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Built-in Microphone</option>
                <option>USB Microphone</option>
                <option>Headset Microphone</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Panel - Interview Details */}
        <div className="w-96 bg-white border-l p-6 flex flex-col">
          {/* Job Role Info */}
          <div className="bg-blue-600 text-white p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold">{jobRole}</h2>
            <p className="text-sm opacity-90">Company: {company}</p>
          </div>

          {/* Current Question */}
          <div className="bg-blue-600 text-white p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold">Q: {currentQuestion}</h3>
          </div>

          {/* Status */}
          <div className="mt-auto">
            <Badge className="bg-green-100 text-green-700 mb-4">
              {isRecording ? 'Recording' : 'Ready'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-t px-6 py-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {questionNumber}/{totalQuestions} Questions
        </div>
        <div className="text-lg font-mono text-gray-800">
          {formatTime(timeElapsed)}
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleAnswer}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            Answer
          </Button>
          <Button
            variant="destructive"
            onClick={handleEndInterview}
            className="px-6"
          >
            End
          </Button>
        </div>
      </div>
    </div>
  );
}
