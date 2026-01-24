import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-5xl text-center space-y-12">
        {/* Hero */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            AI-Powered Insight & <span className="text-blue-600">Risk Analytics</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Analyze company documents and real estate assets using AI to
            identify risks, generate opportunity insights, and visualize
            trends through interactive dashboards and maps.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-8 py-3 border border-gray-300 rounded-lg text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Open Dashboard
          </Link>

          <Link
            href="/upload"
            className="px-8 py-3 border border-gray-300 rounded-lg text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Upload Document
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 ">
          <Feature
            title="AI-Driven Analysis"
            description="Automatic summarization, sentiment detection, and risk & opportunity scoring using machine learning."
          />
          <Feature
            title="Interactive Dashboards"
            description="Visualize trends, confidence levels, and risk evolution through charts and analytics."
          />
          <Feature
            title="Real Estate Intelligence"
            description="Geospatial visualization of property risks using interactive maps for better decision-making."
          />
        </div>
      </div>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl shadow-sm border border-gray-200"
         style={{ backgroundColor: "var(--background)" }}>
      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>
      <p className="opacity-80">
        {description}
      </p>
    </div>
  );
}

