AI-Powered Insight & Risk Analytics Dashboard

An enterprise-style AI analytics platform inspired by governance and risk intelligence systems.  
The platform analyzes text documents using AI, stores results persistently, and visualizes insights through interactive dashboards.

Features

AI Text Analyzer
  - Risk scoring
  - Sentiment classification (positive / neutral / negative)
  - Confidence estimation
  - Topic extraction

Analytics Dashboard
  - Risk score trend over time
  - Sentiment distribution (pie chart)
  - Confidence trend
  - KPI cards (latest results)

Analysis History
  - Tabular audit log of all analyses
  - Timestamped records
  - Color-coded sentiment badges

Persistent Storage
  - PostgreSQL database
  - Prisma ORM
  - Server-side data fetching

System architecture
AI Service
    FastAPI (Python)
    Rule based AI logic (extendable to ML / LLMs)
Frontend
    Next.js
    TypeScript
    Tailwind CSS
    Recharts (data visualization)
HTTP
    Next.js API
    Routes
Rest
    FastAPI
    AI Service
    Analyzer
PostgreSQL and Prisma ORM for storing the datas.

Data flow
    1. User submits text via Upload page
    2. Next.js API forwards text to FastAPI
    3. FastAPI analyzes text and returns AI insights
    4. Results are stored in PostgreSQL
    5. Dashboard fetches data server-side
    6. Charts render analytics from historical data

