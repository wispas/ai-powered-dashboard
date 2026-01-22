"use client";

import { getAiResult } from "@/lib/aiStore";

export default function DashboardPage() {
  const result = getAiResult();

  if (!result) {
    return (
      <p className="text-gray-500">
        No analysis data available. Please upload a document.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Kpi title="Risk Score" value={result.risk_score.toString()} />
        <Kpi title="Sentiment" value={result.sentiment} />
        <Kpi title="Confidence" value={result.confidence.toString()} />
        <Kpi title="Topics" value={result.topics.length.toString()} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-2">AI Summary</h3>
        <p className="text-gray-700">{result.summary}</p>
      </div>
    </div>
  );
}

function Kpi({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
