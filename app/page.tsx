import { Hero } from "@/components/Hero";
import { SpecialtyMarquee } from "@/components/SpecialtyMarquee";
import { BentoServices } from "@/components/BentoServices";
import { WhyChoose } from "@/components/WhyChoose";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SpecialtyMarquee />
      <BentoServices />
      <WhyChoose />
      <FAQ />
      <ContactForm />
    </>
  );
}
