export type HealthRating = "Healthy" | "Moderate" | "Risky" | "Neutral"

export type OverallRating =
  | "Low Risk"
  | "Moderate Risk"
  | "High Risk"
  | "Unclear"

export type IngredientAnalysis = {
  name: string
  category: string
  health_rating: HealthRating
  explanation: string
}

export type OverallAssessment = {
  overall_rating: OverallRating
  summary: string
}

export type AnalysisResponse = {
  overall_assessment: OverallAssessment
  ingredients: IngredientAnalysis[]
}