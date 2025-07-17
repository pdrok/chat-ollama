import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [thinking, setThinking] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse('');
    setThinking('');
    let fullResponse = '';

    try {
      const apiUrl = process.env.REACT_APP_OLLAMA_API_URL || 'http://192.51.100.100:11434/api/generate';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'qwen3:1.7b',
          prompt: prompt,
          stream: true,
        }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // Keep the last partial line in the buffer

        for (const line of lines) {
          if (line.trim() === '') continue;
          try {
            const data = JSON.parse(line);
            if (data.response) {
              fullResponse += data.response;
              const thinkMatch = fullResponse.match(/<think>(.*?)<\/think>/s);
              if (thinkMatch) {
                setThinking(thinkMatch[1]);
                setResponse(fullResponse.replace(/<think>.*?<\/think>/s, ''));
              } else {
                setResponse(fullResponse);
              }
            }
          } catch (error) {
            console.error('Error parsing JSON:', error, 'line:', line);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('Error fetching data. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ollama Chat</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here"
            rows="4"
            cols="50"
            required
          />
          <br />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Send'}
          </button>
        </form>
        {thinking && (
          <div className="thinking">
            <h2>Thinking:</h2>
            <pre>{thinking}</pre>
          </div>
        )}
        <div className="response">
          <h2>Response:</h2>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      </main>
    </div>
  );
}

export default App;