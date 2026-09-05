import { resolveProfileUrl, type CardContact } from "../lib/card-profile";

export const josePath = "/jose-noguera";
const profileUrl = resolveProfileUrl(
  josePath,
  process.env.NEXT_PUBLIC_JOSE_CARD_URL,
  process.env.NEXT_PUBLIC_CARD_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined,
);

export type Testimonial = { image: string; quote?: string; name?: string; context?: string; rating?: number };
export type PortfolioItem = { image: string; category: string; title: string; description: string; location?: string; date?: string };
export type JoseContact = CardContact & {
  phoneDisplay: string; phoneActionDisplay: string; whatsapp: string; socialLinks: { label: string; url: string }[];
  biography: string; portrait: string; alternatePortrait: string; testimonials: Testimonial[]; portfolio: PortfolioItem[];
  instagramEcoverse: { label: string; context: string; url: string };
  instagramPersonal: { label: string; context: string; url: string };
  reviews: { label: string; context: string; url: string };
};

export const joseOfficeAddress = "1515 Butterfield Rd\nOffice 101\nAurora, IL 60502\nUnited States";
export const joseOfficeDisplay = "1515 Butterfield Rd · Ofi. 101 · Aurora, IL";
export const joseOfficeMapUrl = "https://www.google.com/maps/search/?api=1&query=1515%20Butterfield%20Rd%2C%20Office%20101%2C%20Aurora%2C%20IL%2060502%2C%20United%20States";
const testimonialCopy = [
  "Muy buena atención y explicación durante todo el proceso. Me gustó conocer mejor la propuesta de ECOVERSE y sus beneficios para el hogar.",
  "Recibí una atención profesional y clara. La información fue fácil de entender y me dejó una muy buena impresión del sistema.",
  "La presentación del producto fue excelente. Me ayudó a comprender mejor cómo esta tecnología puede aportar valor en casa.",
  "Me gustó mucho la forma en que explicaron el sistema y sus beneficios. Se nota profesionalismo y compromiso en cada detalle.",
  "La atención fue amable y muy profesional. Quedé con una mejor visión sobre las soluciones que ofrece ECOVERSE.",
  "Fue una experiencia positiva y cercana. Agradezco la orientación y la forma tan clara en que presentaron la información.",
  "Me sentí bien atendido y con mayor confianza al conocer más sobre el sistema y sus beneficios para el bienestar en el hogar.",
  "La demostración fue muy útil y fácil de comprender. Se nota la dedicación y el interés por brindar una buena experiencia.",
  "Me gustó mucho conocer el equipo ya instalado y ver una solución real. La atención fue muy buena y profesional.",
];
const testimonialImages = [
  "WhatsApp Image 2026-09-05 at 1.34.12 PM (5).jpeg",
  "WhatsApp Image 2026-09-05 at 1.34.12 PM (6).jpeg",
  "WhatsApp Image 2026-09-05 at 1.34.13 PM (1).jpeg",
  "WhatsApp Image 2026-09-05 at 1.34.13 PM (2).jpeg",
  "WhatsApp Image 2026-09-05 at 1.34.13 PM (3).jpeg",
  "WhatsApp Image 2026-09-05 at 1.34.13 PM (4).jpeg",
  "WhatsApp Image 2026-09-05 at 1.34.13 PM (5).jpeg",
  "WhatsApp Image 2026-09-05 at 1.34.13 PM (6).jpeg",
  "WhatsApp Image 2026-09-05 at 1.34.13 PM.jpeg",
];
const testimonials: Testimonial[] = testimonialImages.map((image, index) => ({
  image: `/jose-noguera/testimonials/${image}`,
  quote: testimonialCopy[index],
  name: "Cliente ECOVERSE",
  context: "Experiencia compartida",
}));
const portfolio: PortfolioItem[] = [
  {
    image: "/jose-noguera/profile/WhatsApp Image 2026-09-05 at 1.34.11 PM.jpeg",
    category: "RECONOCIMIENTO",
    title: "Premio Líder Internacional",
    description: "Reconocimiento recibido por José Noguera en un evento internacional de liderazgo, destacando su trayectoria profesional.",
  },
  {
    image: "/jose-noguera/profile/WhatsApp Image 2026-09-05 at 1.34.12 PM (1).jpeg",
    category: "TRAYECTORIA",
    title: "Presencia en Nueva York",
    description: "Una imagen que refleja parte de la trayectoria personal y profesional de José, construida a través de experiencias, crecimiento y representación.",
    location: "Nueva York",
  },
  {
    image: "/jose-noguera/profile/WhatsApp Image 2026-09-05 at 1.34.12 PM (2).jpeg",
    category: "TRAYECTORIA",
    title: "Experiencia en Nueva York",
    description: "Un momento personal que forma parte de las experiencias y perspectivas que acompañan la trayectoria de José.",
    location: "Nueva York",
  },
  {
    image: "/jose-noguera/profile/WhatsApp Image 2026-09-05 at 1.34.12 PM (3).jpeg",
    category: "EVENTO PROFESIONAL",
    title: "Encuentro Internacional de Mentes Maestras",
    description: "Participación en un espacio de liderazgo, networking y desarrollo profesional.",
  },
  {
    image: "/jose-noguera/profile/WhatsApp Image 2026-09-05 at 1.34.12 PM (4).jpeg",
    category: "TRAYECTORIA",
    title: "Experiencia en Nueva York",
    description: "Una experiencia de viaje y representación que forma parte de la historia profesional y personal de José.",
    location: "Nueva York",
  },
  {
    image: "/jose-noguera/profile/WhatsApp Image 2026-09-05 at 1.34.12 PM.jpeg",
    category: "EVENTO PROFESIONAL",
    title: "Presencia en encuentro profesional",
    description: "Participación en un entorno de encuentro, aprendizaje y conexión profesional.",
  },
];

// Independent data: never spread Francis's configuration into this profile.
export const joseContact: JoseContact = {
  slug: "jose-noguera",
  fullName: "José Noguera",
  company: "ECOVERSE",
  jobTitle: "Regional Manager",
  phone: "+17086554060",
  phoneDisplay: "+1 (708) 655-4060",
  phoneActionDisplay: "+1 708-655-4060",
  whatsapp: "https://wa.me/17086554060",
  email: "",
  address: joseOfficeAddress,
  socialLinks: [],
  biography: "",
  portrait: "/jose-noguera/profile/WhatsApp Image 2026-09-05 at 1.34.11 PM.jpeg",
  alternatePortrait: "/jose-noguera/profile/WhatsApp Image 2026-09-05 at 1.34.12 PM (1).jpeg",
  testimonials,
  portfolio,
  instagramEcoverse: {
    label: "Instagram ECOVERSE",
    context: "@ecoverseusa",
    url: "https://www.instagram.com/ecoverseusa?igsi=MmZ5ajMwbTY4d2R3",
  },
  instagramPersonal: {
    label: "Instagram José Noguera",
    context: "@noguerajoseito",
    url: "https://www.instagram.com/noguerajoseito?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
  },
  reviews: {
    label: "Reseñas en Google",
    context: "Conoce la experiencia de nuestros clientes",
    url: "https://maps.app.goo.gl/LiujNRYbod8yVGJH6?g_st=com.google.maps.preview.copy",
  },
  website: {
    label: "Sitio oficial ECOVERSE",
    context: "Conoce ECOVERSE",
    displayDomain: "ecoverseusa.com",
    url: "https://www.ecoverseusa.com",
  },
  productionUrl: profileUrl,
  profileUrl,
};
