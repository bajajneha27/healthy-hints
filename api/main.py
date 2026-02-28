from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
import os
import json
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = FastAPI(
  title="Healthy Hints API",
  description="Open-source ingredient analysis API",
  version="0.1.0"
)

# Get API key from .env
api_key = os.getenv("GOOGLE_API_KEY")

# Initialize Gemini client
client = genai.Client(api_key=api_key)

# Define request body schema
class IngredientRequest(BaseModel):
  ingredients_text: str

@app.get("/")
def read_root():
  return {"Hello": "World"}

@app.post("/analyse")
def analyse(data: IngredientRequest):
  prompt = """
  You are a food ingredient health expert.
  Analyze the following ingredient list:

  INGREDIENTS_PLACEHOLDER
  Return ONLY valid JSON in this format:
  {
    "ingredients": [
    {
      "name": "",
      "category": "",
      "health_rating": "",
      "short_explanation": ""
    }],
    "overall_score": 1-10,
    "summary": ""
  }
  """

  logger.debug(f"Received input: {data.ingredients_text}")
  prompt = prompt.replace("INGREDIENTS_PLACEHOLDER", data.ingredients_text)

  try:
    response = client.models.generate_content(
      model="gemini-flash-latest",
      contents=prompt,
      config={
        "temperature": 0.2,
        "response_mime_type": "application/json"
      }
    )
    logger.debug(f"Gemini response: {response}")
    parsed = json.loads(response.text)
  except Exception as e:
    logger.exception("Error occurred in /analyse")
    raise e
  return parsed