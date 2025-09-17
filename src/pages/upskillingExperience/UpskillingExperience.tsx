// src/pages/upskillingExperience/UpskillingExperience.tsx
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SkillMeta = {
  title: string;
  intro: string;
  objective: string;
};

const SKILLS: Record<string, SkillMeta> = {
  communication: {
    title: "Communication Skills",
    intro:
      "Learn how to speak with clarity, confidence, and structure. Improve your verbal responses with techniques like the STAR method, idea framing, active listening, and non-verbal communication cues.",
    objective:
      "Help you articulate thoughts effectively in interviews, group discussions, and workplace conversations.",
  },
};

export default function UpskillingExperience() {
  const { skillId = "communication" } = useParams();
  const navigate = useNavigate();
  const meta = SKILLS[skillId] ?? SKILLS.communication;

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="border rounded-xl">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-700">
            {meta.title}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-gray-700">{meta.intro}</p>

          <hr className="my-6 border-gray-300" />

          <p className="font-semibold text-gray-800">Objective:</p>
          <p className="mt-1 text-sm sm:text-base text-gray-700">{meta.objective}</p>

          <div className="mt-6">
            <Button
              className="rounded-full bg-blue-600 px-6 py-6 text-white hover:bg-blue-700"
              onClick={() => navigate(`/upskilling-experience/${skillId}/ai`)}
            >
              Begin Module
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
