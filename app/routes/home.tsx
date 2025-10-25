import { useState, useEffect } from "react";
import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => [
  {
    title:
      "GPA Calculator – Weighted, Unweighted & Cumulative | Free Online Tool",
  },
  {
    name: "description",
    content:
      "Free GPA Calculator for high school and college. Instantly compute weighted, unweighted, and cumulative GPA across semesters. Save progress and track results in real time.",
  },
  {
    name: "keywords",
    content:
      "GPA calculator, weighted GPA, unweighted GPA, cumulative GPA, semester GPA, high school GPA calculator, college GPA calculator, AP GPA, honors GPA, GPA tracker, GPA planner",
  },
  { name: "robots", content: "index,follow" },
  { name: "author", content: "AllGpaCalculators.com" },
  { name: "theme-color", content: "#f9fafb" },

  // --- Open Graph / Facebook ---
  { property: "og:type", content: "website" },
  {
    property: "og:title",
    content:
      "Free GPA Calculator – Weighted, Unweighted & Cumulative GPA Tracker",
  },
  {
    property: "og:description",
    content:
      "Calculate your GPA instantly with this free weighted and unweighted GPA calculator. Add semesters, set credits, and view your cumulative GPA in real time.",
  },
  { property: "og:url", content: "https://allgpacalculators.com/" },
  { property: "og:site_name", content: "All GPA Calculators" },
  {
    property: "og:image",
    content: "https://allgpacalculators.com/og-image.jpg",
  },

  // --- Twitter ---
  { name: "twitter:card", content: "summary_large_image" },
  {
    name: "twitter:title",
    content:
      "Free GPA Calculator – Weighted & Unweighted | Cumulative GPA Tool",
  },
  {
    name: "twitter:description",
    content:
      "Compute your GPA online in seconds. Supports weighted, unweighted, and cumulative calculations. Perfect for students and parents.",
  },
  {
    name: "twitter:image",
    content: "https://allgpacalculators.com/og-image.jpg",
  },
  { name: "twitter:site", content: "@AllGpaCalculators" },
  { rel: "canonical", href: "https://allgpacalculators.com/" },
];

