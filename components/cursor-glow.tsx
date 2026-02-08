"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const next = { x: event.clientX, y: event.clientY, visible: true };
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => setCursor(next));
    };

    const handleLeave = () => {
      setCursor((prev) => ({ ...prev, visible: false }));
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
      style={{
        opacity: cursor.visible ? 1 : 0,
        background: `radial-gradient(420px circle at ${cursor.x}px ${cursor.y}px, var(--cursor-glow), transparent 55%)`,
      }}
    />
  );
}
