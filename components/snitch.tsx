"use client";

import { useEffect, useMemo, useState } from "react";

type Point = { x: number; y: number };

type SnitchState = {
  from: Point;
  to: Point;
  duration: number;
  visible: boolean;
};

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const randomPoint = (): Point => ({
  x: randomBetween(8, 92),
  y: randomBetween(12, 88),
});

export default function Snitch() {
  const [mounted, setMounted] = useState(false);
  const [hpTheme, setHpTheme] = useState(false);
  const [state, setState] = useState<SnitchState>(() => ({
    from: randomPoint(),
    to: randomPoint(),
    duration: randomBetween(1.5, 3),
    visible: false,
  }));

  const id = useMemo(() => `snitch-${Math.random().toString(36).slice(2)}`, []);
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        x: randomBetween(-44, -6),
        y: randomBetween(-22, 22),
        size: randomBetween(1.5, 3.2),
        delay: randomBetween(0, 0.8),
        drift: randomBetween(-8, -2),
        opacity: randomBetween(0.45, 0.9),
        order: index,
      })),
    []
  );

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("hp-theme") === "on";
    setHpTheme(saved);
    document.documentElement.classList.toggle("hp-theme", saved);
    setState({
      from: randomPoint(),
      to: randomPoint(),
      duration: randomBetween(1.6, 3.2),
      visible: true,
    });
  }, []);

  useEffect(() => {
    const tick = () => {
      setState((prev) => ({
        from: prev.to,
        to: randomPoint(),
        duration: randomBetween(1.6, 3.2),
        visible: Math.random() > 0.1,
      }));
    };

    const timeout = setTimeout(tick, randomBetween(600, 1100));
    const interval = setInterval(tick, randomBetween(1200, 2000));
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const next = !hpTheme;
    setHpTheme(next);
    document.documentElement.classList.toggle("hp-theme", next);
    localStorage.setItem("hp-theme", next ? "on" : "off");
  };

  const angle =
    (Math.atan2(state.to.y - state.from.y, state.to.x - state.from.x) * 180) /
    Math.PI;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="snitch-wrap"
      style={{
        opacity: state.visible ? 1 : 0,
        left: `${state.to.x}%`,
        top: `${state.to.y}%`,
        transform: "translate(-50%, -50%)",
        transition: `left ${state.duration}s ease-in-out, top ${state.duration}s ease-in-out, opacity 0.4s ease`,
      }}
      aria-label="Toggle secret theme"
      id={id}
    >
      <div
        className="snitch-hitbox"
        style={{ opacity: state.visible ? 1 : 0.001 }}
      />
      <div
        className="snitch-particles"
        style={{
          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
        }}
      >
        {particles.map((particle, index) => (
          <span
            key={`${id}-${index}`}
            className="snitch-particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${1.1 + particle.order * 0.05}s`,
              transform: `translateX(${particle.drift}px)`,
            }}
          />
        ))}
      </div>
      <span className="snitch" aria-hidden="true" />
    </button>
  );
}
