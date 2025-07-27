import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions((questions) => [...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setQuestions((questions) => questions.filter((q) => q.id !== id));
        }
      });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList questions={questions} onDelete={handleDeleteQuestion} />
      )}
    </main>
  );
}

export default App;
