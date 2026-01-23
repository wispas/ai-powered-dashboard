import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-bold text-xl text-gray-900">
            AI Insight Dashboard
          </h1>

          <div className="flex gap-6 text-gray-700 font-medium">
            <a href="/" className="hover:text-black">
              Home
            </a>
            <a href="/upload" className="hover:text-black">
              Upload
            </a>
            <a href="/documents" className="hover:text-black">
              Documents
            </a>
            <a href="/dashboard" className="hover:text-black">
              Dashboard
            </a>
          </div>
        </div>
      </nav>


        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
