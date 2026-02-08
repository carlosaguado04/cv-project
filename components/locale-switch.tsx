"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const locales = ["en", "es"] as const;

type Locale = (typeof locales)[number];

export default function LocaleSwitch() {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);
  const current = locales.includes(segments[0] as Locale)
    ? (segments[0] as Locale)
    : "en";
  const next: Locale = current === "en" ? "es" : "en";
  const rest = locales.includes(segments[0] as Locale)
    ? segments.slice(1)
    : segments;
  const target = `/${[next, ...rest].join("/")}`;

  return (
    <Link
      href={target}
      className="rounded-full border border-border/60 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition hover:text-foreground"
      aria-label="Switch language"
    >
      {next.toUpperCase()}
    </Link>
  );
}
