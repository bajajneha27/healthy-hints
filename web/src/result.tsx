import type { AnalysisResponse } from "./types"

type Props = {
  result: AnalysisResponse
}

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

const ratingColor = {
  "Low Risk": "#16a34a",
  "Moderate Risk": "#eab308",
  "High Risk": "#dc2626",
  "Unclear": "#6b7280"
}

export default function Result({ result }: Props) {
  const sentences = result.overall_assessment.summary.split(". ")
  return(
    <>
      <div className='app-container'>
        <span style={{ 
          background: ratingColor[result.overall_assessment.overall_rating],
          color: "white",
          padding: "4px 8px",
          borderRadius: 8,
          fontSize: 12
        }}>
          {result.overall_assessment.overall_rating}
        </span>
        <p style={{ margin: 0 }}>{sentences}</p>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "25%" }}>Ingredient</th>
              <th style={{ width: "20%" }}>Category</th>
              <th style={{ width: "15%" }}>Rating</th>
              <th style={{ width: "40%" }}>Explanation</th>
            </tr>
          </thead>
          <tbody>
            {result?.ingredients?.length > 0 && (
            result.ingredients.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td style={{ color: getColor(item.health_rating), fontWeight: "bold"}}>{item.health_rating}</td>
                <td>{item.explanation}</td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </>
  )
}