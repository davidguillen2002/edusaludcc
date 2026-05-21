import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { AboutTrajectory } from "@/components/AboutTrajectory";
import { Values } from "@/components/Values";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce a EduSaludCC: trayectoria, misión y los valores que guían cada programa de salud que entregamos en Ecuador.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="Salud preventiva con un equipo que escucha primero"
        description="Educación y atención con un enfoque humano, ético y profesional. Conoce la historia detrás de EduSaludCC."
      />
      <AboutTrajectory />
      <Values />
      <CTABanner
        eyebrow="Trabajemos juntos"
        title="Lleva educación preventiva a tu organización"
        description="Solicita una propuesta personalizada para charlas, programas o chequeos médicos."
      />
    </>
  );
}
