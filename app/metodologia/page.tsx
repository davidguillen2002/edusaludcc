import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Methodology } from "@/components/Methodology";
import { QuoteBlock } from "@/components/QuoteBlock";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Metodología",
  description:
    "Conoce el proceso paso a paso de EduSaludCC: evaluación, diseño, ejecución y seguimiento con resultados medibles.",
};

export default function MetodologiaPage() {
  return (
    <>
      <PageHero
        eyebrow="Metodología"
        title="Un proceso probado para resultados reales"
        description="Cuatro pasos diseñados para garantizar rigor científico, claridad operativa y continuidad del bienestar."
      />
      <Methodology />
      <QuoteBlock />
      <CTABanner
        eyebrow="Próximo paso"
        title="Lleva la salud a tu organización hoy mismo"
        description="Solicita una propuesta personalizada que se adapte perfectamente a las necesidades de educación y prevención de tu institución."
        ctaLabel="Solicitar propuesta"
      />
    </>
  );
}
