import { useNavigate } from "react-router-dom";

export default function RegisterSelection() {
  const navigate = useNavigate();

  const handleStudentRegister = () => navigate("/register/student");
  const handleCollegeRegister = () => navigate("/register/college");

  return (
      <div className="relative min-h-screen w-screen overflow-x-hidden">
        {/* Full-viewport background (no white gap) */}
        <div
            className="fixed inset-0 -z-10 w-screen h-screen bg-center bg-cover bg-no-repeat register-bg-image"
            style={{
              backgroundImage:
                  "url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1')",
            }}
        ></div>

        {/* Optional dark overlay */}
        <div className="fixed inset-0 -z-10 bg-black/45"></div>

        {/* Header */}
        <header className="relative z-20 bg-white/95 backdrop-blur shadow flex items-center justify-between px-6 md:px-16 py-4 w-full">
          <div className="flex items-center gap-2">
            <div className="font-bold text-xl text-black">
              <span className="text-red-600">YENI</span> Ai
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
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

        {/* Main content */}
        <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-72px)] px-4 py-10">
          <div className="w-full max-w-3xl rounded-2xl  backdrop-blur p-8 md:p-12">


            {/* Register heading */}

            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-3">
                Register
              </h1>
              <p className="text-base md:text-lg text-white mb-10">
                Let's Set You Up. Who Are You?
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Students/Job Seeker */}
              <button
                  onClick={handleStudentRegister}
                  className="text-left bg-white hover:shadow-xl transition-shadow rounded-xl p-5"
              >
                <img
                    src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1"
                    alt="Students networking"
                    className="w-full h-36 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  Students/ Job Seeker
                </h3>
              </button>

              {/* College/Institute/University */}
              <button
                  onClick={handleCollegeRegister}
                  className="text-left bg-white hover:shadow-xl transition-shadow rounded-xl p-5"
              >
                <img
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1"
                    alt="College meeting"
                    className="w-full h-36 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  College/ Institute/ University
                </h3>
              </button>
            </div>
          </div>
        </main>
      </div>
  );
}
