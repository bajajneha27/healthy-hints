from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel
from fastapi import FastAPI
from google import genai
from pathlib import Path
import logging
import json
import os

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = FastAPI(
  title="Healthy Hints API",
  description="Open-source ingredient analysis API",
  version="0.1.0"
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_methods=["*"],
  allow_headers=["*"],
)

# Get API key from .env
api_key = os.getenv("GOOGLE_API_KEY")

# Initialize Gemini client
client = genai.Client(api_key=api_key)

PROMPT_PATH = Path("prompts/ingredients_analysis.txt")

def load_prompt():
  return PROMPT_PATH.read_text()

BASE_PROMPT = load_prompt()

# Define request body schema
class IngredientRequest(BaseModel):
  ingredients_text: str

@app.get("/")
def read_root():
  return {"status": "Healthy Hints API running"}

@app.post("/analyse")
def analyse(data: IngredientRequest):

  logger.debug(f"Received input: {data.ingredients_text}")
  prompt = BASE_PROMPT.replace("{{ingredients}}", data.ingredients_text)

  try:
    response = client.models.generate_content(
      model="gemini-flash-latest",
      contents=prompt,
      config={
        "temperature": 0.0,
        "top_p": 0.1,
        "response_mime_type": "application/json"
      }
    )
    logger.debug(f"Gemini response: {response}")
    parsed = json.loads(response.text)
  except Exception as e:
    logger.exception("Error occurred in /analyse")
    raise e
  return parsed