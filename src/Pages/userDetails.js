import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserDetails() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const { quizId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can save user details in state or context if needed
    debugger;
    if (quizId === "1") {
      navigate(`/learningagilityquiz/${quizId}`);
    }
    if (quizId === "2") {
      navigate(`/quiz/${quizId}`);
    }
    if (quizId === "3") {
      navigate(`/varkquiz/${quizId}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginLeft: 20,
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: 10 }}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: 10 }}>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: 10 }}>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" style={{ marginTop: "10px", width: 148 }}>
        Start Quiz
      </button>
    </form>
  );
}

export default UserDetails;
