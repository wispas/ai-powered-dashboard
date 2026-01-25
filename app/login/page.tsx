"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

 
  const getOAuthErrorMessage = (error: string) => {
    switch (error) {
      case "OAuthAccountNotLinked":
        return "This email is registered with email & password. Please log in using password.";
      case "CredentialsSignin":
        return "Invalid email or password.";
      case "AccessDenied":
        return "Access denied. Please try again.";
      case "Configuration":
        return "Authentication configuration error. Contact support.";
      default:
        return "Login failed. Please try again.";
    }
  };

  const handleCredentialsLogin = async () => {
    setFormError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    setLoading(false);

    if (res?.error) {
      if (res.error === "CredentialsSignin") {
        setFormError("Invalid email or password.");
      } else {
        setFormError("Login failed. Please try again.");
      }
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

    
      {oauthError && (
        <div className="mb-4 rounded-lg border border-red-500 bg-red-500/10 px-4 py-2 text-sm text-red-600">
          {getOAuthErrorMessage(oauthError)}
        </div>
      )}

    
      {formError && (
        <div className="mb-4 rounded-lg border border-red-500 bg-red-500/10 px-4 py-2 text-sm text-red-600">
          {formError}
        </div>
      )}

      <input
        className="w-full border p-3 mb-3 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border p-3 mb-4 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleCredentialsLogin}
        disabled={loading}
        className="bg-black text-white w-full py-3 rounded hover:bg-gray-800 transition disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Divider */}
      <div className="my-4 text-center text-sm text-gray-400">
        or
      </div>

      {/* Google Login */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="w-full flex items-center justify-center gap-3
                   rounded-lg border border-gray-300 bg-white px-4 py-2.5
                   text-sm font-medium text-gray-700
                   hover:bg-gray-50 hover:shadow-sm
                   active:scale-[0.98]
                   transition"
      >
        {/* Google Icon */}
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.15 0 5.95 1.08 8.16 2.85l6.08-6.08C34.65 2.55 29.7 0 24 0 14.6 0 6.47 5.38 2.55 13.22l7.06 5.48C11.37 13.16 17.17 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.7c-.55 3-2.23 5.54-4.75 7.25l7.3 5.68C43.86 37.36 46.5 31.45 46.5 24.5z"/>
          <path fill="#FBBC05" d="M9.6 28.7c-.45-1.34-.7-2.77-.7-4.2s.25-2.86.7-4.2l-7.06-5.48C.9 18.6 0 21.5 0 24.5s.9 5.9 2.54 8.68l7.06-5.48z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.9-2.14 15.86-5.82l-7.3-5.68c-2.03 1.37-4.62 2.18-8.56 2.18-6.83 0-12.63-3.66-14.4-8.9l-7.06 5.48C6.47 42.62 14.6 48 24 48z"/>
        </svg>

        Continue with Google
      </button>

      <p className="text-sm text-center text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link href="/register" className="text-black font-medium hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
