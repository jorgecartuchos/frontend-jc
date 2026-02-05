import type { Metadata } from "next";
import { VerProducto } from "@/src/paginas/VerProducto";
import { productos, masUsados } from "@/src/data/productos";
import { slugify } from "@/src/helpers";

const baseUrl = "https://www.jorgecartuchos.com";

type Props = {
  params: Promise<{ category: string; slugAndId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slugAndId } = await params;
  const lastDashIndex = slugAndId.lastIndexOf("-");
  const id = Number(slugAndId.slice(lastDashIndex + 1));
  const producto =
    productos.find((p) => p.id === id) || masUsados.find((p) => p.id === id);

  if (!producto) {
    return {
      title: "Producto | Jorge Cartuchos",
    };
  }

  const { nombre, marca, imagen, info, categoria } = producto;
  const categorySlug = categoria
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const slug = slugify(nombre);
  const url = `${baseUrl}/${categorySlug}/${slug}-${id}`;
  const imagePath = imagen?.detalle
    ? `${baseUrl}/${imagen.detalle.replace(/^\.\.\//, "")}`
    : undefined;

  return {
    title: `${nombre} | ${categoria} ${marca} con Garantía | Jorge Cartuchos Bogotá`,
    description: `Compra ${nombre}. ${info}. ${categorySlug} ${marca} de alta calidad con garantía de 30 días y entrega en Bogotá.`,
    alternates: {
      canonical: url,
    },
    keywords: `${categorySlug} ${marca}, ${nombre}, ${categorySlug} Bogotá, insumos de impresión ${marca}`,
    openGraph: {
      title: `${nombre} | ${categorySlug} ${marca} de Alta Calidad | Jorge Cartuchos`,
      description: `Compra ${nombre}. Garantía de 30 días, excelente rendimiento y atención personalizada en Bogotá.`,
      type: "website",
      url,
      images: imagePath ? [{ url: imagePath }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${nombre} | ${categorySlug} ${marca} con Garantía`,
      description: `Conoce el ${categorySlug} ${nombre}. Calidad, rendimiento y respaldo de Jorge Cartuchos.`,
      images: imagePath ? [imagePath] : undefined,
    },
  };
}

export default function Page() {
  return <VerProducto />;
}
