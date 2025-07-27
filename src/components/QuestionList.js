import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setQuestions((questions) => questions.filter((q) => q.id !== id));
        }
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((q) => (
          <QuestionItem key={q.id} question={q} onDelete={handleDelete} />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
