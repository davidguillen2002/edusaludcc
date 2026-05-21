import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Programas de educación integral, chequeos médicos preventivos y charlas personalizadas en salud para tu organización.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Educación, prevención y atención médica a medida"
        description="Diseñamos, proponemos e implementamos soluciones que se adaptan a las necesidades de cada institución."
      />
      <ServicesShowcase />
      <CTABanner
        title="Solicita información"
        description="Cuéntanos qué necesita tu organización y te enviaremos una propuesta personalizada."
      />
    </>
  );
}
