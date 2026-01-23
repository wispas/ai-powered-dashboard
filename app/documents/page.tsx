import { prisma } from "@/lib/prisma";

export default async function DocumentsPage() {
    const analyses: {
        id: string;
        createdAt: Date;
        riskScore: number;
        sentiment: string;
        confidence: number;
        summary: string;
      }[] = await prisma.analysis.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          createdAt: true,
          riskScore: true,
          sentiment: true,
          confidence: true,
          summary: true,
        },
      });
      

  if (analyses.length === 0) {
    return (
      <p className="text-gray-500">
        No documents analyzed yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Analysis History</h2>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <Th>Date</Th>
              <Th>Risk</Th>
              <Th>Sentiment</Th>
              <Th>Confidence</Th>
              <Th>Summary</Th>
            </tr>
          </thead>

          <tbody>
            {analyses.map((item) => (
              <tr key={item.id} className="border-b last:border-0">
                <Td>
                  {item.createdAt.toLocaleDateString()}
                </Td>
                <Td>{item.riskScore.toFixed(2)}</Td>
                <Td>
                  <SentimentBadge sentiment={item.sentiment} />
                </Td>
                <Td>{item.confidence.toFixed(2)}</Td>
                <Td className="max-w-md truncate">
                  {item.summary}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-sm font-semibold text-gray-800">
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-4 py-3 text-sm text-gray-900 ${className}`}>
      {children}
    </td>
  );
}

function SentimentBadge({ sentiment }: { sentiment: string }) {
  const color =
    sentiment === "positive"
      ? "bg-green-100 text-green-700"
      : sentiment === "negative"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${color}`}
    >
      {sentiment}
    </span>
  );
}
