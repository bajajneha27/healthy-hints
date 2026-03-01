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

export default function Result({ result }: Props) {
  return(
    <>
      <div className='app-container'>
        <h2>{result.overall_assessment.overall_rating}</h2>
        <p>{result.overall_assessment.summary}</p>
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
      <p className='text-xs text-gray-500 mt-4 text-center'>
        ⚠️ For informational purposes only. Not medical advice.
      </p>
    </>
  )
}