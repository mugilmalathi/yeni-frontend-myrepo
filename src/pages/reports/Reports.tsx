import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Grid, List } from "lucide-react";

type PracticeReport = {
  id: number;
  role: string;
  company: string;
  logo: string;
  date: string; // display string
  score: number; // 0-100
  platform: "WEB" | "VR";
};

type UpskillingReport = {
  id: number;
  title: string;
  img: string;
  date: string;
  score: number;
  platform: "WEB" | "VR";
};

const PRACTICE: PracticeReport[] = [
  {
    id: 1,
    role: "Business Analyst",
    company: "Capgemini",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Capgemini_201x_logo.svg/512px-Capgemini_201x_logo.svg.png",
    date: "28 Oct, 2024",
    score: 76,
    platform: "VR",
  },
  {
    id: 2,
    role: "Senior Developer",
    company: "Google",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png",
    date: "24 Oct, 2024",
    score: 54,
    platform: "VR",
  },
  {
    id: 3,
    role: "Embedded Systems",
    company: "TCS",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Tata_Consultancy_Services_old_logo.svg/512px-Tata_Consultancy_Services_old_logo.svg.png",
    date: "25 Aug, 2024",
    score: 88,
    platform: "WEB",
  },
  {
    id: 4,
    role: "System Design",
    company: "Deloitte",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/5/5a/Deloitte_logo.png",
    date: "12 Aug, 2024",
    score: 73,
    platform: "VR",
  },
  {
    id: 5,
    role: "System Design",
    company: "Swiggy",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/1/12/Swiggy_logo.svg",
    date: "04 Aug, 2024",
    score: 61,
    platform: "WEB",
  },
  {
    id: 6,
    role: "Embedded Systems",
    company: "Snapdeal",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/2/2a/Snapdeal_new_logo.png",
    date: "29 Jul, 2024",
    score: 67,
    platform: "VR",
  },
];

const UPSKILLING: UpskillingReport[] = [
  {
    id: 101,
    title: "Communication Skills",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    date: "28 Oct, 2024",
    score: 76,
    platform: "VR",
  },
  {
    id: 102,
    title: "Communication Skills",
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
    date: "24 Oct, 2024",
    score: 56,
    platform: "WEB",
  },
  {
    id: 103,
    title: "Problem Solving",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    date: "24 Oct, 2024",
    score: 67,
    platform: "VR",
  },
];

function scoreColor(n: number) {
  if (n >= 75) return "text-green-600";
  if (n >= 50) return "text-amber-600";
  return "text-red-600";
}

