export type ContactConfig = {
  fullName: string; company: string; jobTitle: string; description: string;
  phone: string; phoneDisplay: string; phoneActionDisplay: string; whatsapp: string; email: string;
  instagramEcoverse: { label: string; context: string; detail?: string; url: string };
  instagramPersonal: { label: string; context: string; detail?: string; url: string };
  reviews: { label: string; context: string; detail?: string; url: string };
  officeLocation: { label: string; context: string; detail?: string; url: string };
  website: { label: string; context: string; detail?: string; displayDomain: string; url: string };
  features: { title: string; subtitle: string }[];
  productionUrl: string;
};

// Single source of truth for card content. Leave unknown values empty.
export const contact: ContactConfig = {
  fullName: "Francis Lucena",
  company: "ECOVERSE",
  jobTitle: "Ejecutiva de Ventas",
  description: "",
  phone: "+17862738717",
  phoneDisplay: "+1 (786) 273-8717",
  phoneActionDisplay: "+1 786-273-8717",
  whatsapp: "https://wa.me/17862738717",
  email: "",
  instagramEcoverse: {
    label: "Instagram ECOVERSE",
    context: "@ecoverseusa",
    url: "https://www.instagram.com/ecoverseusa?igsi=MmZ5ajMwbTY4d2R3",
  },
  instagramPersonal: {
    label: "Aqua Friendly Water",
    context: "@AquaFriendly.water",
    detail: "Educación y contenido sobre agua",
    url: "https://www.instagram.com/aquafriendly.water?igsi=b3JqdXp2YnAzdTFo",
  },
  reviews: {
    label: "Reseñas en Google",
    context: "Conoce la experiencia de nuestros clientes",
    url: "https://maps.app.goo.gl/LiujNRYbod8yVGJH6?g_st=com.google.maps.preview.copy",
  },
  officeLocation: {
    label: "Oficina Miami",
    context: "Abrir en Google Maps",
    url: "https://maps.app.goo.gl/Mao8tzhUoP7uYgKF6?g_st=iwb",
  },
  website: {
    label: "Sitio oficial ECOVERSE",
    context: "Conoce nuestros productos",
    displayDomain: "ecoverseusa.com",
    url: "https://www.ecoverseusa.com",
  },
  features: [
    { title: "Agua alcalina", subtitle: "pH 10.5" },
    { title: "Tecnología", subtitle: "De calidad" },
    { title: "Salud y bienestar", subtitle: "Para tu hogar" },
    { title: "Sostenible", subtitle: "Y ecológico" },
  ],
  productionUrl: process.env.NEXT_PUBLIC_CARD_URL ?? "",
};
