"use client";

import { useState } from "react";

export default function UploadPage() {
  const [dataType, setDataType] = useState("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    const formData = new FormData();
    formData.append("dataType", dataType);

    if (dataType === "text") {
      formData.append("text", text);
    } else {
      if (!file) {
        alert("Please upload a CSV file");
        setLoading(false);
        return;
      }
      formData.append("file", file);
    }

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Error analyzing data");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold">Upload Data for AI Analysis</h2>

      {/* Data Type Selection */}
      <select
        value={dataType}
        onChange={(e) => setDataType(e.target.value)}
        className="border p-3 rounded w-full"
      >
        <option value="text">Text Data</option>
        <option value="csv">CSV Data</option>
        <option value="timeseries">Time Series (CSV)</option>
      </select>

      {/* Text Input */}
      {dataType === "text" && (
        <textarea
          className="w-full border p-4 rounded"
          rows={8}
          placeholder="Paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}

      {/* CSV Upload */}
      {dataType !== "text" && (
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import UploadClient from "./UploadClient";

// export default async function UploadPage() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.id) {
//     return (
//       <p className="text-gray-400">
//         Please log in to view your analyzed documents.
//       </p>
//     );
//   }

//   return <UploadClient />;
// }
