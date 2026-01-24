"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Login
      </h2>

      <input
        className="w-full border p-3 mb-3 rounded"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border p-3 mb-4 rounded"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={async () => {
          await signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: "/dashboard",
          });
        }}
        className="bg-black text-white w-full py-3 rounded hover:bg-gray-800 transition"
      >
        Login
      </button>

      {/* ✅ Register Link */}
      <p className="text-sm text-center text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link
          href="/register"
          className="text-black font-medium hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
