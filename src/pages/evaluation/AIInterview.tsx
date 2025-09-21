import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AllInterview() {
  const navigate = useNavigate();
  const location = useLocation();

  const jobRole = location.state?.jobRole || "Business Analyst – Banking Domain";
  const company = location.state?.company || "Generic";

  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [chat, setChat] = useState<{ type: "q" | "a"; text: string }[]>([]);
  const [progress, setProgress] = useState("");
  const [seconds, setSeconds] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const camStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<BlobPart[]>([]);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  // Start camera on mount
  useEffect(() => {
    (async () => {
      try {
        camStream.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        // You can attach camStream.current to a <video> ref here
      } catch (err) {
        console.error("Camera error:", err);
      }
    })();

    return () => {
      camStream.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const toggleMic = () => {
    if (camStream.current) {
      const audioTracks = camStream.current.getAudioTracks();
      if (audioTracks[0]) {
        const enabled = !audioTracks[0].enabled;
        audioTracks[0].enabled = enabled;
        setMicOn(enabled);
      }
    }
  };

  const toggleCam = () => {
    if (camStream.current) {
      const videoTracks = camStream.current.getVideoTracks();
      if (videoTracks[0]) {
        const enabled = !videoTracks[0].enabled;
        videoTracks[0].enabled = enabled;
        setCamOn(enabled);
      }
    }
  };

  const recognition = useRef<SpeechRecognition | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  const [screen, setScreen] = useState<"interview" | "report">("interview");
  const [reportData, setReportData] = useState<any>(null);

  // Timer
  useEffect(() => {
    if (screen === "interview") {
      const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [screen]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Setup camera and dummy questions
  useEffect(() => {
    if (screen !== "interview") return;

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
        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) recordedChunks.current.push(e.data);
        };
        mediaRecorder.current.start(1000);
      } catch (err) {
        console.error("Camera error:", err);
        alert("Failed to start camera");
      }

      const qs = [
        "Tell me about yourself.",
        "Why do you want this role?",
        "What are your strengths and weaknesses?",
      ];
      setQuestions(qs);
      setProgress(`1/${qs.length} Questions`);
      askQuestion(0, qs);
    })();

    return () => {
      stopMediaTracks();
    };
  }, [screen]);

  const askQuestion = (index: number, qs = questions) => {
    if (index >= qs.length) {
      endInterview();
      return;
    }
    // Prevent duplicate push
    setChat((prev) =>
        prev.some((c) => c.text === `Q: ${qs[index]}`)
            ? prev
            : [...prev, { type: "q", text: `Q: ${qs[index]}` }]
    );
  };

  const startAnswer = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    // @ts-ignore
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition.current = new SR();
    recognition.current.lang = "en-US";
    recognition.current.interimResults = true;
    recognition.current.continuous = true;

    let finalTranscript = "";
    recognition.current.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalTranscript += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      const ans = finalTranscript + interim;
      setChat((prev) => {
        const copy = [...prev];
        if (copy[copy.length - 1]?.type === "a") {
          copy[copy.length - 1].text = "A: " + ans;
        } else {
          copy.push({ type: "a", text: "A: " + ans });
        }
        return copy;
      });
    };

    recognition.current.onend = () => {
      setIsAnswering(false);
      setCurrentQ((q) => {
        const next = q + 1;
        setProgress(`${next + 1}/${questions.length} Questions`);
        if (next < questions.length) askQuestion(next);
        else endInterview();
        return next;
      });
    };

    recognition.current.start();
    setIsAnswering(true);
  };

  const stopMediaTracks = () => {
    if (camStream.current) {
      camStream.current.getTracks().forEach((t) => t.stop());
      camStream.current = null;
    }
  };

  const endInterview = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    stopMediaTracks();

    if (recordedChunks.current.length > 0) {
      setVideoBlob(new Blob(recordedChunks.current, { type: "video/webm" }));
    }

    // Updated AI Report Text
    setReportData({
      interactionTime: formatTime(seconds),
      totalQuestions: questions.length,
      overallPerformance: "Intermediate",
      communication: {
        rating: "Intermediate",
        explanation:
            "Your responses were understandable, but could benefit from more concise and impactful phrasing. While you conveyed relevant information, structuring your answers with a clear beginning, middle, and end would make them more effective. For example, in the 'Tell me about yourself' question, try using the STAR method (Situation, Task, Action, Result) to highlight your accomplishments and skills more powerfully. In your response to 'Why this role?', focusing on specific aspects of the job description and how your skills align would demonstrate a deeper understanding and stronger interest.",
      },
      technicalSkills: {
        rating: "Novice",
        explanation:
            "Since the provided transcript only includes general introductory questions, a comprehensive assessment of your technical skills is not possible. However, prepare for technical questions related to business analysis methodologies (e.g., Agile, Waterfall), data analysis tools (e.g., SQL, Excel), and modeling techniques. Review these areas to showcase your expertise in the follow-up interviews.",
      },
      problemSolvingSkills: {
        rating: "Intermediate",
        explanation:
            "This aspect could not be fully evaluated based on the provided transcript as no problem-solving scenarios were presented. Be prepared to demonstrate your problem-solving skills by applying structured approaches like the SWOT analysis or root cause analysis when answering situational questions. Practice using these techniques in mock interviews to build confidence and proficiency.",
      },
      clarity: {
        rating: "Intermediate",
        explanation:
            "Your answers were generally understandable, but lacked the precision and conciseness ideal for a business analyst. Practice summarizing complex information into clear and easily digestible points. Avoid jargon unless you are sure the interviewer understands it. Using quantifiable results whenever possible (e.g., 'increased efficiency by 15%') will significantly improve the clarity and impact of your responses.",
      },
      bodyLanguage: {
        rating: "Intermediate",
        explanation:
            "As this is a transcript-only assessment, I can only infer body language from the structure and content of your responses. Based on the information available, maintaining good eye contact (in a real interview) and projecting confidence through posture is key. Ensure your responses are enthusiastic and engaging, suggesting attentiveness and active participation. Practicing in front of a mirror or with a friend can be beneficial.",
      },
      speakingPace: {
        rating: "Average",
        value: 150,
        explanation:
            "This is an estimated value based on a typical speaking pace. A slightly slower pace, allowing for thoughtful pauses and emphasis, can significantly improve clarity and comprehension. Record yourself answering interview questions and review the pace. Aim for a rhythm that allows both you and the interviewer to comfortably process the information.",
      },
      fillerWords: {
        rating: "Average",
        value: 15,
        explanation:
            "This is an estimated value. Reducing filler words like 'um,' 'uh,' and 'like' will enhance professionalism and confidence. Practice answering questions out loud without interrupting yourself with filler words. Conscious effort to replace these with short pauses for thought will enhance the quality of your communication.",
      },
      detailedFeedback:
          "This mock interview provides a solid foundation for your preparation. While your responses demonstrated basic understanding, focusing on improving the structure and clarity of your answers, along with enhancing your technical skillset, will significantly elevate your performance. Practice using the STAR method, quantifying your accomplishments, and minimizing filler words. By addressing these points, you'll showcase your potential as a strong business analyst. Remember, practice makes perfect! Continue practicing with mock interviews and actively seek feedback. Your dedication to improvement will undoubtedly lead to success.",
    });

    setScreen("report");
  };

  const getRatingWidth = (rating: string) => {
    const levels = ["Novice", "Intermediate", "Advanced", "Expert"];
    return (levels.indexOf(rating) + 1) * 25;
  };

  return (
      <div className="h-screen flex flex-col bg-gray-50">
        {/* INTERVIEW */}
        {screen === "interview" && (
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              {/* Topbar */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "15px 30px", background: "#fff", borderBottom: "1px solid #e0e0e0", position: "relative" }}>
                <button onClick={() => (window.location.href = "/evaluation/1")} style={{ position: "absolute", left: "20px", background: "#e53935", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px" }}>⬅ Back</button>
                <h3 style={{ margin: 0, fontSize: "24px", color: "#1a73e8" }}>AI Interview</h3>
              </div>

              <div style={{ display: "flex", flex: 1, padding: "20px", gap: "20px", minHeight: 0, width: "100%" }}>
                {/* Camera Section */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px", minWidth: 0 }}>
                  {/* Camera Box */}
                  {/* Camera Box */}
                  <div style={{ flex: 1, border: "2px solid #1a73e8", borderRadius: "10px", overflow: "hidden", position: "relative", background: "#000" }}>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {/* Mic + Camera Controls */}
                    <div style={{ position: "absolute", bottom: "15px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "15px" }}>
                      <button id="micBtn" className={`control-btn ${!micOn ? "off" : ""}`} onClick={toggleMic}>
                        <i className="fa-solid fa-microphone"></i>
                      </button>
                      <button id="camBtn" className={`control-btn ${!camOn ? "off" : ""}`} onClick={toggleCam}>
                        <i className="fa-solid fa-video"></i>
                      </button>
                    </div>
                  </div>

                  {/* Device Selection */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    <select style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}>
                      <option>Camera Selection</option>
                    </select>
                    <select style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}>
                      <option>Microphone Selection</option>
                    </select>
                  </div>
                </div>

                {/* Question Section */}
                <div style={{ flex: 1, border: "1px solid #ddd", borderRadius: "10px", overflow: "hidden", display: "flex", flexDirection: "column", minWidth: 0 }}>
                  <div style={{ background: "#1a73e8", color: "#fff", padding: "15px", fontWeight: 600 }}>
                    {jobRole} <br />
                    <small>Company: {company}</small>
                  </div>
                  <div style={{ flex: 1, padding: "15px", background: "#f9fbfd", overflowY: "auto" }}>
                    {chat.map((c, i) => (
                        <div
                            key={i}
                            style={{
                              background: c.type === "q" ? "#1a73e8" : "#e6f4ea",
                              color: c.type === "q" ? "#fff" : "#2e7d32",
                              padding: "12px 15px",
                              borderRadius: "8px",
                              marginBottom: "10px",
                            }}
                        >
                          {c.text}
                        </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ height: "60px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", background: "#fff", borderTop: "1px solid #e0e0e0" }}>
                <div>{progress}</div>
                <div>{formatTime(seconds)}</div>
                <div>
                  <button onClick={startAnswer} disabled={isAnswering} style={{ padding: "8px 20px", background: "#1a73e8", color: "#fff", border: "none", borderRadius: "6px", marginRight: "10px" }}>Answer</button>
                  <button onClick={endInterview} style={{ padding: "8px 20px", background: "#e53935", color: "#fff", border: "none", borderRadius: "6px" }}>End</button>
                </div>
              </div>
            </div>
        )}

        {/* REPORT */}
        {screen === "report" && reportData && (
            <div style={{ padding: "20px" }}>
              <button onClick={() => (window.location.href = "/evaluation/1")} style={{ background: "#e53935", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", marginBottom: "20px" }}>⬅ Back</button>
              <h2 style={{ color: "#1a73e8", textAlign: "center" }}>Detailed Feedback</h2>

              {/* Video + Transcript */}
              <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <div style={{ flex: 1, border: "2px solid #1a73e8", borderRadius: "10px", overflow: "hidden" }}>
                  {videoBlob ? (
                      <video controls style={{ width: "100%", height: "100%" }} src={URL.createObjectURL(videoBlob)} />
                  ) : (
                      "No video recorded"
                  )}
                </div>
                <div style={{ flex: 1, border: "2px solid #1a73e8", borderRadius: "10px", padding: "15px", background: "#fff", height: "300px", overflowY: "auto" }}>
                  <h4 style={{ color: "#1a73e8" }}>Transcript</h4>
                  {chat.map((c, i) => (
                      <p key={i}>{c.text}</p>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <MetricCard label="Interaction Time" value={reportData.interactionTime} />
                <MetricCard label="Total Questions" value={reportData.totalQuestions} />
                <MetricCard label="Overall Performance" value={reportData.overallPerformance} />
              </div>

              {/* Skills */}
              {["communication", "technicalSkills", "problemSolvingSkills", "clarity", "bodyLanguage"].map((key) => {
                const section: any = (reportData as any)?.[key];
                if (!section) return null;
                return (
                    <div key={key} style={{ marginBottom: "20px" }}>
                      <h4 style={{ color: "#1a73e8", marginBottom: "5px" }}>{key.replace(/([A-Z])/g, " $1")}</h4>
                      <div style={{ height: "10px", background: "#e0e0e0", borderRadius: "5px" }}>
                        <div style={{ height: "100%", width: `${getRatingWidth(section.rating)}%`, background: "#1a73e8" }} />
                      </div>
                      <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>Novice &nbsp;&nbsp; Intermediate &nbsp;&nbsp; Advanced &nbsp;&nbsp; Expert</div>
                      <p style={{ fontSize: "14px", color: "#444" }}>{section.explanation}</p>
                    </div>
                );
              })}

              {/* Speaking Pace + Filler Words */}
              <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <CircleMetric title="Speaking Pace" value={`${reportData.speakingPace.value} WPM`} rating={reportData.speakingPace.rating} explanation={reportData.speakingPace.explanation} />
                <CircleMetric title="Filler Words" value={reportData.fillerWords.value} rating={reportData.fillerWords.rating} explanation={reportData.fillerWords.explanation} />
              </div>

              {/* Final Feedback */}
              <div style={{ background: "#fff", padding: "20px", borderRadius: "10px" }}>
                <h4 style={{ color: "#1a73e8" }}>Detailed Feedback for You</h4>
                <p>{reportData.detailedFeedback}</p>
              </div>
            </div>
        )}
      </div>
  );
}

// Sub-components
function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
      <div style={{ flex: 1, textAlign: "center", background: "#f9fbfd", borderRadius: "8px", padding: "15px" }}>
        <div style={{ fontSize: "18px", fontWeight: 600, color: "#333" }}>{value}</div>
        <div>{label}</div>
      </div>
  );
}

function CircleMetric({ title, value, rating, explanation }: { title: string; value: string | number; rating: string; explanation: string }) {
  return (
      <div style={{ flex: 1, textAlign: "center", background: "#f9fbfd", borderRadius: "8px", padding: "15px" }}>
        <h4 style={{ color: "#1a73e8" }}>{title}</h4>
        <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "#1a73e8", color: "#fff", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", margin: "10px auto" }}>{value}</div>
        <p>{rating}</p>
        <p style={{ fontSize: "14px", color: "#444" }}>{explanation}</p>
      </div>
  );
}
