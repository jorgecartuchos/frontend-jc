import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./globals.css";

import { Providers } from "./providers";
import SiteLayout from "@/src/layout/Layout";

export const metadata: Metadata = {
  title: "Suministros de Impresión en Bogotá | Jorge Cartuchos",
  description: "En Jorge Cartuchos encuentras tóner y suministros de impresión de alta calidad en Bogotá, con entrega ágil, precios competitivos y atención confiable.",
  metadataBase: new URL("https://www.jorgecartuchos.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="shortcut icon" href="/favicon1.svg" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <Suspense fallback={null}>
          <Providers>
            <SiteLayout>{children}</SiteLayout>
          </Providers>
        </Suspense>
        <Script id="gtag-verify" strategy="afterInteractive">
          {`/* placeholder */`}
        </Script>
      </body>
    </html>
  );
}
