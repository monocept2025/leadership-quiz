import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";

const questions = [
  {
    question: "I lean towards___for getting the latest news /information",
    options: [
      "Youtube / Ted Talks",
      "Podcasts / Audiobooks",
      "Books / eBooks / Newspapers",
      "Social Gatherings",
    ],
  },
  {
    question: "When I was studying, I remember things better when",
    options: [
      "Watching illustrations / illustrative videos that explain the concept",
      "Drew a mindmap to find the links between the concepts",
      "Reading / Writing / Highlighting the important point",
      "My friend explains the concepts to me",
    ],
  },
  {
    question: "On social media, I prefer",
    options: [
      "Videos with story voice overs",
      "Posts",
      "Reels",
      "Puzzles / Challenges",
    ],
  },
  {
    question: "At a book store, what kind of book would you reach for?",
    options: [
      "A book with lots of pictures",
      "A novel / work related book",
      "A book with word searches or crossword puzzles",
      "An audiobook",
    ],
  },
  {
    question:
      "When you are not sure how to spell a word, what are you most likely to do?",
    options: [
      "Read what I have written to see if it looks right",
      "Write it down in my mind to see if it looks right",
      "Spell it out loud to see if it sounds right",
      "Trace the letters in the air (finger spelling)",
    ],
  },
  {
    question: "When you see the word 'cat,' what do you do first?",
    options: [
      "Picture a cat in your mind",
      "Think about being with a cat (petting it or hearing it purr)",
      "Say the word 'cat' to yourself",
      "Just see the word as it is",
    ],
  },
  {
    question: "If you were buying a new car, you would:",
    options: [
      "Discuss with your friends what kind of car you should get",
      "Read reviews about the car online or in magazines",
      "Look at the model / build of the car and get the one that looks the best",
      "Test-drive lots of different types of cars before you buy",
    ],
  },
  {
    question: "What do you find most distracting when you are trying to study?",
    options: [
      "People walking past you",
      "A novel / storybook",
      "An uncomfortable chair",
      "Loud noises",
    ],
  },
  {
    question: "What do you like to do to relax?",
    options: [
      "Watch a movie / a TV show",
      "Exercise (walk, run, play sports, etc.)",
      "Listen to music",
      "Read",
    ],
  },
  {
    question:
      "What is the best way for you to remember something (e.g., a phone number)?",
    options: [
      "Write it down or store it in your phone",
      "Say it out loud over and over",
      "Picture the numbers on the phone as you would dial them",
      "Practice dialing it",
    ],
  },
  {
    question: "When you need directions for travelling, you prefer to:",
    options: [
      "Ask for spoken directions",
      "Read a map and follow it",
      "Trust your instincts and follow your nose",
      "Follow the sign boards",
    ],
  },
  {
    question:
      "If you were learning how to use a new piece of technology, you would:",
    options: [
      "Watch a video about it",
      "Have a go and try to figure it out for yourself",
      "Listen to someone explain how to use it",
      "Read the instructions",
    ],
  },
  {
    question: "When I want to learn about a new project, I would ask for:",
    options: [
      "Examples where the project has been used successfully",
      "Diagrams to show the project stages with charts, benefits, and costs",
      "A written report describing the main features of the project",
      "An opportunity to discuss the project",
    ],
  },
  {
    question: "I prefer a presenter or a teacher who uses:",
    options: [
      "Handouts, books, or readings",
      "Question and answer, talk, group discussion, or guest speakers",
      "Demonstrations, models or practical sessions",
      "Diagrams, charts, maps or graphs",
    ],
  },
  {
    question: "When learning from the internet, I like:",
    options: [
      "Audio channels where I can listen to podcasts or interviews",
      "Interesting written descriptions, lists, and explanations",
      "Videos showing how to do or make things",
      "Interesting design and visual features",
    ],
  },
];

function VARKQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const handleAnswerChange = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/varkresults", { state: { answers } });
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
      <h2>VARK Quiz</h2>
      <LinearProgress variant="determinate" value={progress} />
      <div style={{ marginLeft: 20 }}>
        <p>{questions[currentQuestion].question}</p>
        <ul>
          {questions[currentQuestion].options.map((option, index) => (
            <li key={index}>
              <label>
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option}
                  checked={answers[currentQuestion] === option}
                  onChange={() => handleAnswerChange(option)}
                />
                {String.fromCharCode(65 + index)}. {option}
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

export default VARKQuiz;
