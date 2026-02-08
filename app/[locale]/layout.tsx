import CursorGlow from "@/components/cursor-glow";
import LocaleNav from "@/components/locale-nav";
import Snitch from "@/components/snitch";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export default function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <CursorGlow />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.12),_transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] hallows hp-watermark" />
      <Snitch />
      <header className="relative z-10 border-b border-border/60">
        <LocaleNav />
      </header>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
