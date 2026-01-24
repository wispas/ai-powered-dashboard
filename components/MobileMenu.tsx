"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import LogoutButton from "@/components/LogoutButton";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  // 🔒 Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden text-2xl font-bold"
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* Overlay (FULL COVER, NO BACKGROUND VISIBLE) */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm
        transition-opacity duration-300
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* Side Drawer (RIGHT → LEFT) */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-background z-50
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-xl"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-4 p-4">
          <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link href="/upload" onClick={() => setOpen(false)}>Upload</Link>
          <Link href="/documents" onClick={() => setOpen(false)}>Documents</Link>
          <Link href="/properties/add" onClick={() => setOpen(false)}>Add Property</Link>

          <div className="pt-4 border-t">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </nav>
      </div>
    </>
  );
}
