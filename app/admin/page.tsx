import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminGuard";
import Link from "next/link";

export default async function AdminPage() {
  await requireAdmin();

  // 📊 KPIs
  const totalUsers = await prisma.user.count();

  const activeUsers = await prisma.user.count({
    where: {
      analyses: {
        some: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
    },
  });

  const totalAnalyses = await prisma.analysis.count();

  const avgRisk = await prisma.analysis.aggregate({
    _avg: { riskScore: true },
  });

  const datasetTypes = await prisma.analysis.groupBy({
    by: ["dataType"],
    _count: true,
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Manager Dashboard</h1>

      {/* 🔥 KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Total Users" value={totalUsers} />
        <Card title="Active Users (7d)" value={activeUsers} />
        <Card title="Total Datasets" value={totalAnalyses} />
        <Card
          title="Avg Risk Score"
          value={avgRisk._avg.riskScore?.toFixed(2) || "0"}
        />
      </div>

      {/* 📊 DATASET TYPES */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Dataset Types</h2>

        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="py-2">Type</th>
              <th className="py-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {datasetTypes.map((d) => (
              <tr key={d.dataType} className="border-b">
                <td className="py-2">{d.dataType}</td>
                <td className="py-2">{d._count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔗 NAVIGATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/users"
          className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold">Manage Users</h2>
          <p className="text-gray-500 mt-2">
            View all users and their activity
          </p>
        </Link>
      </div>
    </div>
  );
}

/* ---------- UI ---------- */

function Card({ title, value }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}