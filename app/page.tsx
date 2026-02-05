import type { Metadata } from "next";
import { Inicio } from "@/src/paginas/Inicio";

const baseUrl = "https://www.jorgecartuchos.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Tienda de Tóner Láser en Bogotá | Jorge Cartuchos",
  description:
    "Servicio de tóner láser genérico y suministros compatibles de alta calidad en Bogotá. Más vida útil, excelente desempeño y entregas locales para hogares y empresas. Venta online confiable.",
  alternates: {
    canonical: "/",
  },
  keywords:
    "tóner láser Bogotá, tóner genérico Bogotá, cartuchos compatibles, suministros de impresión, venta online tóner, Jorge Cartuchos, tóner para impresoras láser, tóner sostenible",
  openGraph: {
    title: "Máxima Calidad en Tóner Láser en Bogotá | Jorge Cartuchos",
    description:
      "Tóner láser genérico de alta calidad y suministros compatibles en Bogotá. Venta online con excelente desempeño, mayor vida útil y un servicio que piensa en el planeta.",
    type: "website",
    url: "/",
    images: ["/imagen-Open-Graph-jorge-cartuchos.webp"],
    siteName: "Jorge Cartuchos",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tienda de Tóner Láser en Bogotá | Atención Personalizada",
    description:
      "Garantía de 30 días, excelente precio y atención por WhatsApp. Descubre Jorge Cartuchos, tu tienda confiable de tóner en Bogotá.",
    images: ["/imagen-Open-Graph-jorge-cartuchos.webp"],
  },
};

export default function Page() {
  return <Inicio />;
}


