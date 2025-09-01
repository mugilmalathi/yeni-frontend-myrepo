import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("practice");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [sortBy, setSortBy] = useState("Most relevant");

  const reports = [
    {
      id: 1,
      role: "Business Analyst",
      company: "Capgemini",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5yWK8fGUbyMpB8v6D6fNROfhSjJ_s8Nq1Hg&s",
      date: "28 Oct, 2024",
      score: 76,
      platform: "Virtual Reality",
    },
    {
      id: 2,
      role: "Senior Developer",
      company: "Google",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC1nKfkC7nX7r_uZD1Jzx0_ks6hd0ShK5ZFw&s",
      date: "24 Oct, 2024",
      score: 54,
      platform: "Virtual Reality",
    },
    {
      id: 3,
      role: "Embedded Systems",
      company: "TCS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Tata_Consultancy_Services_old_logo.svg/2560px-Tata_Consultancy_Services_old_logo.svg.png",
      date: "25 Aug, 2024",
      score: 88,
      platform: "WEB",
    },
  ];

  const platforms = ["All", "WEB", "VR"];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <h1 className="text-2xl font-bold">Report</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          className={`flex-1 rounded-md ${
            activeTab === "practice" ? "bg-blue-600 text-white" : "bg-gray-400"
          }`}
          onClick={() => setActiveTab("practice")}
        >
          Practice Zone Reports
        </Button>
        <Button
          className={`flex-1 rounded-md ${
            activeTab === "upskilling" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("upskilling")}
        >
          Upskilling Zone Reports
        </Button>
      </div>

      {/* Filters + Sort */}
      <div className="flex items-center justify-between bg-white shadow rounded-md p-4">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Platform</span>
          {platforms.map((p) => (
            <label key={p} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedPlatform === p}
                onChange={() => setSelectedPlatform(p)}
              />
              {p}
            </label>
          ))}
        </div>

       <div className="flex items-center gap-4">
  <span>Sort by:</span>
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="border rounded-md p-1 bg-white"
  >
    <option>Most relevant</option>
    <option>Latest</option>
    <option>Highest Score</option>
  </select>

  {/* View toggle icons */}
  <div className="flex gap-2">
    <button className="p-2 border rounded bg-white hover:bg-gray-100">🔲</button>
    <button className="p-2 border rounded bg-white hover:bg-gray-100">📃</button>
  </div>
</div>

      </div>

      {/* Reports List */}
      <div className="grid grid-cols-3 gap-4">
        {reports.map((r) => (
          <div
            key={r.id}
            className="p-4 bg-white border rounded-md shadow-sm hover:shadow-md transition"
          >
            {/* Role */}
            <h3 className="text-blue-600 font-semibold text-lg">{r.role}</h3>

            {/* Company */}
            <div className="flex items-center gap-2 mt-1">
              <img src={r.logo} alt={r.company} className="h-6" />
            </div>

            {/* Date */}
            <p className="text-sm text-gray-500 mt-2">{r.date}</p>

            {/* Divider */}
            <hr className="my-2" />

            {/* Score + Platform */}
            <div className="flex items-center justify-between">
              <p className="text-sm">
                Overall Score{" "}
                <span
                  className={`font-bold ${
                    r.score >= 75
                      ? "text-green-600"
                      : r.score >= 50
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {r.score}%
                </span>
              </p>
              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                {r.platform}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
