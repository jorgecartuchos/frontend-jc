import type { Metadata } from "next";
import { Contactanos } from "@/src/paginas/Contactanos";

const baseUrl = "https://www.jorgecartuchos.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/contactanos",
  },
  title: "Contáctanos | Atención Personalizada de Tóner Láser | Jorge Cartuchos",
  description:
    "¿Necesitas asesoría sobre tóners? Contáctanos y recibe atención personalizada. Envía tus productos del carrito por correo para recibir una cotización rápida y confiable en Bogotá.",
  keywords:
    "contacto Jorge Cartuchos, asesoría en tóner, atención personalizada Bogotá, enviar carrito por correo, cotización tóner Bogotá, soporte Jorge Cartuchos, comunicación directa, WhatsApp tóner Bogotá",
  openGraph: {
    title: "Contáctanos | Recibe Asesoría Personalizada en Tóner Láser",
    description:
      "En Jorge Cartuchos te atendemos con confianza y rapidez. Envíanos tus productos del carrito y recibe soporte directo y personalizado para empresas y particulares.",
    type: "website",
    url: "/contactanos",
    images: ["/imagen-Open-Graph-jorge-cartuchos-contactanos.webp"],
    siteName: "Jorge Cartuchos",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contáctanos | Recibe Asesoría Personalizada en Tóner Láser",
    description:
      "Contáctanos y recibe atención personalizada sobre nuestros tóners. Envíanos tu carrito para cotización rápida y soporte experto en Bogotá.",
    images: ["/imagen-Open-Graph-jorge-cartuchos-contactanos.webp"],
  },
};

export default function Page() {
  return <Contactanos />;
}
