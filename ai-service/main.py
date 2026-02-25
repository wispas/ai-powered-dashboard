from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
import pandas as pd
import io

app = FastAPI(title="AI Insight Service")

# ------------------ LOAD MODELS ONCE ------------------
sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

risk_classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)

summarizer = pipeline(
    "summarization",
    model="facebook/bart-large-cnn"
)

RISK_LABELS = [
    "financial risk",
    "compliance risk",
    "operational risk",
    "legal risk"
]

# ------------------ REQUEST SCHEMA ------------------
class AnalyzeRequest(BaseModel):
    dataType: str
    text: str | None = None
    csv: str | None = None


@app.post("/analyze")
def analyze(data: AnalyzeRequest):

    # ================= TEXT DATA =================
    if data.dataType == "text":
        if not data.text:
            raise HTTPException(status_code=400, detail="Text is required")

        text = data.text

        sentiment_result = sentiment_analyzer(text)[0]
        sentiment = sentiment_result["label"].lower()
        confidence = round(sentiment_result["score"], 2)

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

        opportunity_score = round((1 - risk_score) * confidence, 2)

        summary = summarizer(
            text,
            max_length=120,
            min_length=50,
            do_sample=False
        )[0]["summary_text"]

        return {
            "summary": summary,
            "sentiment": sentiment,
            "risk_score": risk_score,
            "opportunity_score": opportunity_score,
            "confidence": confidence,
            "topics": topics
        }

    # ================= CSV / TIME SERIES =================
    if data.dataType in ["csv", "timeseries"]:
        if not data.csv:
            raise HTTPException(status_code=400, detail="CSV data required")

        df = pd.read_csv(io.StringIO(data.csv))

        required_columns = {"revenue", "expenses"}
        if not required_columns.issubset(df.columns):
            raise HTTPException(
                status_code=400,
                detail="CSV must contain revenue and expenses columns"
            )

        avg_revenue = df["revenue"].mean()
        avg_expenses = df["expenses"].mean()

        risk_score = round(avg_expenses / avg_revenue, 2)
        opportunity_score = round(1 - risk_score, 2)

        return {
            "summary": "Time-series financial trend analysis completed.",
            "sentiment": "neutral",
            "risk_score": risk_score,
            "opportunity_score": opportunity_score,
            "confidence": 0.85,
            "topics": ["finance", "time-series", "risk"]
        }

    raise HTTPException(status_code=400, detail="Invalid data type")


# from fastapi import FastAPI
# from pydantic import BaseModel
# from transformers import pipeline
# import numpy as np

# app = FastAPI(title="AI Insight Service")

# # ✅ Load models ONCE (important for performance)
# sentiment_analyzer = pipeline(
#     "sentiment-analysis",
#     model="distilbert-base-uncased-finetuned-sst-2-english"
# )

# risk_classifier = pipeline(
#     "zero-shot-classification",
#     model="facebook/bart-large-mnli"
# )

# summarizer = pipeline(
#     "summarization",
#     model="facebook/bart-large-cnn"
# )

# class InputText(BaseModel):
#     text: str

# RISK_LABELS = [
#     "financial risk",
#     "compliance risk",
#     "operational risk",
#     "legal risk"
# ]

# @app.post("/analyze")
# def analyze(data: InputText):
#     text = data.text

#     # 1️⃣ Sentiment
#     sentiment_result = sentiment_analyzer(text)[0]
#     sentiment = sentiment_result["label"].lower()
#     confidence = round(sentiment_result["score"], 2)

#     # 2️⃣ Risk classification
#     risk_result = risk_classifier(
#         text,
#         candidate_labels=RISK_LABELS
#     )

#     risk_score = round(float(max(risk_result["scores"])), 2)

#     topics = [
#         label.split()[0]
#         for label, score in zip(
#             risk_result["labels"],
#             risk_result["scores"]
#         )
#         if score > 0.3
#     ]

#     opportunity_score = round((1 - risk_score) * confidence, 2)

#     # 3️⃣ AI Summary (REAL NLP)
#     summary = summarizer(
#         text,
#         max_length=120,
#         min_length=50,
#         do_sample=False
#     )[0]["summary_text"]

#     return {
#         "summary": summary,
#         "risk_score": risk_score,
#         "sentiment": sentiment,
#         "confidence": confidence,
#         "opportunity_score": opportunity_score,
#         "topics": topics
#     }
