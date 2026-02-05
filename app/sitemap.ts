import type { MetadataRoute } from "next";
import { productos, masUsados } from "@/src/data/productos";
import { slugify } from "@/src/helpers";

const baseUrl = "https://www.jorgecartuchos.com";

export default function sitemap(): MetadataRoute.Sitemap {

    const staticPages = [
        "",
        "/nosotros",
        "/contactanos",
        "/blog",
        "/devoluciones",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }));


    const allProducts = [...productos, ...masUsados];

    const productPages = allProducts.map((producto) => {
        const categorySlug = producto.categoria
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const slug = slugify(producto.nombre);

        return {
            url: `${baseUrl}/${categorySlug}/${slug}-${producto.id}`,
            lastModified: new Date(),
        };
    });

    return [...staticPages, ...productPages];
}