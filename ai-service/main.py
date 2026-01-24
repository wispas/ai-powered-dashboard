from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

app = FastAPI(title="AI Insight Service")

# Load models once (IMPORTANT)
sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

risk_classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)

class InputText(BaseModel):
    text: str

RISK_LABELS = [
    "financial risk",
    "compliance risk",
    "operational risk",
    "legal risk"
]

@app.post("/analyze")
def analyze(data: InputText):
    text = data.text

    # 1️⃣ Sentiment
    sentiment_result = sentiment_analyzer(text)[0]
    sentiment = sentiment_result["label"].lower()
    confidence = round(sentiment_result["score"], 2)

    # 2️⃣ Risk classification (semantic)
    risk_result = risk_classifier(
        text,
        candidate_labels=RISK_LABELS
    )

    risk_score = round(float(max(risk_result["scores"])), 2)
    topics = [
        label.split()[0]
        for label, score in zip(
            risk_result["labels"],
            risk_result["scores"]
        )
        if score > 0.3
    ]

    opportunity_score = round((1 - risk_score) * confidence, 2) #Opportunity scores calculation


    # 3️⃣ Summary (simple extractive for now)
    summary = text[:300] + "..." if len(text) > 300 else text

    return {
        "summary": summary,
        "risk_score": risk_score,
        "sentiment": sentiment,
        "confidence": confidence,
        "opportunity_score": opportunity_score,
        "topics": topics
    }
