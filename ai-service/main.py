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

        #Normalize column names
        df.columns = [c.lower() for c in df.columns]

        # Flexible column detection
        def find_column(possible_names):
            for col in df.columns:
                if col in possible_names:
                    return col
            return None

        revenue_cols = ["revenue", "income", "sales"]
        expense_cols = ["expenses", "cost", "spending"]

        rev_col = find_column(revenue_cols)
        exp_col = find_column(expense_cols)

        summary = ""
        risk_score = 0.5
        opportunity_score = 0.5

        # Scope detection (important)
        if "date" in df.columns:
            data_scope = "time_series"
        else:
            data_scope = "structured"

        # Revenue logic
        if rev_col:
            revenue_trend = df[rev_col].iloc[-1] - df[rev_col].iloc[0]
            if revenue_trend > 0:
                summary += "Revenue is increasing. "
                opportunity_score += 0.2
            else:
                summary += "Revenue is decreasing. "
                risk_score += 0.2
        else:
            summary += "No revenue-related column found. "

        # Expense logic
        if exp_col:
            expense_trend = df[exp_col].iloc[-1] - df[exp_col].iloc[0]
            if expense_trend > 0:
                summary += "Expenses are increasing. "
                risk_score += 0.2
        else:
            summary += "No expense-related column found. "

        # General analysis (VERY IMPORTANT)
        numeric_df = df.select_dtypes(include=["number"])

        if not numeric_df.empty:
            volatility = numeric_df.std().mean()
            if volatility > 20:
                summary += "Data shows high volatility. "
                risk_score += 0.1

        # Normalize values
        risk_score = min(max(risk_score, 0), 1)
        opportunity_score = min(max(opportunity_score, 0), 1)

        return {
            "data_type": data_scope,
            "columns_detected": df.columns.tolist(),
            "summary": summary.strip(),
            "sentiment": "neutral",
            "risk_score": round(risk_score, 2),
            "opportunity_score": round(opportunity_score, 2),
            "confidence": 0.85,
            "topics": ["data-analysis", data_scope]
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
