"use client";

import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const content = {
  en: {
    role: "Designer + Product Strategist",
    headline: "Your Name",
    intro:
      "Building thoughtful digital products at the intersection of strategy, design systems, and calm execution.",
    highlights: [
      "12+ shipped products",
      "Design systems + frontend architecture",
      "Cross-functional leadership",
    ],
    ctaPrimary: "Download CV",
    ctaSecondary: "Contact Me",
    glance: "At a Glance",
    location: "Location",
    locationValue: "New York, NY · Remote",
    focus: "Focus",
    focusValue: "Product design, UX strategy, design ops",
    availability: "Availability",
    availabilityValue: "Open to product design leadership roles",
  },
  es: {
    role: "Diseñador + Estratega de Producto",
    headline: "Tu Nombre",
    intro:
      "Construyo productos digitales con impacto en la intersección de estrategia, sistemas de diseño y ejecución serena.",
    highlights: [
      "12+ productos lanzados",
      "Sistemas de diseño + arquitectura frontend",
      "Liderazgo multifuncional",
    ],
    ctaPrimary: "Descargar CV",
    ctaSecondary: "Contactar",
    glance: "Resumen",
    location: "Ubicación",
    locationValue: "Nueva York, NY · Remoto",
    focus: "Enfoque",
    focusValue: "Diseño de producto, estrategia UX, design ops",
    availability: "Disponibilidad",
    availabilityValue: "Abierto a roles de liderazgo en diseño de producto",
  },
} as const;

export default function Home() {
  const params = useParams();
  const locale = params?.locale === "es" ? "es" : "en";
  const t = content[locale];

  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl flex-col justify-center gap-16 px-6 pb-24 pt-20 md:px-10">
      <header className="grid gap-10 md:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col gap-6 fade-up">
          <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            <span>CV</span>
            <Separator orientation="vertical" className="h-4 bg-border" />
            <span>{t.role}</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              {t.headline}
            </h1>
            <p className="max-w-xl font-serif text-lg leading-8 text-muted-foreground md:text-xl">
              {t.intro}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {t.highlights.map((item) => (
              <Badge key={item} variant="secondary" className="px-4 py-1">
                {item}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-full">{t.ctaPrimary}</Button>
            <Button variant="outline" className="rounded-full">
              {t.ctaSecondary}
            </Button>
          </div>
        </div>

        <Card className="border-border/60 bg-card/80 backdrop-blur sheen hover-lift glow-card">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">{t.glance}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm text-muted-foreground">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t.location}
              </p>
              <p>{t.locationValue}</p>
            </div>
            <Separator className="bg-border" />
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t.focus}
              </p>
              <p>{t.focusValue}</p>
            </div>
            <Separator className="bg-border" />
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t.availability}
              </p>
              <p>{t.availabilityValue}</p>
            </div>
          </CardContent>
        </Card>
      </header>
    </main>
  );
}
