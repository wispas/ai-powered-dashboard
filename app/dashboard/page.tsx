import { prisma } from "@/lib/prisma";
import RiskTrendChart from "@/components/charts/RiskTrendChart";

export default async function DashboardPage() {
  const latest = await prisma.analysis.findFirst({
    orderBy: { createdAt: "desc" },
  });

  const history = await prisma.analysis.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      createdAt: true,
      riskScore: true,
    },
  });

  if (!latest) {
    return (
      <p className="text-gray-500">
        No analysis data available. Please upload a document.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Dashboard</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Kpi title="Risk Score" value={latest.riskScore.toString()} />
        <Kpi title="Sentiment" value={latest.sentiment} />
        <Kpi title="Confidence" value={latest.confidence.toString()} />
        <Kpi title="Total Analyses" value={history.length.toString()} />
      </div>

      {/* Charts */}
      <RiskTrendChart data={history} />
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
