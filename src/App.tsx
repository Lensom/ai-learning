import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      setAnswer(data.answer);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>AI Learning</h1>

      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Loading..." : "Send"}
      </button>

      {answer && (
        <div>
          <h2>Answer</h2>
          <p>{answer}</p>
        </div>
      )}
    </main>
  );
}

export default App;
