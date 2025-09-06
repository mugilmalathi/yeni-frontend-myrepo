import React from "react";
import { useNavigate } from "react-router-dom";
import background from '../../img/background.png';
import ai from '../../img/ai.png';
import ailogo from '../../img/yeniai.png';


const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
  <div className="w-screen h-screen flex flex-col relative overflow-hidden z-10">
      {/* Header */}
  <header className="bg-white shadow flex items-center justify-between px-16 py-4 z-10 w-full">
        <div className="flex items-center gap-2">
          <img src={ailogo} alt="YENI Ai Logo" className="h-10 w-auto" />
        </div>
        <nav className="flex gap-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-red-500">Home</a>
          <a href="#" className="hover:text-red-500">About Us</a>
          <a href="#" className="hover:text-red-500">Our Programs</a>
          <a href="#" className="hover:text-red-500">Contact</a>
        </nav>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Enquire Today</button>
      </header>

      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src={background}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50 pointer-events-none" />
      </div>
      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-16 py-12 z-10 w-full h-full">
        <div className="flex flex-col md:flex-row items-center gap-16 w-full max-w-6xl h-full">
          {/* Left Section: Text */}
          <div className="flex-1 min-w-[320px] max-w-xl">
            <h1 className="text-5xl font-bold text-white mb-4">AI Powered Learning:</h1>
            <h2 className="text-4xl font-bold text-red-500 mb-2">Personalised Scalable Future Ready</h2>
            <div className="w-64 h-2 bg-red-500 mb-6" />
            <p className="text-lg text-white mb-8 max-w-lg">
              Empowering students, educators, and professionals with AI-driven skill development and industry-aligned education
            </p>
            <div className="flex gap-6">
              <button 
                onClick={handleRegisterClick}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition text-lg shadow"
              >
                Register Now
              </button>
              <button 
                onClick={handleLoginClick}
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold border border-gray-300 hover:bg-gray-100 transition text-lg shadow"
              >
                Login
              </button>
            </div>
          </div>
          {/* Right Section: AI Image */}
          <div className="flex-1 flex items-end justify-center h-full">
            <img
              src={ai}
              alt="AI Powered Learning"
              className="w-[22rem] h-[32rem] object-contain drop-shadow-2xl"
              style={{ zIndex: 1 }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
