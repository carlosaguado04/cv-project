"use client";

import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const content = {
  en: {
    title: "Profile",
    intro:
      "Crafting high-impact digital experiences for teams that care about clarity, performance, and elegant execution. I translate complex requirements into calm, intuitive interfaces and scalable systems.",
    education: "Education",
    focus: "Focus",
    focusBody: [
      "Product design, UX strategy, and design ops for teams scaling from 0→1 and 1→10.",
      "Deeply collaborative, research-driven, and practical about shipping.",
    ],
    certificates: "Certificates",
    certValue: "Design Leadership · Google UX · Accessibility",
    skillsTitle: "Core Skills",
    toolsTitle: "Tools",
  },
  es: {
    title: "Perfil",
    intro:
      "Creo experiencias digitales de alto impacto para equipos que valoran claridad, rendimiento y ejecución elegante. Traduzco requisitos complejos en interfaces intuitivas y sistemas escalables.",
    education: "Formación",
    focus: "Enfoque",
    focusBody: [
      "Diseño de producto, estrategia UX y design ops para equipos que escalan de 0→1 y 1→10.",
      "Muy colaborativo, basado en investigación y orientado a resultados.",
    ],
    certificates: "Certificados",
    certValue: "Liderazgo en diseño · Google UX · Accesibilidad",
    skillsTitle: "Habilidades",
    toolsTitle: "Herramientas",
  },
} as const;

const skills = [
  "Product Strategy",
  "Design Systems",
  "UX Research",
  "Prototyping",
  "Figma",
  "Framer",
  "HTML/CSS",
  "React",
  "Leadership",
];

const tools = ["Figma", "Notion", "Linear", "FigJam", "After Effects", "Spline"];

export default function AboutPage() {
  const params = useParams();
  const locale = params?.locale === "es" ? "es" : "en";
  const t = content[locale];

  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-16 md:px-10">
      <header className="space-y-4 fade-up">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {t.title}
        </p>
        <h1 className="text-3xl font-semibold text-foreground md:text-5xl">
          {t.title}
        </h1>
        <p className="max-w-3xl font-serif text-lg text-muted-foreground">
          {t.intro}
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border/60 bg-card/80 hover-lift glow-card">
          <CardHeader>
            <CardTitle className="text-foreground">{t.education}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm text-muted-foreground">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                2015 — 2019
              </p>
              <p className="text-lg text-foreground">BFA, Interaction Design</p>
              <p>Rhode Island School of Design</p>
            </div>
            <Separator className="bg-border" />
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t.certificates}
              </p>
              <p>{t.certValue}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/80 hover-lift glow-card">
          <CardHeader>
            <CardTitle className="text-foreground">{t.focus}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            {t.focusBody.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/60 bg-card/80 hover-lift glow-card">
          <CardHeader>
            <CardTitle className="text-foreground">{t.skillsTitle}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1">
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/80 hover-lift glow-card">
          <CardHeader>
            <CardTitle className="text-foreground">{t.toolsTitle}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <Badge key={tool} variant="outline" className="border-border/60">
                {tool}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
