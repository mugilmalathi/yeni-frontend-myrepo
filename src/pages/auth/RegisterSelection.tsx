import { useNavigate } from "react-router-dom";

export default function RegisterSelection() {
  const navigate = useNavigate();

  const handleStudentRegister = () => navigate("/register/student");
  const handleCollegeRegister = () => navigate("/register/college");

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      {/* Full-viewport background */}
      <div
        className="fixed inset-0 -z-10 w-screen h-screen bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1')",
        }}
      ></div>

      {/* Dark overlay */}
      <div className="fixed inset-0 -z-10 bg-black/45"></div>

      {/* Header */}
      <header className="relative z-20 bg-white/95 backdrop-blur shadow flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 w-full">
        <div className="flex items-center gap-2">
          <div className="font-bold text-lg sm:text-xl text-black">
            <span className="text-red-600">YENI</span> Ai
          </div>
        </div>
        <nav className="hidden md:flex gap-4 lg:gap-6 text-gray-700 font-medium text-sm lg:text-base">
          <a href="#" className="hover:text-red-500">Home</a>
          <a href="#" className="hover:text-red-500">About Us</a>
          <a href="#" className="hover:text-red-500">Our Programs</a>
          <a href="#" className="hover:text-red-500">Blogs</a>
          <a href="#" className="hover:text-red-500">Contact Us</a>
        </nav>
        <button className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-red-600 text-sm lg:text-base">
          Enquire Today
        </button>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-72px)] px-4 py-6 sm:py-10">
        <div className="w-full max-w-4xl backdrop-blur rounded-2xl p-6 sm:p-8 lg:p-12">
          {/* Login heading */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-3">
              Login
            </h1>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Students/Job Seeker */}
            <button
              onClick={handleStudentRegister}
              className="text-left bg-white hover:shadow-xl transition-shadow rounded-xl p-4 sm:p-5 group"
            >
              <img
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1"
                alt="Students networking"
                className="w-full h-32 sm:h-36 lg:h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
              />
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                Students/ Job Seeker
              </h3>
            </button>

            {/* College/Institute/University */}
            <button
              onClick={handleCollegeRegister}
              className="text-left bg-white hover:shadow-xl transition-shadow rounded-xl p-4 sm:p-5 group"
            >
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1"
                alt="College meeting"
                className="w-full h-32 sm:h-36 lg:h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
              />
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                College/ Institute/ University
              </h3>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}