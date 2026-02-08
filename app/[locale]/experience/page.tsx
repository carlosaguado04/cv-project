"use client";

import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const content = {
  en: {
    title: "Product Design Leadership",
    label: "Experience",
    years: "8+ years",
  },
  es: {
    title: "Liderazgo en diseño de producto",
    label: "Experiencia",
    years: "8+ años",
  },
} as const;

const experience = [
  {
    role: "Lead Product Designer",
    company: "Studio North",
    period: "2022 — Present",
    summary:
      "Guided product strategy and UX across two core platforms serving 1M+ monthly users.",
    bullets: [
      "Built a unified design system adopted by 6 teams",
      "Reduced onboarding time by 38% through workflow redesign",
      "Partnered with engineering to ship 5 major releases",
    ],
  },
  {
    role: "Senior UX Designer",
    company: "Arcadia Health",
    period: "2019 — 2022",
    summary:
      "Owned patient experience flows and service blueprints for telehealth expansion.",
    bullets: [
      "Increased booking conversion by 24%",
      "Created a research ops program covering 40+ interviews",
      "Introduced accessibility checks in CI",
    ],
  },
  {
    role: "Product Designer",
    company: "Northbridge Labs",
    period: "2016 — 2019",
    summary:
      "Led UX for B2B SaaS features across analytics and workflow automation.",
    bullets: [
      "Shipped 3 major redesigns with measurable revenue lift",
      "Collaborated with data teams on KPI dashboards",
      "Mentored two junior designers",
    ],
  },
];

export default function ExperiencePage() {
  const params = useParams();
  const locale = params?.locale === "es" ? "es" : "en";
  const t = content[locale];

  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl flex-col gap-10 px-6 pb-24 pt-16 md:px-10">
      <header className="flex flex-wrap items-center justify-between gap-4 fade-up">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t.label}
          </p>
          <h1 className="text-3xl font-semibold text-foreground md:text-5xl">
            {t.title}
          </h1>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          {t.years}
        </Badge>
      </header>

      <section className="grid gap-4">
        {experience.map((item) => (
          <Card key={item.role} className="border-border/60 bg-card/80 hover-lift glow-card">
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg text-foreground">{item.role}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {item.company} · {item.period}
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{item.summary}</p>
              <ul className="list-disc space-y-1 pl-4">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
