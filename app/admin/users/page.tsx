import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminGuard";
import SuspendUserButton from "@/components/users/SuspendUserButton";

export default async function AdminUsersPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    include: {
      analyses: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">All Users</h2>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Analyses</Th>
              <Th>Joined</Th>
              <Th>Actions</Th>
            </tr>
          </thead>

          <tbody>
            {users.map((u: any) => (
              <tr key={u.id} className="border-b last:border-0">
                <Td>{u.email}</Td>

                <Td>
                  <RoleBadge role={u.role} />
                </Td>

                <Td>
                  <StatusBadge status={u.status} />
                </Td>

                <Td>
                  {u.analyses.length} datasets

                  <div className="text-xs text-gray-500">
                    Avg Risk:{" "}
                    {(
                      u.analyses.reduce(
                        (sum: number, a: any) => sum + a.riskScore,
                        0
                      ) / (u.analyses.length || 1)
                    ).toFixed(2)}
                  </div>
                </Td>

                <Td>{u.createdAt.toLocaleDateString()}</Td>

                <Td>
                  <SuspendUserButton
                    userId={u.id}
                    role={u.role}
                    status={u.status}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- UI ---------- */

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-sm font-semibold text-gray-700">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-4 py-3 text-sm text-gray-800">
      {children}
    </td>
  );
}

function RoleBadge({ role }: { role: string }) {
  const color =
    role === "ADMIN"
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700";

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
      {role}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "SUSPENDED"
      ? "bg-gray-200 text-gray-700"
      : "bg-green-100 text-green-700";

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
      {status}
    </span>
  );
}