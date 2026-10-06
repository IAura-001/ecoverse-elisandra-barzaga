import { BusinessCard } from "@/components/business-card";
import { contact } from "@/config/contact";

export default function Home() {
  return <BusinessCard contact={contact} />;
}
