"use client";

import { Link } from "../next-link-shim";

export const Nosotros = () => {
  return (
    <>
      <div className="flex flex-col relative place-self-center text-[#dac29b] mt-28 md:pb-28 pb-16 lg:pb-28 text-center max-w-[800px] md:mx-8">
        <h1 className="uppercase h1-position tracking-tight text-[#f0c986] text-4xl font-medium">Acerca de nosotros</h1>

        <div className="flex flex-col md:grid md:grid-cols-[8fr_10fr] gap-6 justify-items-center mt-contactanos md:px-0 px-3">

          <div className="relative w-full h-full overflow-hidden rounded-md order-2 md:order-1">

            <div className="absolute inset-0 bg-[#061922] before:content-[''] before:absolute before:inset-0 before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-[#0f2733] before:to-transparent"></div>

            <img
              src="/turbo-jorge.webp"
              alt="Imagen del superhéroe de Jorge Cartuchos"
              className="superheroe-responsive w-fit h-fit  rounded-lg shadow-lg shadow-[#041016] relative z-10"
              loading="eager"
              onLoad={(e) => e.currentTarget.previousSibling.remove()}
            />
          </div>


          <div className="order-3 md:order-2">
            <p className="font-normal text-base text-justify">
              En<span className="font-medium"> Jorge Cartuchos,</span> nuestra misión es ofrecer <span className="font-medium"> tóner genérico de alta calidad a precios competitivos, garantizando la satisfacción total de nuestros clientes.</span> Desde nuestro inicio, nos hemos comprometido a ser líderes en el mercado de Bogotá, construyendo una base sólida respaldada por un equipo especializado y contratos duraderos con empresas y hospitales.
            </p>
            <p className="mt-4 font-normal text-base text-justify">
              Nuestro fundador, <span className="font-medium"> Jorge López,</span> con más de 20 años de experiencia en el sector, decidió emprender tras haber trabajado exitosamente con importantes clientes como el <span className="font-medium"> Hospital de Tunjuelito y Fontibón en Bogotá, Colombia.</span> Este conocimiento adquirido en el campo ha sido clave para nuestro crecimiento continuo.
            </p>
            <p className="mt-4 font-normal text-base text-justify">
              Nuestros valores de <span className="font-medium">compromiso, excelencia e innovación nos guían en cada paso.</span> Aunque actualmente <span className="font-medium"> Jorge López</span> lidera el proyecto de manera independiente, seguimos enfocados en expandirnos y en gestionar tanto ventas individuales como grandes pedidos.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 mt-4 parrafos-mobile md:px-0 px-3">
          <p className="font-normal text-base text-justify">
            Ofrecemos una garantía de 30 días en todos nuestros productos, asegurando la confianza y tranquilidad de nuestros clientes. Para más detalles, consulte nuestra <Link to="/devoluciones" className="text-[#af8556] underline transition-all duration-500 hover:font-medium hover:text-[#f0c986]">política de devoluciones.</Link> Además, brindamos soporte a través de nuestra página web, facilitando el contacto y gestionando visitas presenciales cuando es necesario. Nos enorgullece ofrecer soluciones eficientes y confiables, con un firme compromiso con la calidad.
          </p>
          <div className="relative w-full group cursor-default overflow-hidden rounded-md">
            <div className="absolute inset-0 bg-[#061922] before:content-[''] before:absolute before:inset-0 before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-[#0f2733] before:to-transparent"></div>

            <img
              src="desktop-jorge.webp"
              alt="Imagen de Jorge en la oficina"
              className="relative transition-all duration-1000 group-hover:opacity-30 opacity-img w-fit h-fit rounded-lg shadow-lg shadow-[#041016] z-10"
              loading="lazy"
              onLoad={(e) => e.currentTarget.previousSibling.remove()}
            />

            <p className="slogan-nosotros text-xl tracking-wide text-[#f0c986] uppercase font-semibold text-s text-center relative z-20">
              MEJOR TÓNER, MEJOR IMPRESIÓN ASÍ DE SIMPLE.
            </p>
          </div>
        </div>
      </div>

    </>

  )
}

