"use client";

import { useState } from "react";
import { setAiResult } from "@/lib/aiStore";

export default function UploadClient() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    setLoading(true);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setAiResult(data);

    setLoading(false);
    window.location.href = "/dashboard";
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        Upload Text for AI Analysis
      </h2>

      <textarea
        className="w-full p-4 border rounded-lg mb-4
                   bg-white text-gray-900
                   placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-black"
        rows={10}
        placeholder="Paste document text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading || !text}
        className="bg-black text-white px-6 py-3 rounded-lg
                   hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}
