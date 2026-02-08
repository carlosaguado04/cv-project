"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LocaleSwitch from "@/components/locale-switch";
import ThemeToggle from "@/components/theme-toggle";

const navItems = {
  en: [
    { href: "", label: "Home" },
    { href: "about", label: "About" },
    { href: "experience", label: "Experience" },
    { href: "projects", label: "Projects" },
    { href: "contact", label: "Contact" },
  ],
  es: [
    { href: "", label: "Inicio" },
    { href: "about", label: "Perfil" },
    { href: "experience", label: "Experiencia" },
    { href: "projects", label: "Proyectos" },
    { href: "contact", label: "Contacto" },
  ],
} as const;

export default function LocaleNav() {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] === "es" ? "es" : "en";
  const items = navItems[locale];

  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-10">
      <Link
        href={`/${locale}`}
        className="text-sm uppercase tracking-[0.35em] text-muted-foreground"
      >
        Your Name
      </Link>
      <div className="flex flex-wrap items-center gap-5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {items.map((item) => (
          <Link
            key={item.href || "home"}
            href={`/${locale}/${item.href}`.replace(/\/$/, "")}
            className="transition hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
        <LocaleSwitch />
        <ThemeToggle />
      </div>
    </nav>
  );
}
