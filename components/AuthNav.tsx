import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function AuthNav() {
  const session = await getServerSession(authOptions);

  // ❌ Not logged in
  if (!session?.user) {
    return (
      <>
        <Link
          href="/login"
          className="text-sm font-medium opacity-80 hover:opacity-100 transition"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="text-sm font-medium opacity-80 hover:opacity-100 transition"
        >
          Register
        </Link>
      </>
    );
  }

  // ✅ Logged in
  return (
    <>
      {/* ✅ ADMIN LINK */}
      {session.user.role === "ADMIN" && (
        <Link
          href="/admin"
          className="text-sm font-medium text-red-600 hover:text-red-700 transition"
        >
          Admin
        </Link>
      )}

      <LogoutButton />
    </>
  );
}
