/**
 * EduSaludCC — single source of truth.
 *
 * Re-skin for another client by replacing this file (or feeding it
 * from a CMS). Components consume these structures via imports —
 * no copy is hard-coded inside section components.
 */

export const siteConfig = {
  name: "EduSaludCC",
  legalName: "EduSaludCC",
  tagline: "Educar para una salud integral",
  description:
    "Educación médica preventiva, charlas personalizadas y programas institucionales en Quito, Ecuador.",
  url: "https://www.edusaludcc.com",
  contact: {
    email: "edusaludcc@outlook.com",
    phone: "+593 98 332 1039",
    phoneRaw: "593983321039",
    location: "Quito, Pichincha, Ecuador",
  },
  socials: {
    instagram:
      "https://www.instagram.com/edusaludcc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D",
    whatsapp: "https://api.whatsapp.com/send?phone=593983321039",
  },
  quoteSignature: {
    text: "La educación y acciones en salud, es el pilar fundamental para el desarrollo del bienestar humano que todo miembro de una buena organización merece.",
    author: "EduSaludCC",
  },
};

export const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Metodología", href: "/metodologia" },
];

/** Curated Unsplash photo IDs — verified, royalty-free. */
export const heroImage = {
  src: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=1600&q=80",
  alt: "Profesional de la salud orientando a un paciente con un plan preventivo",
};

export const aboutImages = {
  trajectory: {
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1400&q=80",
    alt: "Profesional de la salud en consulta personalizada",
  },
  values: {
    src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=80",
    alt: "Conversación humana entre médico y paciente",
  },
};

export const servicesPageImages = {
  programs: {
    src: "https://images.unsplash.com/photo-1591084728795-1149f32d9866?auto=format&fit=crop&w=1400&q=80",
    alt: "Taller de educación en salud para una institución",
  },
  checkups: {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80",
    alt: "Chequeo médico preventivo a un colaborador",
  },
  talks: {
    src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1400&q=80",
    alt: "Charla en vivo de salud personalizada",
  },
};

/* ------------------------------------------------------------------ */
/* HOME — Services bento                                              */
/* ------------------------------------------------------------------ */

export const services = [
  {
    slug: "charlas",
    title: "Charlas Personalizadas",
    summary:
      "Sesiones individuales sobre cualquier tema de salud que tu organización necesite.",
    description:
      "Espacios seguros y profesionales donde abordamos manejo del estrés, nutrición, ergonomía, prevención de enfermedades crónicas y mucho más.",
    image: {
      src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
      alt: "Profesional impartiendo una charla de salud",
    },
  },
  {
    slug: "programas",
    title: "Programas de Salud",
    summary:
      "Diseño, ejecución y evaluación de programas a medida con resultados de verdadero impacto.",
    description:
      "Construimos rutas educativas completas para instituciones, con métricas claras y un informe final de aprendizaje.",
    image: {
      src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
      alt: "Equipo institucional en programa de salud",
    },
  },
  {
    slug: "chequeos",
    title: "Chequeos Médicos",
    summary:
      "Protocolos preventivos que identifican riesgos tempranos y protegen a tu personal.",
    description:
      "Evaluaciones clínicas avanzadas combinadas con educación preventiva personalizada para cada colaborador.",
    image: {
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
      alt: "Médico realizando un chequeo preventivo",
    },
  },
  {
    slug: "bienestar",
    title: "Bienestar Personal",
    summary:
      "Conocimiento práctico para tomar decisiones saludables y prevenir enfermedades crónicas.",
    description:
      "Workshops, hábitos y herramientas que tu equipo puede aplicar desde el lunes siguiente.",
    image: {
      src: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80",
      alt: "Persona caminando saludablemente al aire libre",
    },
  },
] as const;

/* ------------------------------------------------------------------ */
/* HOME — Why choose us                                               */
/* ------------------------------------------------------------------ */

export const whyChoose = [
  {
    title: "Eficiencia laboral",
    description:
      "Reducimos la ausencia por enfermedad y mejoramos la productividad con programas preventivos medibles.",
    metric: "−38%",
    metricLabel: "ausentismo proyectado",
    icon: "trending-up" as const,
  },
  {
    title: "Salud preventiva",
    description:
      "Educamos antes de que el deterioro sea crítico. La prevención es el pilar fundamental de un bienestar duradero.",
    metric: "12+",
    metricLabel: "ejes preventivos activos",
    icon: "shield-check" as const,
  },
  {
    title: "Gestión integral",
    description:
      "Desarrollamos programas que adaptan la educación a las necesidades reales de tu organización.",
    metric: "100%",
    metricLabel: "diseño a medida",
    icon: "layers" as const,
  },
];

/* ------------------------------------------------------------------ */
/* NOSOTROS                                                           */
/* ------------------------------------------------------------------ */

export const values = [
  {
    title: "Compromiso con la salud",
    description:
      "Entendemos que la prevención es el pilar fundamental para una vida plena y activa.",
    icon: "heart-pulse" as const,
  },
  {
    title: "Formación personalizada",
    description:
      "Desarrollamos soluciones educativas adaptadas a las necesidades específicas de cada institución.",
    icon: "graduation-cap" as const,
  },
  {
    title: "Ética profesional",
    description:
      "Nuestra labor se basa en la transparencia, la integridad y el respeto absoluto por el paciente.",
    icon: "scale" as const,
  },
];

/* ------------------------------------------------------------------ */
/* SERVICIOS (detalle)                                                */
/* ------------------------------------------------------------------ */

export const programBullets = [
  "Charlas personalizadas de prevención y educación en salud",
  "Programas de desarrollo de competencias en salud institucionales",
  "Workshops de bienestar emocional y mental",
  "Informe final con resultados de aprendizaje y oportunidades de mejora",
];

export const suggestedTopics = [
  "Manejo integral del estrés",
  "Nutrición y alimentación saludable",
  "Salud y ergonomía laboral",
  "Prevención de enfermedades crónicas",
  "Higiene del sueño y descanso",
  "Salud cardiovascular y actividad física",
];

/* ------------------------------------------------------------------ */
/* METODOLOGÍA                                                        */
/* ------------------------------------------------------------------ */

export const methodologySteps = [
  {
    step: "01",
    title: "Evaluación inicial",
    description:
      "Analizamos las necesidades específicas de tu organización para diseñar una propuesta a medida.",
    icon: "search" as const,
  },
  {
    step: "02",
    title: "Planificación y diseño",
    description:
      "Desarrollamos y organizamos el contenido educativo con rigor médico y profesionalismo.",
    icon: "compass" as const,
  },
  {
    step: "03",
    title: "Ejecución del servicio",
    description:
      "Implementamos charlas, programas o chequeos con metodologías dinámicas y evidencia científica.",
    icon: "play-circle" as const,
  },
  {
    step: "04",
    title: "Seguimiento y resultados",
    description:
      "Entregamos reportes de impacto y recomendaciones finales para garantizar la continuidad del bienestar.",
    icon: "line-chart" as const,
  },
];

export const consultationTypes = [
  "Charlas personalizadas",
  "Programas institucionales",
  "Chequeos médicos",
];
