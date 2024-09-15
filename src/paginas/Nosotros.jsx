import {Link} from "react-router-dom";
import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";

const ImagenZoom = lazy(() => import('../components/ImagenZoom'));

export const Nosotros = () => {
  return (
    <>
      <Helmet>
        <title>Sobre Jorge Cartuchos - Experto en Toners Láser en Bogotá</title>
        <meta name="description" content="Conoce la historia y misión de Jorge Cartuchos, líderes en la venta de toners láser en Bogotá. Fundada por Jorge López, ofrecemos productos de alta calidad con garantía y atención personalizada para empresas y hospitales." />
        <meta name="keywords" content="Jorge Cartuchos, historia de Jorge Cartuchos, misión de Jorge Cartuchos, toners láser Bogotá, expertos en toners, Jorge López, venta de toners Bogotá, garantía en toners, empresa de toners" />

        <meta property="og:title" content="Sobre Jorge Cartuchos - Experto en Toners Láser en Bogotá"/>
        <meta property="og:description" content="Conoce la historia y misión de Jorge Cartuchos, líderes en la venta de toners láser en Bogotá. Fundada por Jorge López, ofrecemos productos de alta calidad con garantía y atención personalizada para empresas y hospitales."/>
        <meta property="og:type" content="website" />

        <meta property="og:image" content="https://drive.google.com/uc?export=view&id=1wcgvEDgIu4VDZUrTnnucnsvjSNa0PHtD"/>
        <meta property="og:url" content="https://jorgecartuchos.vercel.app/nosotros"/>

        <meta name="twitter:card" content="https://drive.google.com/uc?export=view&id=1wcgvEDgIu4VDZUrTnnucnsvjSNa0PHtD" />
        <meta name="twitter:title" content="Sobre Jorge Cartuchos - Experto en Toners Láser en Bogotá" />
        <meta name="twitter:description" content="Conoce la historia y misión de Jorge Cartuchos, líderes en la venta de toners láser en Bogotá. Fundada por Jorge López, ofrecemos productos de alta calidad con garantía y atención personalizada para empresas y hospitales." />
        <meta name="twitter:image" content="https://drive.google.com/uc?export=view&id=1wcgvEDgIu4VDZUrTnnucnsvjSNa0PHtD" />
        <meta name="twitter:url" content="https://jorgecartuchos.vercel.app/nosotros" />
    </Helmet>

      <div className="mt-24 padding-contacto padding-nosotros lg:mt-20 md:mt-16 md:pb-28 pb-16 lg:pb-28 grid text-center place-items-center">
          <h1 className="font-montserrat uppercase text-4xl font-medium">Acerca de nosotros</h1>
          <p className="mt-contactanos pt-1 font-montserrat font-normal text-base w-11/12 md:w-2/3 lg:w-1/2 text-justify">En<span className="font-medium"> Jorge Cartuchos,</span> nuestra misión es ofrecer <span className="font-medium"> toners láser de alta calidad a precios competitivos, garantizando la satisfacción total de nuestros clientes.</span> Desde nuestro inicio, nos hemos comprometido a ser líderes en el mercado de Bogotá, construyendo una base sólida respaldada por un equipo especializado y contratos duraderos con empresas y hospitales.
          </p>
          <p className="mt-4 font-montserrat font-normal text-base w-11/12 md:w-2/3 lg:w-1/2 text-justify">Nuestro fundador, <span className="font-medium"> Jorge López,</span> con años de experiencia en el sector, decidió emprender tras haber trabajado exitosamente con importantes clientes como el <span className="font-medium"> Hospital de Tunjuelito y Fontibón en Bogotá, Colombia.</span> Este conocimiento adquirido en el campo ha sido clave para nuestro crecimiento continuo.
          </p>

          <p className="mt-4 font-montserrat font-normal text-base w-11/12 md:w-2/3 lg:w-1/2 text-justify">Nuestros valores de <span className="font-medium">compromiso, excelencia e innovación nos guían en cada paso.</span> Aunque actualmente <span className="font-medium"> Jorge López</span> lidera el proyecto de manera independiente, seguimos enfocados en expandirnos y en gestionar tanto ventas individuales como grandes pedidos. Ofrecemos una garantía de 30 días en todos nuestros productos, asegurando la confianza y tranquilidad de nuestros clientes.
          </p>

          <p className="mt-4 font-montserrat font-normal text-base w-11/12 md:w-2/3 lg:w-1/2 text-justify">Para más detalles, consulte nuestra <Link to="/devoluciones" className="text-[#353535] underline transition-all duration-500 hover:font-medium hover:text-black">política de devoluciones.</Link> Además, brindamos soporte a través de nuestra página web, facilitando el contacto y gestionando visitas presenciales cuando es necesario. Nos enorgullece ofrecer soluciones eficientes y confiables, con un firme compromiso con la calidad.
          </p>

          {/* <div className="grid grid-cols-1 mt-14 md:grid-cols-2 lg:grid-cols-2 w-11/12 md:w-2/3 lg:w-1/2 gap-4">
            <div className="w-full h-auto">
                <ImagenZoom 
                    src="/imagen-nosotros-2.webp" 
                    alt="Jorge Lópéz trabajando en los toners"
                />
            </div>
            <div className="w-full h-auto">
                <ImagenZoom 
                    src="/imagen-nosotros-1.webp" 
                    alt="Jorge Lópéz trabajando en los toners"
                />
            </div>

          </div> */}

            <Suspense fallback={<p>Cargando...</p>}>
              <div className="flex h-40 md:h-80 lg:h-80 mt-14 md:grid-cols-2 lg:grid-cols-2 w-11/12 md:w-2/3 lg:w-1/2 border-4 border-[#ffffff]">
              <div className="w-full h-auto">

                {window.innerWidth > 1024 && (
                  <ImagenZoom 
                      src="/imagen-nosotros-2-lg.webp" 
                      alt="Jorge Lópéz trabajando en los toners"
                  />
                )}
                {window.innerWidth < 1023 && window.innerWidth > 768 && (
                  <ImagenZoom 
                      src="/imagen-nosotros-2-md.webp" 
                      alt="Jorge Lópéz trabajando en los toners"
                  />
                )}
                {window.innerWidth < 767 && (
                  <ImagenZoom 
                      src="/imagen-nosotros-2-sm.webp" 
                      alt="Jorge Lópéz trabajando en los toners"
                  />
                )}
              </div>
              </div>
            </Suspense>

          <p className="mt-4 text-[#000000] tracking-wide font-montserrat uppercase font-semibold text-sm w-11/12 md:w-2/3 lg:w-1/2 text-left">Precision y calidad en cada impresión.
          </p>
      </div>
    </>

  )
}

