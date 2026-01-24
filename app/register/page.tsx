"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Registration failed");
      setLoading(false);
      return;
    }

    // Auto login after register
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          Create Account
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
