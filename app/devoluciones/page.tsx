import type { Metadata } from "next";
import { Devoluciones } from "@/src/paginas/Devoluciones";

const baseUrl = "https://www.jorgecartuchos.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/devoluciones",
  },
  title: "Política de Devoluciones de Tóner - Garantía de 30 Días | Jorge Cartuchos",
  description:
    "Revisa la política de devoluciones de Jorge Cartuchos. Tienes hasta 30 días para devolver tu tóner láser con reembolso garantizado. Un proceso rápido, claro y sin complicaciones en Bogotá.",
  keywords:
    "devoluciones tóner, política de devoluciones, reembolso tóner Bogotá, garantía 30 días, Jorge Cartuchos, devolución de productos, soporte posventa",
  openGraph: {
    title: "Política de Devoluciones - Reembolso Garantizado en 30 Días | Jorge Cartuchos",
    description:
      "¿No estás satisfecho con tu tóner? Devuélvelo en 30 días con nuestra política de reembolso sin complicaciones. En Jorge Cartuchos priorizamos tu tranquilidad.",
    type: "website",
    url: "/devoluciones",
    images: ["/imagen-Open-Graph-jorge-cartuchos-devoluciones.webp"],
    siteName: "Jorge Cartuchos",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Devoluciones - Reembolso Garantizado en 30 Días | Jorge Cartuchos",
    description:
      "Devuelve tu tóner sin complicaciones. Nuestra política de devoluciones te ofrece hasta 30 días con garantía de reembolso. Servicio confiable en Bogotá.",
    images: ["/imagen-Open-Graph-jorge-cartuchos-devoluciones.webp"],
  },
};

export default function Page() {
  return <Devoluciones />;
}