export default function Reports() {
  const [activeTab, setActiveTab] = useState<"practice" | "upskilling">(
    "practice"
  );

  // filters
  const [all, setAll] = useState(true);
  const [web, setWeb] = useState(true);
  const [vr, setVr] = useState(true);

  // sorting
  const [sortBy, setSortBy] = useState<"Most relevant" | "Latest" | "Highest Score">(
    "Most relevant"
  );

  // compute list based on tab + filters + sort
  const practiceList = useMemo(() => {
    let list = PRACTICE.filter((r) =>
      all ? true : (r.platform === "WEB" && web) || (r.platform === "VR" && vr)
    );
    if (!all && !web && !vr) list = []; // none selected
    if (sortBy === "Latest") {
      // naive: most recent first by index order; your real data should sort by ISO date
      list = [...list];
    } else if (sortBy === "Highest Score") {
      list = [...list].sort((a, b) => b.score - a.score);
    }
    return list;
  }, [all, web, vr, sortBy]);

  const upskillingList = useMemo(() => {
    let list = UPSKILLING.filter((r) =>
      all ? true : (r.platform === "WEB" && web) || (r.platform === "VR" && vr)
    );
    if (!all && !web && !vr) list = [];
    if (sortBy === "Highest Score") list = [...list].sort((a, b) => b.score - a.score);
    return list;
  }, [all, web, vr, sortBy]);

  const currentCount = activeTab === "practice" ? practiceList.length : upskillingList.length;

  const setAllChecked = (val: boolean) => {
    setAll(val);
    setWeb(val);
    setVr(val);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-2xl font-bold">Report</h1>

      {/* Segmented tabs */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("practice")}
          className={`flex-1 rounded-md px-4 py-2 font-medium ${
            activeTab === "practice"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Practice Zone Reports
        </button>
        <button
          onClick={() => setActiveTab("upskilling")}
          className={`flex-1 rounded-md px-4 py-2 font-medium ${
            activeTab === "upskilling"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Upskilling Zone Reports
        </button>
      </div>

      {/* Section header row */}
      <div className="rounded-md border bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left: title + platform filter */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              {activeTab === "practice"
                ? "Practice Zone Reports"
                : "Upskilling Zone Reports"}
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="font-medium">Platform</span>

              {/* All */}
              <label className="inline-flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={all}
                  onChange={(e) => setAllChecked(e.target.checked)}
                  className="h-4 w-4 accent-blue-600"
                />
                All
              </label>

              {/* WEB */}
              <label className="inline-flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={web}
                  onChange={(e) => {
                    const v = e.target.checked;
                    setWeb(v);
                    if (!v && !vr) setAll(false);
                  }}
                  className="h-4 w-4 accent-blue-600"
                />
                WEB
              </label>

              {/* VR */}
              <label className="inline-flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={vr}
                  onChange={(e) => {
                    const v = e.target.checked;
                    setVr(v);
                    if (!v && !web) setAll(false);
                  }}
                  className="h-4 w-4 accent-blue-600"
                />
                VR
              </label>
            </div>
          </div>

          {/* Right: sort + icons + count */}
          <div className="flex items-center gap-4">
            <div className="hidden text-sm text-gray-500 md:block">
              Showing {currentCount} results
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as typeof sortBy)
                  }
                  className="rounded-md border bg-white px-3 py-1.5 pr-8 text-sm"
                >
                  <option>Most relevant</option>
                  <option>Latest</option>
                  <option>Highest Score</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="flex gap-2">
              <button className="rounded border bg-white p-2 hover:bg-gray-100">
                <Grid className="h-4 w-4 text-gray-600" />
              </button>
              <button className="rounded border bg-white p-2 hover:bg-gray-100">
                <List className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* mobile count */}
        <div className="mt-2 text-sm text-gray-500 md:hidden">
          Showing {currentCount} results
        </div>
      </div>

      {/* CARDS */}
      {activeTab === "practice" ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {practiceList.map((r) => (
            <div
              key={r.id}
              className="rounded-lg border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              {/* Title */}
              <h4 className="text-lg font-semibold text-blue-700">
                {r.role}
              </h4>

              {/* Logo */}
              <div className="mt-3 flex items-center gap-2">
                <img src={r.logo} alt={r.company} className="h-6 w-auto" />
              </div>

              {/* Date */}
              <p className="mt-4 text-sm text-gray-500">{r.date}</p>

              <hr className="my-3" />

              {/* Score + Platform */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Overall Score</p>
                  <div className={`mt-1 text-2xl font-bold ${scoreColor(r.score)}`}>
                    {r.score}%
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    r.platform === "VR"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {r.platform === "VR" ? "Virtual Reality" : "WEB"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {upskillingList.map((r) => (
            <div
              key={r.id}
              className="overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md"
            >
              <img
                src={r.img}
                alt={r.title}
                className="h-44 w-full object-cover"
              />

              <div className="p-5">
                <h4 className="text-lg font-semibold text-blue-700">
                  {r.title}
                </h4>
                <p className="mt-2 text-sm text-gray-500">
                  Date of Session: {r.date}
                </p>

                <hr className="my-3" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Overall Score</p>
                    <div className={`mt-1 text-2xl font-bold ${scoreColor(r.score)}`}>
                      {r.score}%
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      r.platform === "VR"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {r.platform === "VR" ? "Virtual Reality" : "WEB"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
