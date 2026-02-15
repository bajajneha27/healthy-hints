from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Define request body schema
class IngredientRequest(BaseModel):
  ingredients_text: str

@app.get("/")
def read_root():
  return {"Hello": "World"}

@app.post("/analyse")
def analyse(data: IngredientRequest):
  ingredients_list = [i.strip() for i in data.ingredients_text.split(",")]

  analyzed = [
    {
      "name": ingredient,
      "health_rating": "Moderate",
      "short_explanation": "Example explanation."
    }
    for ingredient in ingredients_list
  ]

  return analyzed