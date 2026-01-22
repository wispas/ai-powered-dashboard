"use client";

import { useState } from "react";

export default function UploadPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    setLoading(true);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    await res.json();
    setLoading(false);
    alert("Analysis complete");
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upload Text for AI Analysis</h2>

      <textarea
        className="w-full p-4 border rounded mb-4"
        rows={8}
        placeholder="Paste document text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}
