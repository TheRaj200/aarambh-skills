"use client"

import { useState } from "react"
import CircularProgress from "./CircularProgress"

function QuizSection() {
  const [availableQuizzes] = useState(2)
  const [attemptedQuizzes] = useState(2)
  const [progress] = useState(100)

  return (
    <div className="flex-1 p-6">
      <h2 className="text-lg text-center font-medium mb-4">Quiz</h2>

      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
          <span className="font-medium">Available Quizzes</span>
          <span className="font-medium">{availableQuizzes}</span>
        </div>

        <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
          <span className="font-medium">Attempted Quizzes</span>
          <span className="font-medium">{attemptedQuizzes}</span>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <CircularProgress percentage={progress} size={150} />
      </div>
    </div>
  )
}

export default QuizSection

