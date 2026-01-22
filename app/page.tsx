import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          AI-Powered Insight & Risk Analytics
        </h1>

        <p className="text-lg text-gray-600 mb-10">
          Analyze documents using AI, detect risks, generate insights, and
          visualize trends — all in one intelligent dashboard.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-black text-white rounded-lg text-lg hover:bg-gray-800 transition"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/upload"
            className="px-6 py-3 border border-gray-300 rounded-lg text-lg hover:bg-gray-100 transition"
          >
            Upload Document
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature
            title="AI Analysis"
            description="Automatic summarization, sentiment analysis, and risk scoring using ML models."
          />
          <Feature
            title="Smart Dashboards"
            description="Interactive charts, trends, and analytics for better decision making."
          />
          <Feature
            title="Enterprise Ready"
            description="Inspired by governance & compliance platforms like Diligent AI."
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
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
