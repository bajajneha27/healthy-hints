import type { AnalysisResponse } from './types'
import { FaGithub } from 'react-icons/fa'
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
    <div style={{
      maxWidth: 700,
      margin: "0 auto",
      padding: 16,
      boxSizing: "border-box",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <h1 style={{
          fontSize: 28,
          textAlign: "center",
          marginBottom: 8,
          whiteSpace: "nowrap"
        }}>
          Healthy Hints
        </h1>
        <label style={{
          fontWeight: 500
        }}>Product type: [ Food | Cosmetic | Household | Other ]</label>
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
          <div style={{
            maxWidth: 700,
            margin: "0 auto",
            padding: 16,
            width: "100%",
            boxSizing: "border-box"
          }}>
            <MemoizedResult result={result} />
          </div>
        )}
      </div>
      <div style={{
        padding: 25,
        fontSize: 12,
        color: "#9ca3af",
        textAlign: "center"
      }}>
        ⚠️ For informational purposes only. Not medical advice.
      </div>
      <a href='https://github.com/bajajneha27/healthy-hints'
         target='_blank'
         style={{ position: "absolute", top: 16, right: 16, fontSize: 22, opacity: 0.7}}>
          <FaGithub/>
      </a>
    </div>
  )
}

export default App
