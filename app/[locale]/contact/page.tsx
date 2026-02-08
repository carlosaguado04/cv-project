"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const content = {
  en: {
    label: "Contact",
    title: "Let's build your next product.",
    intro:
      "Reach out for product design leadership, workshops, or advisory support.",
    touch: "Get in Touch",
    details: "Details",
    availability:
      "I'm currently open to leadership roles and strategic engagements.",
    email: "Email",
    location: "Location",
    social: "Social",
  },
  es: {
    label: "Contacto",
    title: "Construyamos tu próximo producto.",
    intro:
      "Escríbeme para liderazgo en diseño de producto, talleres o asesoría estratégica.",
    touch: "Hablemos",
    details: "Detalles",
    availability:
      "Actualmente estoy abierto a roles de liderazgo y colaboraciones estratégicas.",
    email: "Correo",
    location: "Ubicación",
    social: "Redes",
  },
} as const;

export default function ContactPage() {
  const params = useParams();
  const locale = params?.locale === "es" ? "es" : "en";
  const t = content[locale];

  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-16 md:px-10">
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

      <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border/60 bg-card/80 hover-lift glow-card">
          <CardHeader>
            <CardTitle className="text-foreground">{t.touch}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>{t.availability}</p>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full">hello@yourname.com</Button>
              <Button variant="outline" className="rounded-full">
                calendly.com/yourname
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/80 hover-lift glow-card">
          <CardHeader>
            <CardTitle className="text-foreground">{t.details}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t.email}
              </p>
              <p>hello@yourname.com</p>
            </div>
            <Separator className="bg-border" />
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t.location}
              </p>
              <p>New York, NY · Remote</p>
            </div>
            <Separator className="bg-border" />
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t.social}
              </p>
              <p>linkedin.com/in/yourname</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
