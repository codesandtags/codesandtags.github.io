import React from "react";
import { BookOpen, Trophy, Code2 } from "lucide-react";

const features = [
  {
    name: "Retos Interactivos",
    description:
      "Supera desafíos frontend reales, gana puntos y medallas mientras desarrollas tus habilidades en un ambiente divertido y práctico.",
    icon: Trophy,
  },
  {
    name: "Aprende en Comunidad",
    description:
      "Únete a una comunidad activa de desarrolladores frontend, comparte soluciones y aprende de las experiencias de otros.",
    icon: BookOpen,
  },
  {
    name: "Construye tu Perfil",
    description:
      "Demuestra tu progreso con un perfil personalizado que exhibe tus logros, soluciones destacadas y nivel de experiencia en diferentes tecnologías.",
    icon: Code2,
  },
];

export default function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Aprende Frontend de forma divertida
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Una plataforma colaborativa donde puedes mejorar tus habilidades
            frontend a través de retos prácticos, mientras construyes tu
            reputación en la comunidad.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7">
                  <feature.icon
                    className="h-8 w-8 text-primary"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
