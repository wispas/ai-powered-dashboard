"use client";

export default function DeletePropertyButton({ id }: { id: number }) {
  async function handleDelete() {
    if (!confirm("Delete this property?")) return;

    const res = await fetch(`/api/properties/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:underline text-sm"
    >
      Delete
    </button>
  );
}
