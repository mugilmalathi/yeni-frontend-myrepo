import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, Video, ChevronLeft } from "lucide-react";

type JobMeta = {
  title: string;
  domain: string;
  company: string;
};

const JOBS: Record<string, JobMeta> = {
  "1": { title: "Business Analyst", domain: "Banking Domain", company: "Capgemini" },
  "2": { title: "Senior Developer", domain: "Software", company: "Google" },
  "3": { title: "Data Analyst", domain: "Analytics", company: "TCS" },
};

export default function AIInterface() {
  const navigate = useNavigate();
  const { jobId = "1" } = useParams();
  const meta = JOBS[jobId] ?? JOBS["1"];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-white hover:bg-red-700"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </button>
          <h1 className="text-xl sm:text-2xl font-semibold">AI Interface</h1>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr,380px]">
        {/* Left: video preview + controls */}
        <div>
          <div className="relative overflow-hidden rounded-md border bg-black">
            {/* Placeholder video frame (replace with actual <video> when ready) */}
            <img
              className="w-full object-cover"
              style={{ aspectRatio: "16/9" }}
              src="https://images.unsplash.com/photo-1604882737209-30af260c5aae?q=80&w=1600&auto=format&fit=crop"
              alt="camera preview"
            />

            {/* Floating action buttons */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow">
                <Video className="h-5 w-5" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow">
                <Mic className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Device selectors */}
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <select className="w-full rounded-md border px-3 py-2 text-sm">
              <option>Camera Selection</option>
              <option>FaceTime HD Camera</option>
              <option>USB Camera</option>
            </select>
            <select className="w-full rounded-md border px-3 py-2 text-sm">
              <option>Microphone Selection</option>
              <option>Built-in Mic</option>
              <option>USB Mic</option>
              <option>Headset Mic</option>
            </select>
          </div>
        </div>

        {/* Right: details + Start */}
        <div className="space-y-4">
          <div className="rounded-md bg-blue-600 p-4 text-white">
            <div className="text-base font-semibold">
              {meta.title} – {meta.domain}
            </div>
            <div className="mt-1 text-xs">
              Company: <span className="font-medium">{meta.company}</span>
            </div>
          </div>

          <div className="pt-2">
            <Button
              className="rounded-full bg-blue-600 px-6 py-6 text-white hover:bg-blue-700"
              onClick={() => {
                // hook up your actual start logic here
                // for now we can keep users on this page
              }}
            >
              Start
            </Button>
          </div>

          <div>
            <Badge className="bg-blue-100 text-blue-700">Ready</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
