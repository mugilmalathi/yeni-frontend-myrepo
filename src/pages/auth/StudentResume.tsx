import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Plus } from "lucide-react";
import HttpClient from "@/utils/httpClient";
import { API_BASE_URL } from "@/utils/constants";
import { cookieStore, REGISTRATION_ID_KEY } from "@/lib/utils";

export default function StudentResume() {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (uploadedFiles.length + files.length <= 5) {
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (uploadedFiles.length + files.length <= 5) {
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const http = new HttpClient({ baseURL: API_BASE_URL });

  const handleUploadFiles = async () => {
    const registrationId = cookieStore.get(REGISTRATION_ID_KEY);
    if (!registrationId) {
      alert("Missing registration ID. Please restart registration.");
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      uploadedFiles.forEach((f) => formData.append('files', f));
      await http.post(`/students/register/${registrationId}/resume/files`, formData);
      navigate('/register/student/personalisation');
    } catch (e: any) {
      alert(e?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateResume = () => {
    // Navigate to resume builder
    navigate('/resume-builder');
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <header className="bg-white shadow flex items-center justify-between px-3 sm:px-6 md:px-8 lg:px-16 py-3 sm:py-4 z-10 w-full flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="font-bold text-base sm:text-lg md:text-xl text-black">
            <span className="text-red-600">YENI</span> Ai
          </div>
        </div>
        <nav className="hidden sm:flex gap-2 md:gap-4 lg:gap-8 text-gray-700 font-medium text-xs sm:text-sm md:text-base">
          <a href="#" className="hover:text-red-500">Home</a>
          <a href="#" className="hover:text-red-500">About Us</a>
          <a href="#" className="hover:text-red-500">Our Programs</a>
          <a href="#" className="hover:text-red-500">Blogs</a>
          <a href="#" className="hover:text-red-500">Contact Us</a>
        </nav>
        <button className="bg-red-500 text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded hover:bg-red-600 text-xs sm:text-sm md:text-base">
          Enquire Today
        </button>
      </header>

      {/* Background - Fixed height with proper scrolling */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left side - Woman image - 50% - Fixed, no scroll */}
        <div className="w-1/2 hidden lg:block">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
            alt="Professional woman"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Resume upload - 50% - Scrollable */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-3 sm:p-4 md:p-6 overflow-y-auto">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 w-full max-w-2xl sm:max-w-4xl lg:max-w-6xl">
            {/* Upload Section */}
            <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 w-full lg:w-96 mx-auto lg:mx-0">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center mb-4 sm:mb-6 md:mb-8">Resume Upload</h2>

              {/* Upload Area */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center mb-6"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-medium text-gray-700 mb-2">Upload</p>
                    <p className="text-sm text-gray-500 mb-2">
                      Drag & drop files or{" "}
                      <label className="text-blue-600 underline cursor-pointer">
                        Browse
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </p>
                    <p className="text-xs text-gray-400">
                      Supported formats: PDF, DOC, DOCX
                    </p>
                  </div>
                </div>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Uploading - {uploadedFiles.length}/5 files
                  </p>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700 truncate">{file.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <Button 
                onClick={handleUploadFiles}
                disabled={uploadedFiles.length === 0 || isUploading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3"
              >
                {isUploading ? "Uploading..." : "UPLOAD FILES"}
              </Button>
            </div>

            {/* Resume Builder Section */}
            <div className="bg-white rounded-lg p-6 w-full lg:w-80 mx-auto lg:mx-0">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-blue-600 font-medium">4 Mins</p>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800">Resume Builder</h3>
                  <p className="text-sm text-gray-600">
                    Create a Professional resume in minutes and get instant, personalised tips to make it even better.
                  </p>
                </div>
                <Button 
                  onClick={handleCreateResume}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3"
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}