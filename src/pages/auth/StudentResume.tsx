import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Plus } from "lucide-react";

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

  const handleUploadFiles = async () => {
    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Complete registration
    const step1Data = JSON.parse(localStorage.getItem('studentRegistrationStep1') || '{}');
    const step2Data = JSON.parse(localStorage.getItem('studentRegistrationStep2') || '{}');
    
    const completeRegistration = {
      ...step1Data,
      ...step2Data,
      files: uploadedFiles.map(f => f.name),
      registrationType: 'student',
      registrationDate: new Date().toISOString()
    };

    localStorage.setItem('userRegistration', JSON.stringify(completeRegistration));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', 'student');
    
    setIsUploading(false);
    navigate('/register/student/personalisation');
  };

  const handleCreateResume = () => {
    // For now, just proceed without files
    navigate('/register/student/personalisation');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow flex items-center justify-between px-16 py-4 z-10 w-full">
        <div className="flex items-center gap-2">
          <div className="font-bold text-xl text-black">
            <span className="text-red-600">YENI</span> Ai
          </div>
        </div>
        <nav className="flex gap-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-red-500">Home</a>
          <a href="#" className="hover:text-red-500">About Us</a>
          <a href="#" className="hover:text-red-500">Our Programs</a>
          <a href="#" className="hover:text-red-500">Blogs</a>
          <a href="#" className="hover:text-red-500">Contact Us</a>
        </nav>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Enquire Today
        </button>
      </header>

      {/* Background */}
      <div className="flex-1 flex">
        {/* Left side - Woman image */}
        <div className="hidden md:block md:w-1/3">
          <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
              alt="Professional woman"
              className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Resume upload */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="flex gap-8 mx-8">
            {/* Upload Section */}
            <div className="bg-white rounded-lg p-8 w-96">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Resume Upload</h2>

              {/* Upload Area */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-2">Upload</p>
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
                        <span className="text-gray-700">{file.name}</span>
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                {isUploading ? "Uploading..." : "UPLOAD FILES"}
              </Button>
            </div>

            {/* Resume Builder Section */}
            <div className="bg-white rounded-lg p-6 w-80">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-blue-600 font-medium">4 Mins</p>
                  <h3 className="text-lg font-bold text-gray-800">Resume Builder</h3>
                  <p className="text-sm text-gray-600">
                    Create a Professional resume in minutes and get instant, personalised tips to make it even better.
                  </p>
                </div>
                <Button 
                  onClick={handleCreateResume}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
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