from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Input(BaseModel):
    text: str

@app.post("/analyze")
def analyze(data: Input):
    return {
        "summary": "AI generated summaries",
        "risk_score": 0.68,
        "sentiment": "negative",
        "topics": ["compliance", "finance"]
    }
