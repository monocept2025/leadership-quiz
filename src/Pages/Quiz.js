import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { quizQuestions } from "./uitility";

function Quiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const questions = quizQuestions[quizId] || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleOptionChange = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit the quiz and navigate to results
      navigate("/results", { state: { answers } });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div>
      <h2>Quiz {quizId}</h2>
      <LinearProgress variant="determinate" value={progress} />
      <div style={{ marginLeft: 20 }}>
        <p>{questions[currentQuestion]?.question}</p>
        <ul>
          {questions[currentQuestion]?.options.map((option, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={answers[currentQuestion] === option}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: "flex", marginLeft: 20, gap: 40 }}>
        <button onClick={handleBack} disabled={currentQuestion === 0}>
          Back
        </button>
        <button onClick={handleNext}>
          {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
