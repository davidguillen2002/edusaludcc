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

/**
 * Imagery — self-hosted from `public/img/edusaludcc/`.
 *
 * Real photos of EduSaludCC talks, programmes and educational
 * materials in Ecuadorian institutions. Provided by the brand
 * directly (WhatsApp media batch) and renamed to descriptive
 * slugs so the intent at each slot is obvious from the URL.
 */
export const heroImage = {
  src: "/img/edusaludcc/hero-nutricion-adolescente.jpg",
  alt: "Estudiantes ecuatorianos en una charla de EduSaludCC sobre nutrición adolescente",
};

export const aboutImages = {
  trajectory: {
    src: "/img/edusaludcc/about-grupo-diplomas.jpg",
    alt: "Grupo de estudiantes recibiendo diplomas tras un programa de EduSaludCC",
  },
  values: {
    src: "/img/edusaludcc/values-estudiantes-presentando.jpg",
    alt: "Estudiantes participando activamente en una charla de salud reproductiva",
  },
};

export const servicesPageImages = {
  programs: {
    src: "/img/edusaludcc/programs-alimentacion-saludable.jpg",
    alt: "Programa de alimentación saludable de EduSaludCC con materiales didácticos",
  },
  checkups: {
    src: "/img/edusaludcc/checkups-planificacion-familiar.jpg",
    alt: "Charla de planificación familiar en una institución educativa de Ecuador",
  },
  talks: {
    src: "/img/edusaludcc/talks-charla-presentador.jpg",
    alt: "Profesional de EduSaludCC impartiendo una charla personalizada en aula",
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
      src: "/img/edusaludcc/bento-charlas-aula.jpg",
      alt: "Charla de EduSaludCC en aula con estudiantes ecuatorianos",
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
      src: "/img/edusaludcc/bento-programas-materiales.jpg",
      alt: "Materiales didácticos de un programa institucional de EduSaludCC",
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
      src: "/img/edusaludcc/bento-chequeos-anatomia.jpg",
      alt: "Charla de anatomía y fisiología impartida por EduSaludCC",
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
      src: "/img/edusaludcc/bento-bienestar-plato.jpg",
      alt: "Plato pedagógico nutricional usado en talleres de EduSaludCC",
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

/* ------------------------------------------------------------------ */
/* MARQUEE — health topics ticker                                     */
/* ------------------------------------------------------------------ */

export const marqueeTopics = [
  "Manejo del estrés",
  "Nutrición consciente",
  "Ergonomía laboral",
  "Salud cardiovascular",
  "Higiene del sueño",
  "Bienestar emocional",
  "Prevención de enfermedades crónicas",
  "Actividad física",
  "Salud mental",
  "Detección temprana",
  "Hábitos sostenibles",
  "Vacunación al día",
];

/**
 * Words rotated in the hero headline.
 * They MUST be feminine singular subjects that read naturally before
 * "que cuida" — e.g. "Educación que cuida", "Empatía que cuida".
 */
export const rotatingHeroWords = [
  "Educación",
  "Prevención",
  "Evidencia",
  "Empatía",
  "Ciencia",
  "Constancia",
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: "¿Cómo personalizan los programas según mi institución?",
    a: "Comenzamos con una evaluación inicial gratuita. Mapeamos perfiles de tu equipo, riesgos prioritarios y objetivos. Sobre eso diseñamos el contenido, formato y métricas de cada intervención.",
  },
  {
    q: "¿Qué evidencia clínica respalda sus charlas y programas?",
    a: "Trabajamos con guías de la OMS, Ministerio de Salud Pública del Ecuador y consensos clínicos vigentes. Cada material es revisado por médicos colegiados y se actualiza al menos una vez al año.",
  },
  {
    q: "¿Dónde atienden? ¿Solo en Quito?",
    a: "Nuestra base está en Quito, pero ofrecemos atención presencial en todo Pichincha y modalidad virtual o híbrida para cualquier provincia del Ecuador.",
  },
  {
    q: "¿Cuánto tiempo dura un programa típico?",
    a: "Las charlas son sesiones de 45 a 90 minutos. Los programas institucionales suelen durar entre 4 y 12 semanas, con encuentros periódicos y un informe final de impacto.",
  },
  {
    q: "¿Cómo miden el impacto de un programa?",
    a: "Antes y después del programa aplicamos encuestas de conocimiento, escalas validadas (estrés, bienestar) y, cuando aplica, indicadores clínicos. Entregamos un dashboard con resultados comparativos.",
  },
  {
    q: "¿Trabajan con empresas pequeñas o solo grandes?",
    a: "Trabajamos con organizaciones de cualquier tamaño — desde equipos de 5 personas hasta corporativos con cientos de colaboradores. Adaptamos el alcance y el presupuesto.",
  },
];
