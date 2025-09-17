import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";

const faqs = [
  {
    q: "What is Yeni AI?",
    a: "Yeni AI is a next-generation placement and upskilling platform that uses AI-powered avatars to simulate interviews and help students improve communication and professional skills.",
  },
  {
    q: "Who can use Yeni AI?",
    a: "Students, College Administrators, and Corporate Recruiters can use the platform for different purposes including learning, tracking, and hiring.",
  },
  {
    q: "Can I use the platform on mobile or desktop?",
    a: "Yeni AI’s immersive experience is optimized for VR. The web portal supports resume upload, account creation, and analytics tracking.",
  },
  {
    q: "My VR headset isn’t loading Yeni AI. What should I do?",
    a: "Ensure internet connection is stable. Restart the headset. If the issue persists, contact our support team using the form below.",
  },
];

export default function HelpCenter() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Help Center</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px,1fr]">
        {/* Left rail */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold text-gray-800">FAQs</h3>

            <div className="mt-6 rounded-lg bg-blue-600/10 p-5">
              <p className="text-white/90 font-medium bg-blue-600 rounded-md p-3">
                Didn’t find what you were looking for?
              </p>
              <p className="mt-3 text-sm text-gray-700">
                Contact our customer service
              </p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Contact Us</Button>
            </div>
          </CardContent>
        </Card>

        {/* Right list */}
        <div className="space-y-4">
          {faqs.map((f) => (
            <Card key={f.q} className="border shadow-sm">
              <CardContent className="flex items-start justify-between gap-4 p-5">
                <div>
                  <h4 className="font-semibold text-gray-900">{f.q}</h4>
                  <p className="mt-2 text-sm text-gray-600">{f.a}</p>
                </div>
                <button className="h-9 w-9 rounded-md hover:bg-gray-100">
                  <EllipsisVertical className="mx-auto h-5 w-5 text-gray-500" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
