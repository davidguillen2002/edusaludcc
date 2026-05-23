"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={siteConfig.socials.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-mint-500 text-white shadow-elevated transition-shadow hover:shadow-glow"
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-mint-500/40"
      />
      <MessageCircle className="h-6 w-6" strokeWidth={2.2} />
    </motion.a>
  );
}
