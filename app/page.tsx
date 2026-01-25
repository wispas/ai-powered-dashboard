import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-32 bg-background overflow-hidden">
        {/* background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-foreground">
            AI-Powered Insight &{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-blue-600 dark:text-blue-400">
                Risk Analytics
              </span>
              <span className="absolute left-0 bottom-1 h-2 w-full bg-blue-600/20 dark:bg-blue-400/20 -z-0 rounded" />
            </span>
            </h1>

            <p className="mt-6 text-lg text-muted max-w-xl">
              Analyze company data, real estate, and documents using AI to uncover
              risks and opportunity scores.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/register"
                className="bg-foreground text-background px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
              >
                Get Started
              </Link>

              <a
                href="#features"
                className="border border-border px-6 py-3 rounded-lg hover:bg-muted transition"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="/images/dashboard-preview.png"
              alt="AI Dashboard Preview"
              className="rounded-xl shadow-2xl border border-border"
            />
          </div>
        </div>
      </section>



      {/* FEATURES */}
      <section id="features" className="py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Key Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              title="AI Document Analysis"
              icon="📄"
              description="Summarization, sentiment analysis, and risk scoring."
            />
            <Feature
              title="Risk & Opportunity Scoring"
              icon="📊"
              description="Quantify threats and growth potential instantly."
            />
            <Feature
              title="Interactive Maps"
              icon="🗺️"
              description="Visualize real estate risks geographically."
            />
          </div>
        </div>
      </section>


      {/* SOLUTIONS */}
      <section
          id="solutions"
          className="
            py-24
            bg-gradient-to-b
            from-background
            to-muted
          "
        >
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Solutions
            </h2>

            <p className="max-w-2xl mx-auto text-muted text-lg leading-relaxed">
              Designed for governance teams, risk analysts, and enterprise
              decision-makers.
            </p>
          </div>
        </section>



      {/* ABOUT */}
      <section
          id="about"
          className="
            py-24
            bg-gradient-to-b
            from-muted
            to-background
          "
        >
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              About the Platform
            </h2>

            <p className="max-w-2xl mx-auto text-muted text-lg leading-relaxed">
              Inspired by platforms like Diligent, built using modern AI,
              data visualization, and secure architecture.
            </p>
          </div>
        </section>


    </>
  );
}

function Feature({
  title,
  icon,
  description,
}: {
  title: string;
  icon: string;
  description: string;
}) {
  return (
    <div className="bg-background border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted leading-relaxed">{description}</p>
    </div>
  );
}

