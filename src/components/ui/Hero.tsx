"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="relative pt-48 pb-20 sm:pt-56"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute h-[350px] w-[350px] rounded-full bg-primary opacity-20 blur-3xl transition-all duration-0 ease-out"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
            Aprende y Practica Frontend
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Mejora tus habilidades con retos de código reales. Resuelve
            problemas de HTML, CSS y JavaScript mientras construyes proyectos
            prácticos y compartes soluciones con otros desarrolladores.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all">
              Empezar
            </button>
            <button className="flex items-center gap-2 text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
              Ver Retos <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
