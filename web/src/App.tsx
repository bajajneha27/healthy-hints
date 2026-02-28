import { useState } from 'react'
import type { IngredientAnalysis } from './types'
import './App.css'

function App() {
  const [input, setInput] = useState("")
  const [results, setResults] = useState<IngredientAnalysis[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const getColor = (rating: string) => {
    switch(rating) {
      case "Healthy":
        return "green"
      case "Moderate":
        return "orange"
      case "Avoid":
        return "red"
      default:
        return "black"
    }
  }

  const analyseIngredients = async() => {
    setLoading(true)
    setError("")
    setResults([])

    try {
      const response = await fetch("http://127.0.0.1:8080/analyse", {
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
      setResults(data)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const score = results.reduce((acc, item) => {
    if (item.health_rating == "Healthy") return acc + 1
    if(item.health_rating == "Avoid") return acc - 1
    return acc
  }, 0)

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

      {results.length > 0 && (
        <body>
          {/* <div className='score-card'>Overall Score: {score}</div> */}
          <div className='app-container'>
            <table
              style={{
                width: "100%",
                marginTop: 20,
                borderCollapse: "collapse"
              }}
            >
              <thead>
                <tr>
                  <th align="left">Ingredient</th>
                  <th align="left">Category</th>
                  <th align="left">Rating</th>
                  <th align="left">Explanation</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td style={{ color: getColor(item.health_rating), fontWeight: "bold"}}>{item.health_rating}</td>
                    <td>{item.explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </body>
      )}
    </div>
  )
}

export default App
