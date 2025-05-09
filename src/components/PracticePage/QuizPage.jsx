import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Bannertemp from "../AboutPage/Bannertemp";
import Nav from "./Nav";
import envConfig from "../../utils/envConfig";

const QuizPage = () => {
  const { topicName } = useParams();
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answerFeedback, setAnswerFeedback] = useState({});
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view quiz");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${envConfig.backendUrl}/prepare/quiz/${topicName}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
          }
        );

        if (response.status === 401) {
          setError("Session expired. Please login again");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Failed to fetch quiz: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Raw API Response:', responseData);

        if (responseData.status && responseData.data) {
          const transformedQuestions = responseData.data.map((q) => {
            // Transform options array into the required format
            const optionsArray = q.meta_data.options.map((option, index) => ({
              id: String.fromCharCode(65 + index), // A, B, C, D
              text: option
            }));

            return {
              id: q.id,
              question: q.meta_data.question,
              options: optionsArray,
              level: q.level
            };
          });

          console.log('Transformed questions:', transformedQuestions);
          setQuestions(transformedQuestions);
          setFilteredQuestions(transformedQuestions); // Initially set all questions
        } else {
          throw new Error("Invalid quiz data format received");
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topicName, navigate]);

  // Add effect to filter questions when difficulty changes
  useEffect(() => {
    if (difficulty) {
      const filtered = questions.filter(q => q.level === difficulty);
      setFilteredQuestions(filtered);
    } else {
      setFilteredQuestions(questions);
    }
  }, [difficulty, questions]);

  const handleOptionSelect = async (questionId, optionId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to submit answer");
        return;
      }

      // Find the selected answer's text
      const selectedAnswerText = questions.find(q => q.id === questionId)
        ?.options.find(option => option.id === optionId)?.text;

      if (!selectedAnswerText) {
        setError("Invalid answer selected");
        return;
      }

      const response = await fetch(
        `${envConfig.backendUrl}/prepare/submit_answer/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Accept": "application/json"
          },
          body: JSON.stringify({
            topic_id: topicName,
            question_id: questionId,
            answer: selectedAnswerText
          }),
        }
      );

      const result = await response.json();
      console.log("Answer submission response:", result);

      if (result.status) {
        // Update the selected answer state
        setSelectedAnswers((prev) => ({
          ...prev,
          [questionId]: optionId,
        }));

        // Update answer feedback
        setAnswerFeedback((prev) => ({
          ...prev,
          [questionId]: {
            isCorrect: result.is_correct,
            correctAnswer: result.answer
          }
        }));
      } else {
        setError(result.message || "Failed to submit answer");
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError(err.message);
    }
  };

  const handleSubmit = async () => {
    let currentScore = 0;
    const correctAnswers = [];

    // Check each question and collect correct answers
    questions.forEach((q) => {
      // Find the selected answer's text
      const selectedAnswerText = q.options.find(
        (option) => option.id === selectedAnswers[q.id]
      )?.text;

      console.log(`Question: ${q.question}`);
      console.log(`Selected Answer: ${selectedAnswerText}`);
      console.log(`Correct Answer: ${q.correct_answer}`);

      // Compare selected answer with the correct answer
      if (selectedAnswerText === q.correct_answer) {
        currentScore++;
        correctAnswers.push({
          question_id: q.id,
          selected_answer: selectedAnswerText,
        });
      }
    });

    // Create submission data with only correct answers
    const submissionData = {
      topic_id: topicName,
      answers: correctAnswers,
    };

    // Log correct answers submission
    console.clear();
    console.log("Correct Answers Submission:", submissionData);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to submit quiz");
        return;
      }

      console.log("Sending submission data:", submissionData);

      
    } catch (err) {
      console.error("Error submitting quiz:", err);
      setError(err.message);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setShowScore(false);
    setScore(0);
  };

  if (loading) {
    return (
      <div>
        <Nav />
        <Bannertemp
          value={`${topicName} Multiple Choice Questions (MCQs) and Answers`}
        />
        <div className="max-w-5xl mx-auto p-4 md:p-6">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-[#020A47] rounded w-3/4"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-[#020A47] rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Nav />
        <Bannertemp
          value={`${topicName} Multiple Choice Questions (MCQs) and Answers`}
        />
        <div className="max-w-5xl mx-auto p-4 md:p-6">
          <div className="text-red-500 p-4 bg-red-50 rounded-md">
            <p className="font-medium">Error loading quiz:</p>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[#020A47] text-white rounded hover:bg-[#000033]/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div>
        <Nav />
        <Bannertemp
          value={`${topicName} Multiple Choice Questions (MCQs) and Answers`}
        />
        <div className="max-w-5xl mx-auto p-4 md:p-6">
          <div className="text-center">
            <p className="text-xl">No questions available for this topic.</p>
          </div>
        </div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div>
        <Nav />
        <Bannertemp
          value={`${topicName} Multiple Choice Questions (MCQs) and Answers`}
        />
        <div className="max-w-5xl mx-auto p-4 md:p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-xl mb-4">
              Your Score: {score} out of {questions.length}
            </p>
            <button
              onClick={handleRestart}
              className="mt-12 w-full md:w-[300px] bg-[#020A47] text-white py-3 rounded-lg hover:bg-[#000033]/90 transition-colors duration-200"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <Bannertemp
        value={`${topicName} Multiple Choice Questions (MCQs) and Answers`}
      />
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        {/* Difficulty Section */}
        <div className="mb-8 flex">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="md:text-xl font-semibold">DIFFICULTY</div>

            {/* Easy Toggle */}
            <div className="flex gap-4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={difficulty === "easy"}
                  onChange={() =>
                    setDifficulty(difficulty === "easy" ? "" : "easy")
                  }
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                <span className="ms-3 text-lg font-medium text-green-700">
                  Easy
                </span>
              </label>

              {/* Medium Toggle */}
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={difficulty === "medium"}
                  onChange={() =>
                    setDifficulty(difficulty === "medium" ? "" : "medium")
                  }
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-500"></div>
                <span className="ms-3 text-lg font-medium text-yellow-600">
                  Medium
                </span>
              </label>

              {/* Hard Toggle */}
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={difficulty === "hard"}
                  onChange={() =>
                    setDifficulty(difficulty === "hard" ? "" : "hard")
                  }
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                <span className="ms-3 text-lg font-medium text-red-800">
                  Hard
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {filteredQuestions.map((q) => (
            <div key={q.id} className="space-y-8">
              <div className="font-medium text-xl md:text-2xl">
                Q. {q.question}
              </div>
              <div className="md:mx-36 grid grid-cols-1 md:w-[70%] lg:w-[60%] md:grid-cols-2 gap-4 md:gap-8">
                {q.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(q.id, option.id)}
                    className={`p-3 text-left text-white rounded-lg text-lg md:text-lg flex items-center gap-3 ${
                      answerFeedback[q.id]?.isCorrect === false && 
                      option.text === answerFeedback[q.id]?.correctAnswer
                        ? "bg-green-600"
                        : selectedAnswers[q.id] === option.id
                        ? "bg-[#020a47a6]"
                        : "bg-[#020A47]"
                    }`}
                    disabled={answerFeedback[q.id] !== undefined}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center
                      text-sm ${
                        selectedAnswers[q.id] === option.id
                          ? "bg-white text-[#000033]"
                          : "bg-white text-[#000033]"
                      }`}
                    >
                      {option.id}
                    </span>
                    <span>{option.text}</span>
                  </button>
                ))}
              </div>
              {answerFeedback[q.id] && (
                <div className={`mt-2 p-3 rounded-md ${
                  answerFeedback[q.id].isCorrect 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {answerFeedback[q.id].isCorrect ? (
                    <p className="font-medium">Correct Answer!</p>
                  ) : (
                    <div>
                      <p className="font-medium">Wrong Answer!</p>
                      <p className="mt-1">Correct Answer: {answerFeedback[q.id].correctAnswer}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;