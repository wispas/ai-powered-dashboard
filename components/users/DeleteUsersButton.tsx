"use client";

export default function DeleteUsersButton({
  userId,
}: {
  userId: number;
}) {
  async function handleDelete() {
    if (!confirm("Delete this user? This action is irreversible.")) return;

    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      location.reload();
    } else {
      alert("Failed to delete user");
    }
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
