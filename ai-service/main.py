from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class InputText(BaseModel):
    text: str

RISK_KEYWORDS = ["risk", "exposure", "compliance", "regulatory", "penalty", "loss"]

@app.post("/analyze")
def analyze(data: InputText):
    text_lower = data.text.lower()

    hits = sum(1 for k in RISK_KEYWORDS if k in text_lower)

    risk_score = min(0.2 + hits * 0.15, 0.95)

    sentiment = (
        "negative" if risk_score > 0.6
        else "neutral" if risk_score > 0.4
        else "positive"
    )

    return {
        "summary": data.text,
        "risk_score": round(risk_score, 2),
        "sentiment": sentiment,
        "topics": [k for k in RISK_KEYWORDS if k in text_lower],
        "confidence": 0.8
    }
