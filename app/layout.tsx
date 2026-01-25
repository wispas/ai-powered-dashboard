import "./globals.css";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import MobileMenu from "@/components/MobileMenu";
import AuthNav from "@/components/AuthNav";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <Providers>
          {/* Header */}
          <header className="sticky top-0 z-50 bg-background border-b">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex h-16 items-center justify-between">
                {/* Logo */}
                <Link
                  href="/"
                  className="text-lg sm:text-xl font-semibold tracking-tight hover:opacity-80 transition"
                >
                  AI Insight
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                  <ThemeToggle />
                  <AuthNav />
                </nav>

                {/* Mobile */}
                <MobileMenu />
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
            {children}
          </main>
          <Footer />

        </Providers>
      </body>
    </html>
  );
}
