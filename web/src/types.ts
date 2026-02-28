export type IngredientAnalysis = {
  name: string
  category: string
  health_rating: "Healthy" | "Moderate" | "Avoid"
  explanation: string
}