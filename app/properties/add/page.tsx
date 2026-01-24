"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPropertyPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    city: "",
    latitude: "",
    longitude: "",
    value: "",
    riskScore: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/dashboard");
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Add Property</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ["name", "Property Name"],
          ["city", "City"],
          ["latitude", "Latitude"],
          ["longitude", "Longitude"],
          ["value", "Property Value"],
        //   ["riskScore", "Risk Score (0–1)"],
        ].map(([key, label]) => (
          <input
            key={key}
            name={key}
            placeholder={label}
            value={(form as any)[key]}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        ))}

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Save Property
        </button>
      </form>
    </div>
  );
}
