import { requireAdmin } from "@/lib/adminGuard";
import Link from "next/link";

export default async function AdminPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

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
