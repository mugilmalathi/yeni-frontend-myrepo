import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const jobs = [
  {
    id: 1,
    role: "Business Analyst",
    company: "Capgemini",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5yWK8fGUbyMpB8v6D6fNROfhSjJ_s8Nq1Hg&s",
    sector: "Banking & Financial Services",
  },
  {
    id: 2,
    role: "Senior Developer",
    company: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    sector: "IT",
  },
  {
    id: 3,
    role: "Data Analyst",
    company: "TATA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Tata_Consultancy_Services_old_logo.svg/2560px-Tata_Consultancy_Services_old_logo.svg.png",
    sector: "IT",
  },
]

export default function PracticeZone() {
  const navigate = useNavigate();

  const handleStartEvaluation = (jobId: number) => {
    navigate(`/evaluation/${jobId}`);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-blue-600 text-white rounded-xl p-6">
        <h2 className="text-2xl font-semibold">Practice Zone</h2>
        <p className="mt-2 text-sm sm:text-base">
          Curious how you'd perform in a real interview setting?  
          Start a simulation to experience what it's like — no pressure, just practice.
        </p>
      </div>

      {/* Recommended Jobs */}
      <h3 className="text-lg font-semibold">
        Based on your resume, here are the Recommended Jobs
      </h3>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="p-4 flex items-center justify-between">
            <CardContent className="p-0 flex items-center gap-4">
              {/* Left side */}
              <div>
                <h4 className="text-md font-semibold">{job.role}</h4>
                <img src={job.logo} alt={job.company} className="h-6 my-1" />
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  Sector: {job.sector}
                </span>
              </div>
            </CardContent>

            {/* Right side */}
            <Button 
              className="rounded-full px-6"
              onClick={() => handleStartEvaluation(job.id)}
            >
              Start Evaluation
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
