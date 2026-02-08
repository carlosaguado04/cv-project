"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";

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
  y: randomBetween(14, 86),
});

function SnitchModel() {
  const group = useRef<Group>(null);
  const gltf = useGLTF("/models/golden_snitch.glb");

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.x = Math.sin(t * 0.9) * 0.2;
      group.current.position.y = Math.sin(t * 2.2) * 0.03;
    }
  });

  return (
    <group ref={group}>
      <primitive object={gltf.scene} scale={0.65} />
      <pointLight color="#ffd36a" intensity={1.9} distance={8} />
    </group>
  );
}

useGLTF.preload("/models/golden_snitch.glb");

export default function Snitch() {
  const [mounted, setMounted] = useState(false);
  const [hpTheme, setHpTheme] = useState(false);
  const [state, setState] = useState<SnitchState>(() => ({
    from: randomPoint(),
    to: randomPoint(),
    duration: randomBetween(0.55, 1.2),
    visible: false,
  }));

  const id = useMemo(() => `snitch-${Math.random().toString(36).slice(2)}`, []);
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        x: randomBetween(-42, -6),
        y: randomBetween(-20, 20),
        size: randomBetween(1.4, 3.4),
        delay: randomBetween(0, 0.6),
        drift: randomBetween(-10, -2),
        opacity: randomBetween(0.5, 0.9),
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
      duration: randomBetween(0.55, 1.2),
      visible: true,
    });
  }, []);

  useEffect(() => {
    const tick = () => {
      setState((prev) => ({
        from: prev.to,
        to: randomPoint(),
        duration: randomBetween(0.55, 1.2),
        visible: Math.random() > 0.08,
      }));
    };

    const timeout = setTimeout(tick, randomBetween(350, 700));
    const interval = setInterval(tick, randomBetween(700, 1100));
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const toggleTheme = () => {
    const next = !hpTheme;
    setHpTheme(next);
    document.documentElement.classList.toggle("hp-theme", next);
    localStorage.setItem("hp-theme", next ? "on" : "off");
  };

  if (!mounted) {
    return null;
  }

  const angle =
    (Math.atan2(state.to.y - state.from.y, state.to.x - state.from.x) * 180) /
    Math.PI;

  return (
    <div
      className="snitch-3d-wrap"
      style={{
        opacity: state.visible ? 1 : 0,
        left: `${state.to.x}%`,
        top: `${state.to.y}%`,
        transform: "translate(-50%, -50%)",
        transition: `left ${state.duration}s linear, top ${state.duration}s linear, opacity 0.35s ease`,
      }}
      id={id}
    >
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
              animationDuration: `${0.8 + particle.order * 0.04}s`,
              transform: `translateX(${particle.drift}px)`,
            }}
          />
        ))}
      </div>
      <Canvas
        className="snitch-3d-canvas"
        camera={{ position: [0, 0, 2], fov: 38 }}
        dpr={[1, 1.6]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 3]} intensity={1.1} />
        <Suspense fallback={null}>
          <SnitchModel />
        </Suspense>
      </Canvas>
      <button
        type="button"
        aria-label="Toggle secret theme"
        className="snitch-3d-button"
        onClick={toggleTheme}
      />
    </div>
  );
}
