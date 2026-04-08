from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
import pandas as pd
import io

app = FastAPI(title="AI Manager Insight Engine")

# ------------------ LOAD MODELS ------------------
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

# More general labels (NOT only finance)
RISK_LABELS = [
    "financial risk",
    "user engagement risk",
    "operational risk",
    "performance risk",
    "growth opportunity",
    "customer behavior"
]

# ------------------ REQUEST ------------------
class AnalyzeRequest(BaseModel):
    dataType: str
    text: str | None = None
    csv: str | None = None


# ------------------ HELPERS ------------------

def detect_data_scope(df):
    if "date" in df.columns or "time" in df.columns:
        return "time_series"
    elif any("user" in col for col in df.columns):
        return "user_analytics"
    elif len(df.columns) > 5:
        return "complex_dataset"
    else:
        return "simple_dataset"


def detect_numeric_insights(df):
    insights = []
    numeric_df = df.select_dtypes(include="number")

    for col in numeric_df.columns:
        change = numeric_df[col].iloc[-1] - numeric_df[col].iloc[0]

        if change > 0:
            insights.append(f"{col} is increasing")
        elif change < 0:
            insights.append(f"{col} is decreasing")
        else:
            insights.append(f"{col} is stable")

    return insights


def detect_user_metrics(df):
    user_cols = ["user", "users", "active_users", "visitors"]

    for col in df.columns:
        if col in user_cols:
            avg = df[col].mean()
            current = df[col].iloc[-1]

            if current > avg:
                return "User engagement is strong"
            else:
                return "User engagement is declining"

    return None


def calculate_volatility(df):
    numeric_df = df.select_dtypes(include="number")
    if numeric_df.empty:
        return 0
    return numeric_df.std().mean()


# ------------------ MAIN API ------------------

@app.post("/analyze")
def analyze(data: AnalyzeRequest):

    # ================= TEXT =================
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
            label for label, score in zip(
                risk_result["labels"],
                risk_result["scores"]
            )
            if score > 0.3
        ]

        opportunity_score = round((1 - risk_score) * confidence, 2)

        summary = summarizer(
            text,
            max_length=120,
            min_length=40,
            do_sample=False
        )[0]["summary_text"]

        return {
            "type": "text_analysis",
            "summary": summary,
            "sentiment": sentiment,
            "risk_score": risk_score,
            "opportunity_score": opportunity_score,
            "confidence": confidence,
            "topics": topics,
            "manager_note": "AI analyzed sentiment, risks, and opportunities from text."
        }

    # ================= CSV / DATA =================
    if data.dataType in ["csv", "timeseries"]:
        if not data.csv:
            raise HTTPException(status_code=400, detail="CSV data required")

        df = pd.read_csv(io.StringIO(data.csv))
        df.columns = [c.lower() for c in df.columns]

        data_scope = detect_data_scope(df)

        summary = ""
        risk_score = 0.5
        opportunity_score = 0.5

        # 📊 Numeric Insights
        insights = detect_numeric_insights(df)
        summary += " ".join(insights) + ". "

        # 👥 User Analytics
        user_insight = detect_user_metrics(df)
        if user_insight:
            summary += user_insight + ". "

            if "strong" in user_insight:
                opportunity_score += 0.2
            else:
                risk_score += 0.2

        # ⚡ Volatility
        volatility = calculate_volatility(df)
        if volatility > 20:
            summary += "High volatility detected. "
            risk_score += 0.1

        # Normalize
        risk_score = min(max(risk_score, 0), 1)
        opportunity_score = min(max(opportunity_score, 0), 1)

        return {
            "type": "data_analysis",
            "data_scope": data_scope,
            "columns": df.columns.tolist(),
            "rows": len(df),
            "summary": summary.strip(),
            "kpis": insights,
            "risk_score": round(risk_score, 2),
            "opportunity_score": round(opportunity_score, 2),
            "confidence": 0.85,
            "topics": ["analytics", data_scope],
            "manager_note": "System automatically detected trends, risks, and user behavior."
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
