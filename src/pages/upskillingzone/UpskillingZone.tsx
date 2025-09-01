import { Button } from "@/components/ui/button";

export default function Upskilling() {
  const skills = [
    {
      id: 1,
      title: "Domain Knowledge",
      desc: "Learn key terms and workflows from different sectors (e.g., BFSI, Consulting, IT).",
      img: "https://images.stockcake.com/public/8/d/4/8d46f9f6-9e60-44c8-83b7-fa199a51e409_large/team-meeting-discussion-stockcake.jpg",
    },
    {
      id: 2,
      title: "Communication Skills",
      desc: "Focus on structuring answers, clarity, and articulation.",
      img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    },
    {
      id: 3,
      title: "Voice & Body Language",
      desc: "Practice with real-time voice feedback, posture coaching, and tone improvement.",
      img: "https://cdn.prod.website-files.com/62196607bf1b46c300301846/6568adf6daf5cb0b75e26010_oluwqjrglg6rnq5yoaix.webp",
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Banner */}
      <div className="bg-blue-600 text-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold">Yeni AI Upskilling Hub</h2>
        <p className="text-sm mt-2">
          Welcome to the Upskilling Hub. Choose a skill to master or continue
          where you left off
        </p>
      </div>

      {/* Skills list */}
      <div className="flex flex-col gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center gap-6 p-4 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            {/* Image */}
            <img
              src={skill.img}
              alt={skill.title}
              className="w-40 h-24 object-cover rounded-lg"
            />

            {/* Text */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{skill.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{skill.desc}</p>
            </div>

            {/* Button */}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5">
              Start Experience
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
