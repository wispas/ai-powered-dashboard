"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "@/components/LogoutButton";

export default function AuthNav() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  
  if (!session?.user) {
    return (
      <>
        <Link
          href="/login"
          className="text-sm font-medium opacity-80 hover:opacity-100"
        >
          Login
        </Link>
        {/* <Link
          href="/register"
          className="text-sm font-medium opacity-80 hover:opacity-100"
        >
          Register
        </Link> */}
      </>
    );
  }


  return (
    <>
      <Link href="/dashboard" className="nav-link">Dashboard</Link>
      <Link href="/upload" className="nav-link">Upload</Link>
      <Link href="/documents" className="nav-link">Documents</Link>
      <Link href="/properties" className="nav-link">Properties</Link>

      {session.user.role === "ADMIN" && (
        <Link href="/admin" className="nav-link">
          Admin
        </Link>
      )}

      <LogoutButton />
    </>
  );
}
