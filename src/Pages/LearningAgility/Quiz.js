import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { LearningAgilityQuestions } from "../uitility";

const options = [
  "Rarely or never",
  "Occasionally",
  "Sometimes",
  "Often",
  "Always",
];

function LearningAgilityQuiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    Array(LearningAgilityQuestions.length).fill(null)
  );

  const handleOptionChange = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < LearningAgilityQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/learningagilityresults", { state: { answers } });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress =
    ((currentQuestion + 1) / LearningAgilityQuestions.length) * 100;

  return (
    <div>
      <h2>My Learning Agility Quiz</h2>
      <LinearProgress variant="determinate" value={progress} />
      <div style={{ marginLeft: 20 }}>
        <p>{LearningAgilityQuestions[currentQuestion]}</p>
        <ul>
          {options.map((option, index) => (
            <li key={index}>
              <label>
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  checked={answers[currentQuestion] === option}
                  onChange={() => handleOptionChange(currentQuestion, option)}
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
          {currentQuestion === LearningAgilityQuestions.length - 1
            ? "Submit"
            : "Next"}
        </button>
      </div>
    </div>
  );
}

export default LearningAgilityQuiz;
