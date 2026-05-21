import type { Metadata, Viewport } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import "./globals.css";

// Healthcare-grade typography combo (per UI/UX skill recommendation).
// Lexend is engineered for reading proficiency; Source Sans 3 is the
// long-form workhorse — together they hit WCAG-friendly contrast and
// legibility without feeling clinical.
const display = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.edusaludcc.com"),
  title: {
    default: "EduSaludCC · Educar para una salud integral",
    template: "%s · EduSaludCC",
  },
  description:
    "Educación médica preventiva, charlas personalizadas y programas institucionales en Quito, Ecuador. Transformamos la salud a través de la educación.",
  keywords: [
    "EduSaludCC",
    "salud preventiva",
    "educación médica",
    "charlas en salud",
    "programas de salud institucional",
    "chequeos médicos preventivos",
    "Quito Ecuador",
  ],
  authors: [{ name: "EduSaludCC" }],
  openGraph: {
    title: "EduSaludCC · Educar para una salud integral",
    description:
      "Charlas personalizadas, programas institucionales y chequeos preventivos para tu organización.",
    type: "website",
    locale: "es_EC",
    siteName: "EduSaludCC",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1d4ed8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen antialiased">
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
