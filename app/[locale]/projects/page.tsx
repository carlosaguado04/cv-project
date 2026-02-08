"use client";

import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const content = {
  en: {
    label: "Projects",
    title: "Selected Work",
    intro:
      "A focused set of case studies highlighting product strategy, systems, and collaboration.",
  },
  es: {
    label: "Proyectos",
    title: "Trabajo destacado",
    intro:
      "Un conjunto de casos que destacan estrategia de producto, sistemas y colaboración.",
  },
} as const;

const projects = [
  {
    name: "Atlas Analytics",
    description:
      "A modular analytics dashboard for real-time operational visibility.",
    tags: ["Product", "Design System", "B2B SaaS"],
  },
  {
    name: "Pulse Mobile",
    description:
      "A mobile companion app for clinicians with offline-first workflows.",
    tags: ["Mobile", "Healthcare", "UX Research"],
  },
  {
    name: "Drift Studio",
    description:
      "Brand refresh and multi-channel marketing site for a creative agency.",
    tags: ["Brand", "Web", "Visual Identity"],
  },
  {
    name: "Signal Ops",
    description:
      "Operations command center for incident response and real-time alerts.",
    tags: ["Ops", "Systems", "Design"],
  },
];

export default function ProjectsPage() {
  const params = useParams();
  const locale = params?.locale === "es" ? "es" : "en";
  const t = content[locale];

  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl flex-col gap-10 px-6 pb-24 pt-16 md:px-10">
      <header className="space-y-3 fade-up">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {t.label}
        </p>
        <h1 className="text-3xl font-semibold text-foreground md:text-5xl">
          {t.title}
        </h1>
        <p className="max-w-2xl font-serif text-lg text-muted-foreground">
          {t.intro}
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Card
            key={project.name}
            className="border-border/60 bg-card/80 transition hover:border-border hover-lift glow-card"
          >
            <CardHeader className="space-y-2">
              <CardTitle className="text-lg text-foreground">{project.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-border/60">
                  {tag}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
