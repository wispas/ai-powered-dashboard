import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardClient from "./DashboardClient";

type AnalysisHistoryItem = {
    createdAt: Date;
    riskScore: number;
    sentiment: string;
    confidence: number;
  };
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const latest = await prisma.analysis.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  if (!latest) {
    return <p>No analysis data available.</p>;
  }

  const history: AnalysisHistoryItem[] =
  await prisma.analysis.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
    select: {
      createdAt: true,
      riskScore: true,
      sentiment: true,
      confidence: true,
    },
  });


  const properties = await prisma.property.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      latitude: true,
      longitude: true,
      riskScore: true,
    },
  });

  const chartHistory = history.map((i) => ({
    createdAt: i.createdAt.toISOString(),
    riskScore: i.riskScore,
  }));

  const confidenceHistory = history.map((i) => ({
    createdAt: i.createdAt.toISOString(),
    confidence: i.confidence,
  }));

  const sentimentCounts = history.reduce<Record<string, number>>(
    (acc, item) => {
      acc[item.sentiment] = (acc[item.sentiment] ?? 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <DashboardClient
      latest={latest}
      history={history}
      chartHistory={chartHistory}
      confidenceHistory={confidenceHistory}
      sentimentCounts={sentimentCounts}
      properties={properties}
    />
  );
}
