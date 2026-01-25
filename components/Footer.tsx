import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="font-semibold text-lg">AI Insight</h3>
          <p className="mt-2 text-sm text-gray-500">
            AI-powered analytics for smarter decisions.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="font-medium mb-2">Product</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="#features">Features</Link></li>
            <li><Link href="#solutions">Solutions</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-medium mb-2">Company</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="#about">About</Link></li>
            <li><Link href="/register">Careers</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-medium mb-2">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>

      <div className="border-t text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} AI Insight. All rights reserved.
      </div>
    </footer>
  );
}
