import type { Metadata } from "next";
import { Nosotros } from "@/src/paginas/Nosotros";

const baseUrl = "https://www.jorgecartuchos.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/nosotros",
  },
  title: "Acerca de nosotros | Jorge Cartuchos",
  description:
    "Conoce la historia de Jorge Cartuchos, una empresa bogotana con más de 20 años de experiencia ofreciendo tóners láser confiables, atención cercana y soluciones para empresas, hospitales y oficinas.",
  keywords:
    "Jorge Cartuchos, tóner Bogotá, tóners láser, venta de tóner Bogotá, expertos en tóner, tóner para empresas, tóner con garantía, tóners originales, Jorge López, proveedor de tóner Bogotá",
  openGraph: {
    title: "Acerca de nosotros | Jorge Cartuchos",
    description:
      "Conoce la historia de Jorge Cartuchos: compromiso, experiencia y más de una década acompañando a empresas en Bogotá.",
    type: "website",
    url: "/nosotros",
    images: ["/imagen-Open-Graph-jorge-cartuchos-nosotros.webp"],
    siteName: "Jorge Cartuchos",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jorge Cartuchos | Expertos en Tóners Láser para Empresas en Bogotá",
    description:
      "Más de 20 años de experiencia ofreciendo tóners láser con garantía y atención personalizada para empresas en Bogotá.",
    images: ["/imagen-Open-Graph-jorge-cartuchos-nosotros.webp"],
  },
};

export default function Page() {
  return <Nosotros />;
}
