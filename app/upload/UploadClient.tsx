"use client";

import { useState } from "react";

export default function UploadClient() {
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
    
    const data = await res.json(); // 👈 get response
    
    console.log("API RESPONSE:", data); // 👈 DEBUG
    
    if (!res.ok) {
      alert("Error: " + (data.error || JSON.stringify(data)));
      setLoading(false);
      return;
    }

    // after success → dashboard
    window.location.href = "/dashboard";
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold">Upload Data for AI Analysis</h2>

      <select
        value={dataType}
        onChange={(e) => setDataType(e.target.value)}
        className="border p-3 rounded w-full"
      >
        <option value="text">Text Data</option>
        <option value="csv">CSV Data</option>
        <option value="timeseries">Time Series (CSV)</option>
      </select>

      {dataType === "text" && (
        <textarea
          className="w-full border p-4 rounded"
          rows={8}
          placeholder="Paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}

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


// "use client";

// import { useState } from "react";
// import { setAiResult } from "@/lib/aiStore";

// export default function UploadClient() {
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleAnalyze() {
//     setLoading(true);

//     const res = await fetch("/api/analyze", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text }),
//     });

//     const data = await res.json();
//     setAiResult(data);

//     setLoading(false);
//     window.location.href = "/dashboard";
//   }

//   return (
//     <div className="max-w-3xl">
//       <h2 className="text-2xl font-bold mb-4 text-gray-900">
//         Upload Text for AI Analysis
//       </h2>

//       <textarea
//         className="w-full p-4 border rounded-lg mb-4
//                    bg-white text-gray-900
//                    placeholder-gray-400
//                    focus:outline-none focus:ring-2 focus:ring-black"
//         rows={10}
//         placeholder="Paste document text here..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />

//       <button
//         onClick={handleAnalyze}
//         disabled={loading || !text}
//         className="bg-black text-white px-6 py-3 rounded-lg
//                    hover:bg-gray-800 disabled:opacity-50"
//       >
//         {loading ? "Analyzing..." : "Analyze"}
//       </button>
//     </div>
//   );
// }
