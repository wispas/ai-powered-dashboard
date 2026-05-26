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
  recent,
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
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-2">Keywords (Topic Modeling)</h3>

        {latest.keywords?.length ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {latest.keywords.map((k: string, i: number) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {k}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">
            No keywords available
          </p>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">
          Recent Analyses (Last 5)
        </h3>

        <div className="space-y-3">
          {recent?.map((item: any, index: number) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg hover:bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>

                {/* 🔥 Highlight latest */}
                {index === 0 && (
                  <span className="text-green-600 text-xs font-semibold">
                    Latest
                  </span>
                )}
              </div>

              <p className="font-medium mt-1">{item.summary}</p>

              <div className="text-xs text-gray-400 mt-1 flex gap-3">
                <span>
                  Type: {item.dataType?.replace("_", " ")}
                </span>
                <span>Risk: {item.riskScore}</span>
              </div>
            </div>
          ))}
        </div>
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
