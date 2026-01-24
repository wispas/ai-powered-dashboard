import "./globals.css";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import ThemeToggle from "@/components/ThemeToggle";
import MobileMenu from "@/components/MobileMenu";
import AuthNav from "@/components/AuthNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {/* Header */}
        <header className="border-b bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="hover:opacity-80 transition">
                <h1 className="text-lg sm:text-xl font-bold">
                  AI Insight Dashboard
                </h1>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-6">
                <NavLink href="/dashboard">Dashboard</NavLink>
                <NavLink href="/upload">Upload</NavLink>
                <NavLink href="/documents">Documents</NavLink>
                <NavLink href="/properties/add">Add Property</NavLink>
                <NavLink href="/properties">Properties</NavLink>
                <ThemeToggle />
                <AuthNav />
              </nav>

              {/* Mobile Menu */}
              <MobileMenu />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}


/* ---------------- Helpers ---------------- */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm font-medium opacity-80 hover:opacity-100 transition"
    >
      {children}
    </Link>
  );
}


/* ---------------- Mobile Menu ---------------- */
<MobileMenu />


