import { contact, type ContactConfig } from "./contact";

const productionOrigin = process.env.NEXT_PUBLIC_ELISANDRA_CARD_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://ecoverse-elisandra-barzaga.vercel.app");

export const elisandraBarzagaContact: ContactConfig = {
  fullName: "Elisandra Barzaga",
  company: contact.company,
  jobTitle: "Ejecutiva de Ventas",
  description: "",
  phone: "+17865318510",
  phoneDisplay: "(786) 531-8510",
  phoneActionDisplay: "(786) 531-8510",
  whatsapp: "https://wa.me/17865318510",
  email: "",
  instagramEcoverse: contact.instagramEcoverse,
  instagramPersonal: {
    label: "Instagram",
    context: "@aquapuremia",
    url: "https://www.instagram.com/aquapuremia?stkn=MXV1NDlwM3Jld2Rq",
  },
  officeLocation: contact.officeLocation,
  reviews: contact.reviews,
  website: contact.website,
  features: [],
  productionUrl: new URL("/", productionOrigin).href,
};
