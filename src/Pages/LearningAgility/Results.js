import React from "react";
import { useLocation } from "react-router-dom";
import { LearningAgilityQuestions } from "../uitility";
function LearningAgilityResults() {
  const location = useLocation();
  const { answers } = location.state;

  const scoreMapping = {
    "Rarely or never": 1,
    Occasionally: 2,
    Sometimes: 3,
    Often: 4,
    Always: 5,
  };

  const totalScore = answers.reduce(
    (total, answer) => total + scoreMapping[answer],
    0
  );
  const maxScore = LearningAgilityQuestions.length * 5;
  const percentage = (totalScore / maxScore) * 100;

  let agilityLevel;
  if (percentage >= 80) {
    agilityLevel = "High Learning Agility";
  } else if (percentage >= 60) {
    agilityLevel = "Moderate Learning Agility";
  } else {
    agilityLevel = "Low Learning Agility";
  }

  return (
    <div style={{ marginLeft: 20 }}>
      <h2>Quiz Results</h2>
      <p>
        Your Score: {totalScore} out of {maxScore}
      </p>
      <p>Overall Learning Agility: {agilityLevel}</p>
      <p>
        {agilityLevel === "High Learning Agility" &&
          "Individuals with high learning agility demonstrate a strong willingness to embrace new ideas and take risks. They consistently seek out opportunities to stretch their abilities and engage in self-reflection."}
        {agilityLevel === "Moderate Learning Agility" &&
          "Individuals with moderate learning agility demonstrate a willingness to consider new ideas and take some level of risk. They may occasionally embrace unfamiliar situations and experiment with new approaches."}
        {agilityLevel === "Low Learning Agility" &&
          "Individuals with low learning agility may be more resistant to change and less likely to seek out new experiences or engage in self-reflection. They may need more encouragement and support to embrace change and seek growth opportunities."}
      </p>
    </div>
  );
}

export default LearningAgilityResults;
