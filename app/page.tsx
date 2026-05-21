import { Hero } from "@/components/Hero";
import { BentoServices } from "@/components/BentoServices";
import { WhyChoose } from "@/components/WhyChoose";
import { ContactForm } from "@/components/ContactForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BentoServices />
      <WhyChoose />
      <ContactForm />
    </>
  );
}
