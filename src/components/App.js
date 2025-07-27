import React, { useEffect, useState } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState('questions');

  useEffect(() => {
    fetch('/questions')
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  function handleUpdateAnswer(id, correctIndex) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, correctIndex: parseInt(correctIndex) } : q
      )
    );
  }

  return (
    <main>
      <nav>
        <button onClick={() => setView('form')}>New Question</button>
        <button onClick={() => setView('questions')}>View Questions</button>
      </nav>
      <section>
        <h1>Quiz Questions</h1>
        <section>
          {view === 'form' ? (
            <QuestionForm onSubmit={handleAddQuestion} />
          ) : (
            <ul>
              {questions.map((q) => (
                <li key={q.id}>
                  <h2>{q.prompt}</h2>
                  <ul>
                    {q.answers.map((a, i) => (
                      <li key={i}>
                        {i === q.correctIndex ? <strong>{a}</strong> : a}
                      </li>
                    ))}
                  </ul>
                  <label>
                    Correct Answer:
                    <select
                      value={q.correctIndex}
                      onChange={(e) =>
                        handleUpdateAnswer(q.id, e.target.value)
                      }
                    >
                      {q.answers.map((_, i) => (
                        <option key={i} value={i}>
                          Answer {i + 1}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button onClick={() => handleDeleteQuestion(q.id)}>
                    Delete Question
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}

function QuestionForm({ onSubmit }) {
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const newQuestion = {
      id: Math.floor(Math.random() * 100000),
      prompt,
      answers,
      correctIndex: parseInt(correctIndex),
    };
    onSubmit(newQuestion);
    setPrompt('');
    setAnswers(['', '', '', '']);
    setCorrectIndex(0);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input
          name="prompt"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>
      {answers.map((a, i) => (
        <label key={i}>
          Answer {i + 1}:
          <input
            name={`answer${i}`}
            type="text"
            value={a}
            onChange={(e) => {
              const updatedAnswers = [...answers];
              updatedAnswers[i] = e.target.value;
              setAnswers(updatedAnswers);
            }}
          />
        </label>
      ))}
      <label>
        Correct Answer:
        <select
          name="correctIndex"
          value={correctIndex}
          onChange={(e) => setCorrectIndex(e.target.value)}
        >
          {answers.map((_, i) => (
            <option key={i} value={i}>
              Answer {i + 1}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default App;
