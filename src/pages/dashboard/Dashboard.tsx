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

export default function Dashboard() {
  return (
    <div>
      {/* ✅ Welcome Banner */}
      <div className="bg-blue-600 text-white rounded-xl p-6 mb-6 shadow text-center sm:text-left">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
          Welcome, Pankaj
        </h2>
        <p className="text-sm sm:text-base mt-1">
          Based on your profile, we've curated a path just for you.
        </p>
      </div>

      {/* ✅ Reports Section */}
      <div className="border border-gray-300 rounded-lg p-4">
        {/* Header with controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold">
            Practice Zone Reports
          </h3>

          {/* Right-side controls */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-sm w-full sm:w-auto">
              <span className="text-gray-500 whitespace-nowrap">Sort by:</span>
              <Select defaultValue="relevant">
                <SelectTrigger className="w-full sm:w-[140px] border-none focus:ring-0 shadow-none text-black font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevant">Most relevant</SelectItem>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="score">Score</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grid/List Toggle Icons */}
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

        {/* ✅ Report Cards (Responsive grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReportCard
            title="Business Analyst"
            companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5yWK8fGUbyMpB8v6D6fNROfhSjJ_s8Nq1Hg&s"
            date="28 Oct, 2024"
            score={76}
            scoreColor="text-green-600"
            tag="Global Reality"
          />
          <ReportCard
            title="Senior Developer"
            companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC1nKfkC7nX7r_uZD1Jzx0_ks6hd0ShK5ZFw&s"
            date="24 Oct, 2024"
            score={54}
            scoreColor="text-yellow-500"
            tag="Virtual Reality"
          />
          <ReportCard
            title="Embedded Systems"
            companyLogo="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Tata_Consultancy_Services_old_logo.svg/2560px-Tata_Consultancy_Services_old_logo.svg.png"
            date="25 Aug, 2024"
            score={88}
            scoreColor="text-green-600"
            tag="WEB"
          />
        </div>

        {/* ✅ Show All Button */}
        <div className="mt-6 text-center">
          <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto">
            Show All
          </Button>
        </div>
      </div>
    </div>
  );
}
