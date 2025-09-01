import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ReportCardProps {
  title: string;
  companyLogo: string;
  date: string;
  score: number;
  scoreColor: string;
  tag: string;
}

export function ReportCard({
  title,
  companyLogo,
  date,
  score,
  scoreColor,
  tag,
}: ReportCardProps) {
  return (
    <Card className="shadow-md rounded-xl border bg-white w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          {/* Title */}
          <h4 className="text-blue-600 font-semibold text-base sm:text-lg md:text-xl truncate">
            {title}
          </h4>

          {/* Logo (scales down on mobile) */}
          <div className="h-10 w-20 sm:h-12 sm:w-24 md:h-14 md:w-28 flex items-center justify-center mx-auto">
            <img
              src={companyLogo}
              alt={title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Date */}
          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            {date}
          </p>

          <Separator />

          {/* Score heading */}
          <p className="text-sm sm:text-base">Overall Score</p>

          {/* Score + Tag in row */}
          <div className="flex items-center justify-between">
            <p
              className={`text-xl sm:text-2xl md:text-3xl font-bold ${scoreColor}`}
            >
              {score}%
            </p>
            <Badge
              className="mt-1 text-xs sm:text-sm"
              style={{ backgroundColor: "#8cb9f0", color: "#003c86" }}
            >
              {tag}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
