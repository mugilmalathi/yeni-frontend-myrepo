// src/pages/upskillingExperience/UpskillingAI.tsx
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Video, ChevronLeft } from "lucide-react";

const TITLES: Record<string, string> = {
  communication: "Communication Skills",
};

export default function UpskillingAI() {
  const navigate = useNavigate();
  const { skillId = "communication" } = useParams();
  const title = TITLES[skillId] ?? TITLES.communication;

  return (
    <div className="space-y-4 relative">
      {/* Top bar */}
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

      {/* Main two-column layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr,360px]">
        {/* Left: camera preview */}
        <div>
          <div className="relative overflow-hidden rounded-md border bg-black">
            {/* Replace this IMG with <video> + getUserMedia when you integrate devices */}
            <img
              className="w-full object-cover"
              style={{ aspectRatio: "16/9" }}
              src="https://images.unsplash.com/photo-1612152607435-8cd5665973d8?q=80&w=1600&auto=format&fit=crop"
              alt="camera preview"
            />

            {/* Floating camera/mic buttons */}
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

        {/* Right: blue title + Start */}
        <div className="space-y-4">
          <div className="rounded-md bg-blue-600 p-4 text-white">
            <div className="text-base font-semibold">{title}</div>
          </div>

          <Button
            className="rounded-full bg-blue-600 px-6 py-6 text-white hover:bg-blue-700"
            onClick={() => {
              // hook your start logic here
            }}
          >
            Start
          </Button>
        </div>
      </div>

      {/* Bottom-right time widget */}
      <div className="fixed right-4 bottom-4 rounded-md border bg-white p-2 text-xs text-gray-700 shadow">
        <div className="font-semibold">7 Mins</div>
        <div className="text-gray-500">Available Time</div>
      </div>
    </div>
  );
}
