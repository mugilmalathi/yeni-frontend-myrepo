import { useNavigate } from "react-router-dom";

export default function PersonalisationPage() {
    const navigate = useNavigate();

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
                <div className="hidden md:block md:w-1/2">
                    <img
                        src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                        alt="Professional woman"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Content */}
                <div className="flex w-full md:w-1/2 items-center justify-center bg-[#0b2b50] text-white p-8">
                    <div className="max-w-lg text-center">
                        <div className="mb-6 flex justify-center">
                            {/* Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold mb-4 text-blue-400">
                            Personalising Your Journey
                        </h1>
                        <p className="mb-6 text-lg">
                            Based on the details provided above, our AI model will create a
                            personalised dashboard for you.
                        </p>
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                        >
                            Open Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
