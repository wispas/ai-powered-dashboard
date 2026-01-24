import "./globals.css";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import ThemeToggle from "@/components/ThemeToggle";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-gray-900">
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow text-gray-900">
          <h1 className="text-xl font-bold text-gray-900">
            AI Insight Dashboard
          </h1>

          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-gray-800 hover:text-black">
              Dashboard
            </Link>
            <Link href="/upload" className="text-gray-800 hover:text-black">
              Upload
            </Link>
            <Link href="/documents" className="text-gray-800 hover:text-black">
              Documents
            </Link>
            <LogoutButton />
            <nav className="flex items-center gap-6">
              <ThemeToggle />
              <LogoutButton />
            </nav>

          </nav>
        </header>

        <main className="p-6 text-gray-900">{children}</main>
      </body>
    </html>
  );
}
