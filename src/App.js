import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QuizLinks from './Pages/QuizLinks';
import UserDetails from './Pages/userDetails';
import Quiz from './Pages/Quiz';
import Results from './Pages/Results';
import LearningAgilityQuiz from './Pages/LearningAgility/Quiz';
import LearningAgilityResults from './Pages/LearningAgility/Results';
import VARKQuiz from './Pages/VARK/VarkQuiz';
import VARKResults from './Pages/VARK/VarkResults';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<QuizLinks />} />
          <Route path="/details/:quizId" element={<UserDetails />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/learningagilityquiz/:quizId" element={<LearningAgilityQuiz />} />
          <Route path="/learningagilityresults" element={<LearningAgilityResults />} />
          <Route path="/varkquiz/:quizId" element={<VARKQuiz />} />
          <Route path="/varkresults" element={<VARKResults />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;