import { prisma } from "@/lib/prisma";
import RiskTrendChart from "@/components/charts/RiskTrendChart";
import SentimentPieChart from "@/components/charts/SentimentPieChart";


export default async function DashboardPage() {
  const latest = await prisma.analysis.findFirst({
    orderBy: { createdAt: "desc" },
  });

  const history: {
    createdAt: Date;
    riskScore: number;
    sentiment: string;
  }[] = await prisma.analysis.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      createdAt: true,
      riskScore: true,
      sentiment: true,
    },
  });
  const chartHistory = history.map((item) => ({
    createdAt: item.createdAt.toISOString(),
    riskScore: item.riskScore,
  }));

  // Prepare sentiment counts
  const sentimentCounts = history.reduce(
    (acc: Record<string, number>, item) => {
      acc[item.sentiment] = (acc[item.sentiment] ?? 0) + 1;
      return acc;
    },
    {}
  );
  
  
  
  

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RiskTrendChart data={chartHistory} />
        <SentimentPieChart data={sentimentCounts} />
      </div>

     {/* Charts */}
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



