import { ReportCard } from "./ReportCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, List } from "lucide-react";

function SectionHeader({
  title,
  sortLabel = "Sort by",
  defaultSort = "relevant",
  sortItems = [
    { value: "relevant", label: "Most relevant" },
    { value: "latest", label: "Latest" },
    { value: "score", label: "Score" },
  ],
}: {
  title: string;
  sortLabel?: string;
  defaultSort?: string;
  sortItems?: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
      <h3 className="text-base sm:text-lg md:text-xl font-semibold">{title}</h3>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {/* Sort */}
        <div className="flex items-center gap-2 text-sm w-full sm:w-auto">
          <span className="text-gray-500 whitespace-nowrap">{sortLabel}:</span>
          <Select defaultValue={defaultSort}>
            <SelectTrigger className="w-full sm:w-[160px] border-none focus:ring-0 shadow-none text-black font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortItems.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grid/List toggle (visual only for now) */}
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded bg-white hover:bg-gray-100">
            <LayoutGrid className="w-5 h-5" style={{ color: "#a9aeb8" }} />
          </button>
          <button className="p-2 rounded bg-blue-100">
            <List className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-blue-600 text-white rounded-xl p-6 shadow text-center sm:text-left">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Welcome, Pankaj</h2>
        <p className="text-sm sm:text-base mt-1">
          Based on your profile, we’ve curated a path just for you.
        </p>
      </div>

      {/* Practice Zone Reports */}
      <div className="border border-gray-200 rounded-lg p-4 bg-white">
        <SectionHeader title="Practice Zone Reports" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReportCard
            title="Business Analyst"
            companyLogo="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Capgemini_201x_logo.svg/512px-Capgemini_201x_logo.svg.png"
            date="28 Oct, 2024"
            score={76}
            scoreColor="text-green-600"
            tag="Virtual Reality"
          />
          <ReportCard
            title="Senior Developer"
            companyLogo="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png"
            date="24 Oct, 2024"
            score={54}
            scoreColor="text-yellow-500"
            tag="Virtual Reality"
          />
          <ReportCard
            title="Embedded Systems"
            companyLogo="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Tata_Consultancy_Services_old_logo.svg/512px-Tata_Consultancy_Services_old_logo.svg.png"
            date="25 Aug, 2024"
            score={88}
            scoreColor="text-green-600"
            tag="WEB"
          />
        </div>

        <div className="mt-6 text-center">
          <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto">
            Show All
          </Button>
        </div>
      </div>

      {/* Upskilling Zone Reports */}
      <div className="border border-gray-200 rounded-lg p-4 bg-[#1f2937]">
        <div className="text-white">
          <SectionHeader
            title="Upskilling Zone Reports"
            sortLabel="Sort by"
            defaultSort="skill"
            sortItems={[
              { value: "skill", label: "Skill type" },
              { value: "latest", label: "Latest" },
              { value: "score", label: "Score" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* These can still use ReportCard if it renders well on dark; otherwise, simple custom cards */}
          <div className="rounded-lg bg-white overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop"
              alt="Communication Skills"
              className="h-36 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-gray-900">Communication Skills</h4>
              <p className="text-xs text-gray-500 mt-1">Date of Session: 20 Oct, 2024</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-green-600 font-semibold">76%</span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                  Virtual Reality
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556761175-129418cb2dfe?q=80&w=1200&auto=format&fit=crop"
              alt="Communication Skills"
              className="h-36 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-gray-900">Communication Skills</h4>
              <p className="text-xs text-gray-500 mt-1">Date of Session: 05 Oct, 2024</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-yellow-500 font-semibold">56%</span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                  WEB
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop"
              alt="Problem Solving"
              className="h-36 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-gray-900">Problem Solving</h4>
              <p className="text-xs text-gray-500 mt-1">Date of Session: 24 Oct, 2024</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-green-600 font-semibold">67%</span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                  Virtual Reality
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto">
            Show All
          </Button>
        </div>
      </div>

      {/* Recommended Job Roles for You (Table) */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-4">
          Recommended Job Roles for You
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="p-3 text-left">No</th>
                <th className="p-3 text-left">Job Role</th>
                <th className="p-3 text-left">Domain</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">CTA</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                {
                  no: 1,
                  role: "Business Analyst",
                  domain: "Banking",
                  company: "Capgemini",
                  cta: "Start Simulation",
                },
                {
                  no: 2,
                  role: "Data Analyst",
                  domain: "Insurance",
                  company: "Tata AIG",
                  cta: "Upskill First",
                },
                {
                  no: 3,
                  role: "HR Executive",
                  domain: "Consulting",
                  company: "Deloitte",
                  cta: "Upskill First (Learn →)",
                },
              ].map((r) => (
                <tr key={r.no} className="hover:bg-gray-50">
                  <td className="p-3">{r.no}</td>
                  <td className="p-3 font-medium text-gray-900">{r.role}</td>
                  <td className="p-3">{r.domain}</td>
                  <td className="p-3">{r.company}</td>
                  <td className="p-3">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      {r.cta}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Your Learning Journey */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-4">
          Your Learning Journey
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-lg border overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop"
              alt="Communication Skills"
              className="h-36 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-gray-900">Communication Skills</h4>
              <p className="mt-1 text-xs text-gray-500">Last Updated: 20 Oct, 2024</p>
              <div className="mt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Upskilling</Button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-lg border overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop"
              alt="Problem Solving"
              className="h-36 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-gray-900">Problem Solving</h4>
              <p className="mt-1 text-xs text-gray-500">Last Updated: 05 Oct, 2024</p>
              <div className="mt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Start</Button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-lg border overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556761175-129418cb2dfe?q=80&w=1200&auto=format&fit=crop"
              alt="Resume Pitch"
              className="h-36 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-gray-900">Resume Pitch</h4>
              <p className="mt-1 text-xs text-gray-500">Last Updated: 12 Sep, 2024</p>
              <div className="mt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Review Feedback</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
