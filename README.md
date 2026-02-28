# Healthy Hints

An open-source AI-powered ingredient analysis tool.
Upload or paste food ingredient lists and get a short health breakdown for each ingredient.

## Features

- Ingredient text analysis
- Gemini-powered classification
- Health rating (Healthy/Moderate/Avoid)
- Short explanation per ingredient

## Tech Stack
Backend:
  - Python
  - FastAPI
  - Gemini API

Frontend:
  - React
  - Typescript
  - Vite

## Project Structure

- api/ → FastAPI API
- web/ → Vite UI

## How to Run Locally

- Clone Repo
```bash
git clone https://github.com/bajajneha27/healthy-hints.git
cd healthy-hints
```

- Backend

```bash
cd api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create `.env` file:
```bash
GEMINI_API_KEY=your_key_here
```

Start Server:
```bash
uvicorn main:app --reload --port 8080
```

- Frontend

```bash
cd web
npm install
npm run dev
```

Open:
```bash
http://localhost:5173
```

## Example Request

```bash
curl --request POST \
  --url http://127.0.0.1:8080/analyse \
  --header 'Content-Type: application/json' \
  --data '{"ingredients_text": "Sugar, Palm Oil, Salt}'
```

Expected Response:
```json
[
  {
    "name": "Sugar",
    "category": "Sweetener",
    "health_rating": "Avoid",
    "explanation": "High glycemic impact."
  }
]
```

## ⚠️ Disclaimer

Healthy Hints provides ingredients analysis for informational purpose only.
The health ratings and explanations are generated using AI models. They are not
medical advice and should not be used to diagnose or treat any medical condition.

## License

MIT License