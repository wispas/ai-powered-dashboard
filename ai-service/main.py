from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI(title="AI Insight Service")

class InputText(BaseModel):
    text: str

@app.post("/analyze")
def analyze(data: InputText):
    risk = round(random.uniform(0.3, 0.9), 2)

    return {
        "summary": "This document discusses compliance risks and financial exposure.",
        "risk_score": risk,
        "sentiment": "negative" if risk > 0.6 else "neutral",
        "topics": ["compliance", "finance", "risk"],
        "confidence": round(random.uniform(0.7, 0.95), 2),
    }
