import type { Route } from "./+types/index";

export const meta: Route.MetaFunction = () => [
  { title: "University GPA Calculators | Compare International GPA Systems" },
  {
    name: "description",
    content:
      "Browse GPA calculators by country and university. Includes US, Canada, Australia, UK, Japan and more. Simple tools for converting grades to a 4.0 scale.",
  },
  {
    name: "keywords",
    content:
      "GPA calculator universities, GPA conversion, international GPA, Canada GPA calculator, Australia GPA calculator, UK GPA conversion, Japan GPA scale, university grade calculator",
  },
  { name: "robots", content: "index,follow" },
  { name: "theme-color", content: "#f9fafb" },

  // Social
  { property: "og:type", content: "website" },
  {
    property: "og:title",
    content: "University GPA Calculators | Global Grade Conversion Tools",
  },
  {
    property: "og:description",
    content:
      "Calculate and convert GPAs across international grading scales. Includes major universities worldwide.",
  },
  { property: "og:url", content: "https://allgpacalculators.com/calculators" },
  {
    property: "og:image",
    content: "https://allgpacalculators.com/og-image.jpg",
  },
  { name: "twitter:card", content: "summary_large_image" },
  { rel: "canonical", href: "https://allgpacalculators.com/calculators" },
];

export default function CalculatorsLanding() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://allgpacalculators.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: "https://allgpacalculators.com/calculators",
      },
    ],
  };

  const countryGroups = [
    {
      country: "United States",
      universities: [
        "Harvard University",
        "MIT",
        "Stanford University",
        "UC Berkeley",
        "UCLA",
        "University of Florida",
        "Ohio State University",
      ],
    },
    {
      country: "Canada",
      universities: [
        "University of Toronto",
        "UBC",
        "McGill University",
        "University of Waterloo",
        "Western University",
      ],
    },
    {
      country: "United Kingdom",
      universities: [
        "Oxford University",
        "University of Cambridge",
        "Imperial College London",
        "UCL",
      ],
    },
    {
      country: "Australia",
      universities: [
        "University of Sydney",
        "University of Melbourne",
        "Monash University",
        "UNSW Sydney",
      ],
    },
    {
      country: "Japan",
      universities: [
        "University of Tokyo",
        "Kyoto University",
        "Osaka University",
        "Tohoku University",
      ],
    },
  ];

  const moreTools = [
    "High School GPA Calculator",
    "College GPA Calculator",
    "Cumulative GPA Calculator",
    "Weighted GPA Calculator",
    "Semester GPA Calculator",
    "Final Grade Calculator",
    "Grade Percentage Calculator",
    "Grade to GPA Converter",
    "GPA Improvement Planner",
    "Study Time Calculator",
  ];

  const faqData = [
    {
      q: "Why are GPA calculators different for each country?",
      a: "Every country uses its own grading system with unique point scales, passing thresholds, and weighting rules. GPA calculators help convert those systems into a standard 4.0 scale which colleges, scholarship panels, and global employers can easily compare.",
    },
    {
      q: "Can I convert international grades to a US 4.0 GPA?",
      a: "Yes. You can convert letters, percentages, or numeric scales to 4.0 values using calculators designed for specific countries. Each calculator uses the common scale that aligns best with U.S. admissions evaluation.",
    },
    {
      q: "Do universities accept GPA conversions from online tools?",
      a: "Online GPA tools give accurate estimates for planning, but official conversions for admissions are handled by institutions or transcript evaluation services. Still, online GPA estimates are helpful for goal-setting and eligibility checks.",
    },
    {
      q: "Why do some universities show GPAs above 4.0?",
      a: "Advanced coursework like Honors, AP, IB, or accelerated programs may include weighted scales. This gives students extra points for more rigorous courses and can result in GPAs higher than 4.0.",
    },
    {
      q: "Can I compare my GPA internationally?",
      a: "Yes. These calculators help interpret grades across various global systems so you can compare academic performance with students from different countries. This is useful for applying to overseas universities or study-abroad programs.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="bg-white text-slate-700 scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b border-slate-200 shadow-sm z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <a href="/" className="text-lg font-semibold text-sky-600">
            All GPA Calculators
          </a>
          <div className="hidden sm:flex gap-6 text-slate-700 text-sm font-medium">
            <a href="/calculators" className="hover:text-sky-600 transition">
              Calculators
            </a>
            <a href="/#calculator" className="hover:text-sky-600 transition">
              Calculator
            </a>
            <a href="/#related" className="hover:text-sky-600 transition">
              Related Tools
            </a>
            <a href="/#faq" className="hover:text-sky-600 transition">
              FAQ
            </a>
            <a href="/#references" className="hover:text-sky-600 transition">
              References
            </a>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <section className="w-full bg-slate-50 border-b border-slate-200 mt-[64px]">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm flex items-center gap-1">
          <a
            href="/"
            className="flex items-center gap-1 text-sky-600 hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l9.5-9.5c.3-.3.8-.3 1.1 0l9.5 9.5m-18 0v8.25c0 .41.34.75.75.75h5.25m-6-9v0c0-.2.08-.39.22-.53zm0 0L12 3m0 0l8.03 8.03m-.28-.28c.14.14.22.33.22.53v8.25c0 .41-.34.75-.75.75H14.25"
              />
            </svg>
            Home
          </a>
          <span className="text-slate-400">›</span>
          <span className="text-slate-600 font-medium">Calculators</span>
        </div>
      </section>

      {/* Hero */}
      <section className="pt-10 pb-10 text-center bg-white">
        <h1 className="text-4xl font-bold text-slate-700 mb-4">
          University GPA Calculators
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Explore GPA tools by country and university. Understand grading scales
          and convert to standard 4.0 values for clear comparison.
        </p>
      </section>

      {/* Explore More Calculators (from home style) */}
      <section className="max-w-6xl mx-auto px-6 pb-6">
        <h2 className="text-3xl font-bold  mb-8 text-slate-700">
          Explore More GPA & Study Calculators
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {moreTools.map((name) => (
            <div
              key={name}
              className="block border border-slate-200 rounded-xl p-6 hover:shadow-md transition text-center text-slate-700 font-medium text-base"
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* Country Lists */}
      <section className="max-w-6xl mx-auto px-6 py-14 space-y-16">
        {countryGroups.map((group) => (
          <div key={group.country}>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              {group.country}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {group.universities.map((uni) => (
                <div
                  key={uni}
                  className="rounded-xl border border-slate-200 p-5 bg-white shadow-sm hover:shadow-md transition text-center"
                >
                  <div className="font-semibold text-slate-700 text-sm">
                    {uni}
                  </div>
                  <p className="text-xs mt-2 text-slate-500">
                    GPA Calculator Coming Soon
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Cross-Site Learning Links */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 text-center">
          More Tools and Learning Sites
        </h2>
        <p className="mt-2 text-slate-700 text-center max-w-2xl mx-auto">
          Explore related tools and learning resources to improve your skills in
          academics, finance, typing, word games, fitness, and creativity.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "iLoveGPACalculator.com",
              desc: "Grade-tracking tips, study improvement guides, and student lifestyle planning.",
              href: "https://ilovegpacalculator.com/",
            },
            {
              title: "MorseWords.com",
              desc: "Learn Morse code with audio, translators, and fun challenges.",
              href: "https://morsewords.com/",
            },
            {
              title: "FreeTypingCamp.com",
              desc: "Typing lessons and tests with progress tracking and mini-games.",
              href: "https://freetypingcamp.com/",
            },
            {
              title: "iLoveHabits.com",
              desc: "Daily habit tracking with practical routines for productivity and health.",
              href: "https://ilovehabits.com/",
            },
            {
              title: "LearnWordGames.com",
              desc: "Guides, rules, and skill boosters for popular word games.",
              href: "https://learnwordgames.com/",
            },
            {
              title: "iLoveSteps.com",
              desc: "Walking and step goals with health benefits and simple training ideas.",
              href: "https://ilovesteps.com/",
            },
            {
              title: "AllFitnessCalculators.com",
              desc: "BMR, BMI, calorie burn, and health-focused calculators for training smart.",
              href: "https://allfitnesscalculators.com/",
            },
            {
              title: "FinanceMapped.com",
              desc: "Understand money basics and explore finance history in a clear, engaging way.",
              href: "https://financemapped.com/",
            },
            {
              title: "iLoveColoringPage.com",
              desc: "Printable coloring pages for relaxation, creativity, and learning fun.",
              href: "https://ilovecoloringpage.com/",
            },
          ].map((site) => (
            <a
              key={site.title}
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-slate-900">
                {site.title}
              </h3>
              <p className="mt-2 text-sm text-slate-700">{site.desc}</p>
              <div className="mt-3 text-xs font-semibold text-sky-600">
                Visit →
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-700">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqData.map((f, i) => (
            <div key={i}>
              <h3 className="font-semibold text-lg text-slate-700 mb-1">
                {f.q}
              </h3>
              <p className="text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-20 text-center">
        <a
          href="/"
          className="inline-block rounded-xl bg-sky-500 px-6 py-3 text-white font-semibold text-base shadow hover:bg-sky-600 transition"
        >
          Use universal GPA calculator
        </a>
        <p className="mt-4 text-sm text-slate-500 max-w-lg mx-auto">
          Weighted and unweighted GPA with cumulative and semester tracking
        </p>
      </section>

      {/* Disclaimer Footnote */}
      <section className="max-w-6xl mx-auto px-6 pb-6">
        <p className="text-xs text-slate-500 text-center leading-relaxed">
          <em>
            All university names and trademarks are owned by their respective
            institutions. This website is not affiliated with or endorsed by any
            university. GPA tools are provided for general informational and
            planning purposes to help students, parents, and educators interpret
            grading scales and estimate academic standing.
          </em>
        </p>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Footer (unchanged) */}
      <footer className="text-center py-8 text-slate-500 text-sm border-t border-slate-200">
        © {new Date().getFullYear()} AllGpaCalculators.com • Global GPA tools
      </footer>
    </main>
  );
}
