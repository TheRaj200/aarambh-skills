
import { useState } from "react"

export default function ChatInterface({ onCoursesSelected, onAISelected, onAnalysisComplete }) {
  const [step, setStep] = useState(0)
  const [messages, setMessages] = useState([
    { role: "assistant", content: " ✨ Hey buddy! Welcome to Aarambh Skills. I'm your AI counsellor!" },
  ])
  const [input, setInput] = useState("")
  const [selectedCourses, setSelectedCourses] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const courses = ["C1", "C2", "C3", "C4", "C5", "C6", "C7"]
  const aiLevels = ["A1", "A2", "A3"]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() && step !== 1 && step !== 2) return

    const newMessages = [...messages]

    if (step === 0) {
      newMessages.push({ role: "assistant", content: " ✨ Choose the courses you want to know your interest in:" })
      setStep(1)
    } else if (step === 1) {
      onCoursesSelected(selectedCourses)
      newMessages.push({ role: "assistant", content: " ✨ Do you like to do A1, A2 or A3?" })
      setStep(2)
    } else if (step === 2) {
      onAISelected(input)
      setIsAnalyzing(true)
      newMessages.push({ role: "assistant", content: " ✨✨ Analyzing..." })
      // Simulate analysis
      setTimeout(() => {
        setIsAnalyzing(false)
        onAnalysisComplete()
      }, 2000)
    }

    if (input) {
      newMessages.push({ role: "user", content: input })
    }

    setMessages(newMessages)
    setInput("")
  }

  const toggleCourse = (course) => {
    setSelectedCourses((prev) => (prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]))
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {step === 1 && (
          <div className="flex flex-wrap gap-2">
            {courses.map((course) => (
              <button
                key={course}
                onClick={() => toggleCourse(course)}
                className={`w-12 h-12 rounded-md border-2 ${
                  selectedCourses.includes(course)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 hover:border-blue-600"
                }`}
              >
                {course}
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="flex gap-2">
            {aiLevels.map((level) => (
              <button
                key={level}
                onClick={() => setInput(level)}
                className="w-16 h-10 border-2 border-gray-300 rounded-md hover:border-blue-600"
              >
                {level}
              </button>
            ))}
          </div>
        )}

        {isAnalyzing && (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
            <span>Analyzing your preferences...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your response..."
          disabled={isAnalyzing || step === 1}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-600"
        />
        <button
          type="submit"
          disabled={isAnalyzing}
          className="px-4 py-2 bg-[#020A47] text-white rounded-md  disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  )
}

