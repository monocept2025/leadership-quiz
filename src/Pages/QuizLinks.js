import React from 'react';
import { Link } from 'react-router-dom';

function QuizLinks() {
  const quizLinks = [
    { id: 1, title: 'Learning Agility' },
    { id: 2, title: 'Social Type' },
    { id: 3, title: 'VARK-Know your learning style' },
  ];

  return (
    <div>
      <h1>Quiz Links</h1>
      <ul>
        {quizLinks.map(link => (
          <li key={link.id}>
            <Link to={`/details/${link.id}`}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizLinks;