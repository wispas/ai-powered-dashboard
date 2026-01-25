import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      {/* HERO – full width background */}
      <section className="full-bleed bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              AI-Powered <span className="text-blue-200">Risk & Insight</span> Analytics
            </h1>

            <p className="mt-6 text-lg text-blue-100 max-w-xl">
              Analyze company data, real estate, and documents using AI to uncover
              risks and opportunities.
            </p>

            <div className="mt-8 flex gap-4">
            <Link href="/register" className="btn-primary">
              Get Started
            </Link>

              <Link
                href="#features"
                className="border border-white/40 px-6 py-3 rounded-lg text-white hover:bg-white/10 transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Image */}
          <img
            src="/images/dashboard-preview.png"
            alt="Dashboard Preview"
            className="rounded-xl shadow-2xl"
          />
        </div>
      </section>





      {/* FEATURES */}
      <section id="features" className="bg-[var(--bg-secondary)] py-24">
      <div className="grid md:grid-cols-3 gap-8">
        <Feature
          icon="📄"
          title="AI Document Analysis"
          description="Summarization, sentiment analysis, and risk scoring using modern AI."
        />
        <Feature
          icon="📊"
          title="Risk & Opportunity Scoring"
          description="Quantify threats and growth potential instantly with explainable scores."
        />
        <Feature
          icon="🗺️"
          title="Geospatial Risk Mapping"
          description="Visualize real estate risks and opportunities on interactive maps."
        />
      </div>

      </section>



      {/* SOLUTIONS */}
      <section id="solutions" className="py-24 bg-background">
  <div className="mx-auto max-w-7xl px-6 text-center">
    <h2 className="text-3xl font-bold text-foreground mb-6">
      Built for Enterprise Governance
    </h2>
    <p className="max-w-2xl mx-auto text-lg text-[var(--muted-text)]">
      Designed for compliance teams, risk analysts, and decision-makers who need clarity, speed, and trust.
    </p>
  </div>
</section>





      {/* ABOUT */}
      <section id="about" className="full-bleed py-24 bg-[var(--muted)]">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Inspired by Diligent
            </h2>
            <p className="text-lg text-[var(--muted-text)]">
              Built using modern AI, secure architecture, and interactive analytics to support high-stakes decisions.
            </p>
          </div>

          <img
            src="/images/architecture.png"
            className="rounded-xl border border-border bg-background"
            alt="Architecture"
          />
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
    <div className="
      bg-background
      border border-border
      p-6 rounded-xl
      shadow-sm
      hover:shadow-md
      transition
    ">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 text-xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-[var(--muted-text)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}


