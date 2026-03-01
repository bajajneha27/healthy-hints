import type { AnalysisResponse } from './types'
import React from 'react'
import { useState } from 'react'
import './App.css'
import Result from './result'

const MemoizedResult = React.memo(Result)

function App() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<AnalysisResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const analyseIngredients = async() => {
    const API_URL = import.meta.env.VITE_API_URL;
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch(`${API_URL}/analyse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredients_text: input })
      })

      if(!response.ok) {
        throw new Error("API request failed")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return(
    <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Healthy Hints</h1>
      <textarea
        rows={4}
        style={{ width: "100%", padding: 10 }}
        placeholder="Paste ingredients here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={analyseIngredients}
        disabled={loading || !input.trim()}
        style={{ marginTop: 10, padding: "8px 16px" }}
      >
        {loading ? "Analysing..." : "Analyse"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>{error}</p>
      )}

      {result && (
        <div>
          <MemoizedResult result={result} />
        </div>
      )}
    </div>
  )
}

export default App
