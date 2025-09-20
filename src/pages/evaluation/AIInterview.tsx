import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function AIInterview() {
  const navigate = useNavigate();
  const location = useLocation();

  // Role info
  const jobRole = location.state?.jobRole || "Business Analyst – Banking Domain";
  const company = location.state?.company || "Generic";

  // States
  const [allQuestions, setAllQuestions] = useState<string[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const camStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<BlobPart[]>([]);
  const recognition = useRef<SpeechRecognition | null>(null);

  // Stop camera + mic completely
  const stopMedia = () => {
    if (camStream.current) {
      camStream.current.getTracks().forEach(track => track.stop());
      camStream.current = null;
    }
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      mediaRecorder.current = null;
    }
    recordedChunks.current = [];
  };

  // Timer
  useEffect(() => {
    const t = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Start camera + load questions
  useEffect(() => {
    (async () => {
      try {
        camStream.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) videoRef.current.srcObject = camStream.current;

        mediaRecorder.current = new MediaRecorder(camStream.current, {
          mimeType: "video/webm;codecs=vp9",
        });
        mediaRecorder.current.ondataavailable = e => {
          if (e.data.size > 0) recordedChunks.current.push(e.data);
        };
        mediaRecorder.current.start(1000);
      } catch (err) {
        alert("Camera/Recording error: " + err);
      }

      // Load questions (mock)
      setAllQuestions([
        "Tell me about yourself.",
        "Why do you want this role?",
        "What are your strengths and weaknesses?",
      ]);
    })();

    // Cleanup on unmount
    return () => {
      stopMedia();
    };
  }, []);

  // Also cleanup on tab close
  useEffect(() => {
    const handleUnload = () => stopMedia();
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  // Format time
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // Speech recognition
  const startAnswer = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported");
      return;
    }
    // @ts-ignore
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition.current = new SR();
    recognition.current.lang = "en-US";
    recognition.current.interimResults = true;
    recognition.current.continuous = true;

    let final = "";
    recognition.current.onresult = e => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          final += e.results[i][0].transcript;
        } else {
          interim += e.results[i][0].transcript;
        }
      }
      setTranscript(prev => {
        const copy = [...prev];
        copy[currentQ] = "A: " + (final + interim);
        return copy;
      });
    };

    recognition.current.onend = () => {
        setIsAnswering(false);
      
        // If 3 questions are done → end interview
        if (currentQ + 1 >= 3) {
          endInterview();
        } else {
          setCurrentQ(prev => prev + 1);
        }
      };
    recognition.current.start();
    setIsAnswering(true);
  };

  // End interview
  const endInterview = () => {
    stopMedia();
    if (recordedChunks.current.length > 0) {
      setVideoBlob(new Blob(recordedChunks.current, { type: "video/webm" }));
    }
    setIsEnded(true);
  
    handleBack();
  };

  // Back button handler
  const handleBack = () => {
    if (confirm("Are you sure you want to exit the interview?")) {
      stopMedia();
      navigate("/evaluation/1"); // explicit instead of navigate(-1)
      window.location.reload();
    }
  };

  if (isEnded) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Detailed Feedback</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            {videoBlob ? (
              <video controls className="w-full" src={URL.createObjectURL(videoBlob)} />
            ) : (
              "No video recorded"
            )}
          </div>
          <div className="border rounded-lg p-4 overflow-y-auto h-64">
            <h4 className="font-semibold text-blue-600 mb-2">Transcript</h4>
            {transcript.map((t, i) => (
              <p key={i} className="text-sm mb-1">
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4 flex items-center">
        <Button variant="destructive" size="sm" onClick={handleBack} className="mr-4">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h1 className="text-2xl font-bold text-blue-600">AI Interview</h1>
      </div>

      {/* Body */}
      <div className="flex flex-1 gap-4 p-4">
        {/* Camera Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative border-2 border-blue-600 rounded-lg overflow-hidden flex-1 bg-black">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
              <Button
                size="sm"
                className="rounded-full w-10 h-10 bg-blue-600"
                onClick={() => {
                  if (camStream.current) {
                    const track = camStream.current.getVideoTracks()[0];
                    track.enabled = !track.enabled;
                  }
                }}
              >
                🎥
              </Button>
              <Button
                size="sm"
                className="rounded-full w-10 h-10 bg-blue-600"
                onClick={() => {
                  if (camStream.current) {
                    const track = camStream.current.getAudioTracks()[0];
                    track.enabled = !track.enabled;
                  }
                }}
              >
                🎤
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select className="border rounded p-2">
              <option>Camera Selection</option>
            </select>
            <select className="border rounded p-2">
              <option>Microphone Selection</option>
            </select>
          </div>
        </div>

        {/* Question Section */}
        <div className="w-96 border rounded-lg flex flex-col">
          <div className="bg-blue-600 text-white p-4 font-semibold">
            {jobRole} <br />
            <small>Company: {company}</small>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="bg-blue-600 text-white p-3 rounded mb-2">
              Q: {allQuestions[currentQ]}
            </div>
            {transcript.map((a, i) => (
              <div key={i} className="bg-green-100 text-green-700 p-3 rounded mb-2">
                {a}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t px-6 py-4 flex items-center justify-between">
        <div>
          {currentQ + 1}/{allQuestions.length} Questions
        </div>
        <div className="font-mono">{formatTime(timeElapsed)}</div>
        <div className="flex gap-3">
          <Button onClick={startAnswer} disabled={isAnswering} className="bg-blue-600 text-white">
            Answer
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (confirm("Are you sure you want to end the interview?")) {
                endInterview();
              }
            }}
          >
            End
          </Button>
        </div>
      </div>
    </div>
  );
}
