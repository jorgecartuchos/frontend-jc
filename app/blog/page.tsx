import type { Metadata } from "next";
import { Blog } from "@/src/paginas/Blog";

const baseUrl = "https://www.jorgecartuchos.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/blog",
  },
  title: "Guía completa sobre tóner láser: información y consejos | Jorge Cartuchos",
  description:
    "Guía completa sobre tóner láser: aprende sobre tóner genérico vs original, cómo elegir el correcto, mantenimiento, costos por página y más. Información práctica para tomar decisiones informadas sobre impresión.",
  keywords:
    "guía tóner láser, tóner genérico vs original, cómo elegir tóner, mantenimiento tóner, costo por página tóner, información tóner láser, consejos tóner, diferencias tóner, tóner alta capacidad, tóner estándar",
  openGraph: {
    title: "Guía Completa sobre Tóner Láser | Información y Consejos Prácticos",
    description:
      "Descubre todo lo que necesitas saber sobre tóner láser: diferencias entre genérico y original, cómo elegir el correcto, mantenimiento, costos y más. Guía educativa completa.",
    type: "article",
    url: "/blog",
    images: ["/imagen-Open-Graph-jorge-cartuchos-blog.webp"],
    siteName: "Jorge Cartuchos",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guía Completa sobre Tóner Láser | Información y Consejos",
    description:
      "Aprende sobre tóner láser: diferencias, cómo elegir, mantenimiento y costos. Guía educativa completa para decisiones informadas.",
    images: ["/imagen-Open-Graph-jorge-cartuchos-blog.webp"],
  },
};

export default function Page() {
  return <Blog />;
}