export default function Home() {
  // ---------- helpers ----------
  const genId = () => Date.now() + Math.random();

  // 4 preset blank courses
  const defaultCourses = [
    { id: genId(), name: "", grade: "A", credits: 3, tier: "unweighted" },
    { id: genId(), name: "", grade: "A", credits: 3, tier: "unweighted" },
    { id: genId(), name: "", grade: "A", credits: 3, tier: "unweighted" },
    { id: genId(), name: "", grade: "A", credits: 3, tier: "unweighted" },
  ];

  // ---------- state (with localStorage restore) ----------
  const [semesters, setSemesters] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gpa_semesters");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return [
      {
        id: 1,
        name: "Semester 1",
        courses: defaultCourses,
      },
    ];
  });

  const [weightedOn, setWeightedOn] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gpa_weightedOn");
      if (saved !== null) return JSON.parse(saved);
    }
    return true;
  });

  // persist to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gpa_semesters", JSON.stringify(semesters));
      localStorage.setItem("gpa_weightedOn", JSON.stringify(weightedOn));
    }
  }, [semesters, weightedOn]);

  // ---------- calculator logic (UNCHANGED UI) ----------
  const GRADE_POINTS: Record<string, number> = {
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    F: 0.0,
  };

  const WEIGHT_BONUS: Record<string, number> = {
    honors: 0.5,
    apib: 1.0,
    unweighted: 0,
  };

  const computeSemesterGPA = (sem: any, weighted: boolean) => {
    let points = 0;
    let credits = 0;
    sem.courses.forEach((c: any) => {
      const gp = GRADE_POINTS[c.grade] ?? 0;
      const wt = weighted ? (WEIGHT_BONUS[c.tier] ?? 0) : 0;
      const cr = parseFloat(c.credits) || 0;
      points += (gp + wt) * cr;
      credits += cr;
    });
    return {
      gpa: credits ? points / credits : 0,
      attempted: credits.toFixed(1),
    };
  };

  const updateCourse = (semId: number, cId: number, updates: any) => {
    setSemesters((prev: any[]) =>
      prev.map((s) =>
        s.id === semId
          ? {
              ...s,
              courses: s.courses.map((c: any) =>
                c.id === cId ? { ...c, ...updates } : c
              ),
            }
          : s
      )
    );
  };

  const addCourse = (semId: number) => {
    setSemesters((prev: any[]) =>
      prev.map((s) =>
        s.id === semId
          ? {
              ...s,
              courses: [
                ...s.courses,
                {
                  id: genId(),
                  name: "",
                  grade: "A",
                  credits: 3,
                  tier: "unweighted",
                },
              ],
            }
          : s
      )
    );
  };

  const removeCourse = (semId: number, cId: number) => {
    setSemesters((prev: any[]) =>
      prev.map((s) =>
        s.id === semId
          ? { ...s, courses: s.courses.filter((c: any) => c.id !== cId) }
          : s
      )
    );
  };

  const addSemester = () => {
    // new semester starts with 4 blank preset rows too
    const fresh = defaultCourses.map((c) => ({ ...c, id: genId() }));
    setSemesters((prev: string | any[]) => [
      ...prev,
      {
        id: genId(),
        name: `Semester ${prev.length + 1}`,
        courses: fresh,
      },
    ]);
  };

  const removeSemester = (id: number) => {
    setSemesters((prev: any[]) => prev.filter((s) => s.id !== id));
  };

  const cumulative = semesters.reduce(
    (acc: { points: number; credits: number }, sem: any) => {
      const result = computeSemesterGPA(sem, weightedOn);
      const attempted = parseFloat(result.attempted);
      acc.points += result.gpa * attempted;
      acc.credits += attempted;
      return acc;
    },
    { points: 0, credits: 0 }
  );

  // @ts-ignore - attach derived
  cumulative.gpa = cumulative.credits
    ? cumulative.points / cumulative.credits
    : 0;

  // --- FAQ and schema (UNCHANGED CONTENT) ---
  const faqData = [
    {
      q: "How does this GPA calculator work?",
      a: "This calculator converts each letter grade into grade points based on a standard 4.0 GPA scale. It multiplies those points by the course credits, sums all results, and divides by total attempted credits. It supports both weighted and unweighted GPA calculations for accurate semester and cumulative results.",
    },
    {
      q: "Can my GPA be higher than 4.0?",
      a: "Yes, if your school uses a weighted GPA system. Honors courses usually add +0.5, and AP or IB courses add +1.0. This means students taking advanced or honors classes can achieve GPAs above 4.0 on a weighted scale.",
    },
    {
      q: "What is the difference between weighted and unweighted GPA?",
      a: "An unweighted GPA uses a 4.0 scale for all classes, while a weighted GPA rewards harder courses like Honors, AP, or IB with extra points. Weighted GPAs give a more accurate reflection of academic rigor in your transcript.",
    },
    {
      q: "How can I raise my GPA quickly?",
      a: "Focus on improving grades in high-credit or core classes, retake failed or low-grade courses, and seek extra help early. Study consistently, use a planner, and track your progress with a semester GPA calculator to see how new grades affect your average in real time.",
    },
    {
      q: "Does GPA really matter for college admissions?",
      a: "Yes. GPA is one of the most important academic metrics used by colleges and universities. It reflects both consistency and rigor. Combined with test scores, essays, and extracurriculars, GPA strongly impacts your chances of admission and scholarships.",
    },
    {
      q: "Is this GPA calculator accurate for my school or college?",
      a: "Our GPA formulas are based on widely used U.S. 4.0 and 5.0 scales. However, some schools apply unique weighting systems. Always double-check with your academic advisor or registrar to confirm your institution’s exact GPA conversion rules.",
    },
    {
      q: "Can I calculate my cumulative GPA with this tool?",
      a: "Yes. You can add multiple semesters to track both your semester GPA and your overall cumulative GPA. The calculator automatically averages all course grades and credits entered across semesters.",
    },
    {
      q: "What is a good GPA for college?",
      a: "A GPA above 3.5 is typically considered very good, while 3.0 is average for most colleges. Highly selective universities may expect a weighted GPA of 4.0 or higher, especially for competitive programs like engineering or pre-med.",
    },
    {
      q: "Does GPA affect scholarships and financial aid?",
      a: "Absolutely. Many merit-based scholarships require maintaining a specific GPA threshold, often between 3.0 and 3.7. A strong GPA also increases eligibility for honors programs, grants, and academic awards.",
    },
    {
      q: "How do I calculate GPA for college transfers?",
      a: "Add up all transferable course grades and credits from your previous school using the same 4.0 scale. Then use this calculator’s cumulative mode to see your total transfer GPA before applying to a new institution.",
    },
    {
      q: "Can international students use this GPA calculator?",
      a: "Yes. If your grades are given in percentages or letter equivalents, you can convert them to a 4.0 scale using this calculator. For example, an A (90-100%) equals 4.0, a B (80-89%) equals 3.0, and so on.",
    },
    {
      q: "What GPA do I need to graduate with honors?",
      a: "Graduation honors vary by institution, but generally: Cum Laude requires 3.5+, Magna Cum Laude 3.7+, and Summa Cum Laude 3.9+. Check your school’s policy to confirm thresholds for Latin honors.",
    },
    {
      q: "Can I use this calculator to predict my future GPA?",
      a: "Yes. You can add upcoming courses and estimated grades to project your potential GPA. This helps you set academic goals and plan how to reach a desired cumulative average before graduation.",
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

  // tuned for clicks, not brand
  const scholarlySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Free GPA Calculator – Weighted & Unweighted (Semester & Cumulative)",
    description:
      "Instantly calculate your GPA with weighted/unweighted options. Add semesters, set credits, and save your progress automatically. Works for high school and college.",
    citation: [
      {
        "@type": "ScholarlyArticle",
        name: "Understanding Weighted GPAs",
        author: "College Board",
        datePublished: "2022",
        url: "https://bigfuture.collegeboard.org",
      },
      {
        "@type": "ScholarlyArticle",
        name: "National Center for Education Statistics",
        author: "U.S. Department of Education",
        datePublished: "2023",
        url: "https://nces.ed.gov/",
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "All GPA Calculators",
    url: "https://allgpacalculators.com/",
  };

  // --- Main page (ALL OTHER CONTENT UNCHANGED) ---
  return (
    <main className="bg-white text-slate-700 scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b border-slate-200 shadow-sm z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold text-sky-600">
            All GPA Calculators
          </h1>
          <div className="hidden sm:flex gap-6 text-slate-700 text-sm font-medium">
            <a href="/calculators">Calculators</a>
            <a href="#calculator" onClick={(e) => scrollToId(e, "calculator")}>
              Calculator
            </a>
            <a href="#related" onClick={(e) => scrollToId(e, "related")}>
              Related Tools
            </a>
            <a href="#faq" onClick={(e) => scrollToId(e, "faq")}>
              FAQ
            </a>
            <a href="#references" onClick={(e) => scrollToId(e, "references")}>
              References
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-10 text-center bg-white">
        <h2 className="text-4xl font-bold text-slate-700 mb-4">
          GPA Calculator
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Calculate your GPA instantly across multiple semesters. Supports
          weighted, unweighted, and cumulative GPA for high school or college
          students.
        </p>
      </section>

      {/* Calculator (UNCHANGED LAYOUT; now starts with 4 preset rows + persists) */}
      <section id="calculator" className="mx-auto max-w-6xl px-6 pb-6">
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold">Your Semesters</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-700">
                Weighted
              </span>
              <button
                onClick={() => setWeightedOn((v) => !v)}
                className={`relative inline-flex h-6 w-11 rounded-full transition cursor-pointer ${
                  weightedOn ? "bg-sky-500" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                    weightedOn ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {semesters.map((sem: any) => {
              const result = computeSemesterGPA(sem, weightedOn);
              return (
                <div
                  key={sem.id}
                  className=" rounded-xl border border-slate-200 bg-[#f9fcff] p-4 sm:p-6"
                >
                  <div className="mb-4 flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <input
                        value={sem.name}
                        onChange={(e) =>
                          setSemesters((prev: any[]) =>
                            prev.map((s: any) =>
                              s.id === sem.id
                                ? { ...s, name: e.target.value }
                                : s
                            )
                          )
                        }
                        className="w-48 sm:w-64 rounded-lg border border-slate-300 px-3 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-sky-100"
                      />
                      <span className="text-base ml-2 text-slate-500 ">
                        Semester GPA:{" "}
                        <strong className="text-sky-700 ml-2 text-4xl">
                          {result.gpa.toFixed(2)}
                        </strong>
                      </span>
                    </div>

                    {semesters.length > 1 && (
                      <button
                        onClick={() => removeSemester(sem.id)}
                        className="text-sm text-slate-500 hover:text-rose-600 cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Courses */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-slate-600">
                          <th className="py-2 pr-3">Course name</th>
                          <th className="py-2 pr-3">Grade</th>
                          <th className="py-2 pr-3">Credits</th>
                          <th className="py-2 pr-3">
                            {weightedOn ? "Weight" : "Weight (disabled)"}
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {sem.courses.map((c: any) => (
                          <tr key={c.id}>
                            <td className="py-2 pr-3">
                              <input
                                value={c.name}
                                onChange={(e) =>
                                  updateCourse(sem.id, c.id, {
                                    name: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                              />
                            </td>
                            <td className="py-2 pr-3">
                              <select
                                value={c.grade}
                                onChange={(e) =>
                                  updateCourse(sem.id, c.id, {
                                    grade: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                              >
                                {Object.keys(GRADE_POINTS).map((g) => (
                                  <option key={g}>{g}</option>
                                ))}
                              </select>
                            </td>
                            <td className="py-2 pr-3">
                              <input
                                type="number"
                                min="0"
                                step="0.5"
                                value={c.credits}
                                onChange={(e) =>
                                  updateCourse(sem.id, c.id, {
                                    credits:
                                      e.target.value === ""
                                        ? ""
                                        : parseFloat(e.target.value),
                                  })
                                }
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                              />
                            </td>
                            <td className="py-2 pr-3">
                              <select
                                value={c.tier}
                                disabled={!weightedOn}
                                onChange={(e) =>
                                  updateCourse(sem.id, c.id, {
                                    tier: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 disabled:opacity-50"
                              >
                                <option value="unweighted">Unweighted</option>
                                <option value="honors">Honors (+0.5)</option>
                                <option value="apib">AP/IB (+1.0)</option>
                              </select>
                            </td>
                            <td className="py-2 pr-3">
                              {sem.courses.length > 1 && (
                                <button
                                  onClick={() => removeCourse(sem.id, c.id)}
                                  className="text-slate-500 hover:text-rose-600 text-sm"
                                >
                                  ✕
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => addCourse(sem.id)}
                      className="rounded-full border border-slate-300 px-3 py-1.5 text-sm hover:border-sky-300 hover:bg-sky-50"
                    >
                      ＋ Add Course
                    </button>

                    <div className="text-right">
                      <div className="text-xs text-slate-500">
                        Attempted Credits
                      </div>
                      <div className="text-base font-semibold">
                        {result.attempted}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col-reverse gap-8 sm:flex-row justify-between">
            <button
              onClick={addSemester}
              className="rounded-full mb-auto bg-sky-500 px-4 py-2 text-white text-sm font-semibold shadow hover:bg-sky-600"
            >
              ＋ Add Semester
            </button>

            <div className="flex items-center gap-6">
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center">
                <div className="text-sm text-slate-500">Cumulative Credits</div>
                <div className="text-6xl font-extrabold text-slate-600">
                  {cumulative.credits.toFixed(1)}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center">
                <div className="text-sm text-slate-500">Cumulative GPA</div>
                <div className="text-6xl font-extrabold text-sky-700">
                  {Number(
                    // @ts-ignore
                    cumulative.gpa || 0
                  ).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Notes: This calculator uses a standard 4.0 scale. Weighted bonuses
            (+0.5 Honors, +1.0 AP/IB) apply only when “Weighted” is enabled. GPA
            is capped at 5.0. Always confirm grading policies with your
            institution.
          </p>
        </div>
      </section>

      {/* Related Calculators Section */}
      <section id="related" className="max-w-6xl mx-auto px-6 pt-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-700">
          Explore More GPA & Study Calculators
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
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
          ].map((name) => (
            <a
              key={name}
              href="/calculators"
              className="block border border-slate-200 rounded-xl p-6 hover:shadow-md transition text-center text-slate-700 font-medium"
            >
              {name}
            </a>
          ))}
        </div>
      </section>

      {/* SEO Content Section */}
      <section
        id="learn"
        className="max-w-5xl mx-auto px-6 pt-18  border-slate-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-900">
          Understanding GPA Calculation
        </h2>
        <p className="text-slate-700 mb-4">
          Your Grade Point Average (GPA) is one of the most important indicators
          of academic performance. It summarizes years of work into a single
          number that schools, universities, and employers use to measure
          achievement and consistency. Whether you are a high school student
          planning for college admissions or a university student maintaining
          scholarship eligibility, understanding how GPA is calculated helps you
          make smarter academic choices.
        </p>
        <p className="text-slate-700 mb-4">
          Most U.S. schools use the <strong>4.0 GPA scale</strong>, where an A
          equals 4.0, a B equals 3.0, a C equals 2.0, and so on. To calculate
          your GPA, each grade is converted to grade points and multiplied by
          the number of course credits. Then, total grade points are divided by
          total attempted credits. This tool automates that process so you can
          instantly see both
          <strong>semester GPA</strong> and <strong>cumulative GPA</strong>.
        </p>

        <h3 className="text-2xl font-semibold mt-10 mb-4 text-slate-900">
          Weighted vs. Unweighted GPA Explained
        </h3>
        <p className="text-slate-700 mb-4">
          Not all GPAs are created equal. Schools often distinguish between
          <strong>weighted</strong> and <strong>unweighted</strong> GPAs to
          reflect course difficulty. An <strong>unweighted GPA</strong> uses a
          4.0 scale and treats all courses equally, whether it’s regular algebra
          or AP calculus. A <strong>weighted GPA</strong> gives students taking
          more challenging classes extra points, usually +0.5 for Honors and
          +1.0 for AP or IB courses. This means a student taking AP classes
          could have a GPA above 4.0.
        </p>
        <p className="text-slate-700 mb-4">
          Weighted GPA systems help schools fairly represent academic rigor,
          giving ambitious students credit for pushing themselves. College
          admissions officers often look at both versions to understand how
          students perform relative to the opportunities available at their
          school.
        </p>

        <h3 className="text-2xl font-semibold mt-10 mb-4 text-slate-900">
          How to Improve Your GPA Effectively
        </h3>
        <p className="text-slate-700 mb-4">
          Raising your GPA takes consistent effort, but small improvements can
          make a big difference in scholarship opportunities and acceptance
          rates. Start by identifying which classes carry the most credits or
          affect your major GPA. Focus on those first. Use this GPA calculator
          regularly to track your semester performance and predict how future
          grades could impact your cumulative GPA.
        </p>
        <ul className="list-disc ml-6 text-slate-700 mb-4">
          <li>
            <strong>Retake low-grade classes</strong> if allowed, replacing a D
            or F can significantly raise your average.
          </li>
          <li>
            <strong>Join study groups</strong> and attend office hours to
            clarify difficult topics early.
          </li>
          <li>
            <strong>Balance your course load</strong> each semester, mix
            challenging and moderate classes to avoid burnout.
          </li>
          <li>
            <strong>Stay organized</strong> with a planner or study app to track
            exams, due dates, and projects.
          </li>
          <li>
            <strong>Use academic resources</strong> such as tutoring, writing
            centers, and online GPA trackers to stay ahead.
          </li>
        </ul>
        <p className="text-slate-700 mb-4">
          Even small GPA increases, like moving from a 3.3 to a 3.5, can open
          new doors to merit-based scholarships, graduate programs, or
          internship eligibility. Regularly monitoring your GPA with this tool
          helps you stay proactive instead of reactive about your academic
          goals.
        </p>

        <h3 className="text-2xl font-semibold mt-10 mb-4 text-slate-900">
          Why GPA Matters for Scholarships, Transfers, and Admissions
        </h3>
        <p className="text-slate-700 mb-4">
          GPA plays a major role in college admissions, scholarships, and job
          prospects. Universities often set minimum GPA requirements for
          applicants, while scholarships use it as a key eligibility criterion.
          A strong GPA also helps transfer students maintain credit equivalency
          and avoid retaking similar courses at a new institution.
        </p>
        <p className="text-slate-700 mb-4">
          Beyond academics, a high GPA demonstrates qualities like discipline,
          consistency, and time management, traits valued in both college and
          professional settings. Many employers even ask for GPA on early-career
          resumes to gauge performance potential. Maintaining a high GPA not
          only helps you graduate with honors but can also strengthen your
          long-term career trajectory.
        </p>

        <h3 className="text-2xl font-semibold mt-10 mb-4 text-slate-900">
          Common GPA Calculation Mistakes (and How to Avoid Them)
        </h3>
        <p className="text-slate-700 mb-4">
          Students often miscalculate GPA by forgetting to include credit hours,
          mixing weighted and unweighted scales, or rounding incorrectly. Using
          this GPA calculator ensures your numbers are accurate and consistent
          with official academic standards. Here are common pitfalls:
        </p>
        <ul className="list-disc ml-6 text-slate-700 mb-4">
          <li>
            <strong>Ignoring course credits:</strong> Not weighting grades by
            credit hours can lead to inaccurate GPA results.
          </li>
          <li>
            <strong>Mixing scales:</strong> Combining 4.0 and 5.0 scale courses
            without conversion distorts cumulative GPA.
          </li>
          <li>
            <strong>Rounding errors:</strong> Manual calculations often round
            too early, causing small but significant discrepancies.
          </li>
          <li>
            <strong>Excluding transfer courses:</strong> Failing to include
            transfer credits lowers the accuracy of cumulative GPA.
          </li>
        </ul>
        <p className="text-slate-700 mb-4">
          To avoid these issues, always double-check your school’s grading
          policy and use this GPA calculator to standardize all entries before
          submitting academic records or scholarship forms.
        </p>

        <h3 className="text-2xl font-semibold mt-10 mb-4 text-slate-900">
          GPA Conversion, Scales, and International Use
        </h3>
        <p className="text-slate-700 mb-4">
          While the 4.0 scale is the U.S. standard, many international
          institutions use percentage systems or 10-point scales. For example,
          in Canada a 3.7 GPA might correspond to an A-, while in India or
          Europe, conversion tables map grades to equivalent 4.0 values. This
          calculator can be used globally to convert scores from one system to
          another for transcript evaluations and study abroad applications.
        </p>

        <h3 className="text-2xl font-semibold mt-10 mb-4 text-slate-900">
          Explore More Tools to Help You Succeed
        </h3>
        <p className="text-slate-700 mb-4">
          Academic success isn’t just about grades, it’s about strategy. Check
          out our related calculators like the{" "}
          <a href="/calculators" className="text-sky-600 hover:underline">
            Final Grade Calculator{" "}
          </a>
          and{" "}
          <a href="/calculators" className="text-sky-600 hover:underline">
            Study Time Planner{" "}
          </a>
          to manage your workload more effectively. Use them alongside this GPA
          calculator to build consistent study habits, plan semesters ahead, and
          stay motivated throughout your academic journey.
        </p>
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

      {/* FAQ */}
      <section id="faq" className="max-w-5xl mx-auto py-20">
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

      {/* References */}
      <section
        id="references"
        className="max-w-5xl mx-auto py-20 border-t border-slate-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-700">
          Scientific References
        </h2>
        <ul className="text-slate-600 space-y-4 text-sm">
          <li>
            <strong>U.S. Department of Education.</strong> (2023). National
            Center for Education Statistics.{" "}
            <a
              href="https://nces.ed.gov/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-sky-600 hover:underline"
            >
              https://nces.ed.gov/
            </a>
          </li>
          <li>
            <strong>College Board.</strong> (2022). Understanding Weighted GPAs.{" "}
            <a
              href="https://bigfuture.collegeboard.org"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-sky-600 hover:underline"
            >
              https://bigfuture.collegeboard.org
            </a>
          </li>
        </ul>
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

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Footer */}
      <footer className="text-center py-8 text-slate-500 text-sm border-t border-slate-200">
        © {new Date().getFullYear()} AllGpaCalculators.com • Educational
        resource for students worldwide
      </footer>
    </main>
  );
}

function scrollToId(e: React.MouseEvent, id: string) {
  e.preventDefault();
  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
}
