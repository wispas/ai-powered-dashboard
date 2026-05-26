"use client";

export default function SuspendUserButton({
  userId,
  role,
  status,
}: any) {
  async function handleSuspend() {
    const res = await fetch("/api/admin/suspend-user", {
      method: "POST",
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("User suspended");
    location.reload();
  }

  // ❌ ADMIN CANNOT BE MODIFIED
  if (role === "ADMIN") {
    return <span className="text-gray-400">Protected</span>;
  }

  // Already suspended
  if (status === "SUSPENDED") {
    return <span className="text-gray-400">Suspended</span>;
  }

  return (
    <button
      onClick={handleSuspend}
      className="text-red-600 text-sm"
    >
      Suspend
    </button>
  );
}