"use client";

import dynamic from "next/dynamic";
import RiskTrendChart from "@/components/charts/RiskTrendChart";
import SentimentPieChart from "@/components/charts/SentimentPieChart";
import ConfidenceTrendChart from "@/components/charts/ConfidenceTrendChart";

const PropertyMap = dynamic(
  () => import("@/components/maps/PropertyMap"),
  { ssr: false }
);

export default function DashboardClient({
  latest,
  history,
  chartHistory,
  confidenceHistory,
  sentimentCounts,
  properties,
}: any) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Kpi title="Risk Score" value={latest.riskScore.toString()} />
        <Kpi title="Sentiment" value={latest.sentiment} />
        <Kpi title="Confidence" value={latest.confidence.toString()} />
        <Kpi title="Total Analyses" value={history.length.toString()} />
        <Kpi
          title="Opportunity Score"
          value={(latest.opportunityScore ?? 0).toString()}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-2">AI Summary</h3>
        <p className="text-gray-800">{latest.summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RiskTrendChart data={chartHistory} />
        <SentimentPieChart data={sentimentCounts} />
      </div>

      <ConfidenceTrendChart data={confidenceHistory} />

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">
          Real Estate Risk Map
        </h3>
        <PropertyMap properties={properties} />
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
