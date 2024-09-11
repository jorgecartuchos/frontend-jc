import { useEffect } from "react";
import { ImagenesPortada, InfoGrafia, Tienda, ImgGarantia } from "../components/"
import { useInicio } from "../hooks/useInicio";
import { Link, useLocation } from "react-router-dom";

export const Inicio = () => {

  const location = useLocation()

  const { scrollTiendaFunction, setInfoForm } = useInicio();

  const handleTienda = () => {
    scrollTiendaFunction();
  };
  
useEffect(() => {
  setInfoForm((prev) => ({...prev, activarCarrito: false}));
}, [location.pathname]);


  return (
    <>
    <div className="w-full block md:mt-3 pt-[74px] md:pt-[62px] sm:pt-[74px] logo-hidden bg-[#ffffff] py-4">
      <p to="/"
        className="flex-grow  leading-3 text-center font-montserrat font-medium uppercase tracking-tight"
      >Jorge<span className="block relative top-0.5 font-bold">Cartuchos</span></p>
    </div>

    <div className="grid grid-columns mt-6 text-center text-titulo">
        <div>
          <h1 className="font-montserrat uppercase font-semibold md:font-medium lg:font-medium text-4xl md:text-7xl lg:text-7xl text-title">Máxima Calidad en Toners Láser</h1>
          <div className="mt-8 md:px-10 lg:px-1 px-2 text-left texto-servicio">
              <p className="font-montserrat font-bold uppercase tracking-wide text-[#757575] text-xs text-left">Servicio</p>
              <div className="flex ml-3  w-full">
                
                <div className="font-montserrat center text-sm inline md:text-base lg:text-base font-semibold uppercase text-descripcion" ><div className="w-2 h-2 inline-flex flex-shrink-0 bg-black mb-[1.5px]"/> Toners láser en Bogotá: <span className="font-normal">Reemplazo completo con piezas originales para un rendimiento óptimo garantizado.</span></div>  

              </div>
          </div>
          <div className="flex justify-center lg:inline">
            <div className="flex invertir-sm items-center mt-10 lg:mt-10">

              <div className="w-40 h-12 cursor-pointer bg-white relative rounded-sm"
                onClick={() =>handleTienda()}
              >
                <div className="absolute left-2 top-2 flex rounded-sm w-40 h-12 bg-white border-2 border-[#f2f2f2] font-montserrat uppercase font-medium text-sm items-center justify-center">Tienda
                <img src="./Volver.png" alt=""
                className="ml-2"
                  style={{transform: "rotate(230deg)", width:"13px", height: "13px"}}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  loading="lazy"
                />
                </div>
              </div>
              <ImgGarantia />
            </div>
          </div>
         
        </div>

        <ImagenesPortada />

    </div>

    <InfoGrafia />

    {/* <p className="font-montserrat text-sm text-[#757575] mx-auto comunicado-tienda text-justify mt-11 max-w-[620px]">En nuestra tienda, encontrarás una selección de los toners más populares del mercado. Si buscas un toner específico que no está en nuestra lista, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte a encontrar lo que necesitas. <Link to="/contactanos" className="duration-300 hover:text-[#000000] hover:font-medium transition-all">Contáctanos aquí.</Link></p> */}

    {/* <div className="w-full flex items-center h-12 mt-12 font-medium text-lg tracking-wider uppercase font-montserrat bg-[#000000] text-[#ffffff] overflow-hidden">
      <div className="whitespace-nowrap animate-marquee">
        {window.innerWidth > 980 &&
          Array(8).fill('| Promoción hoy al 20% descuento').map((text, index) => (
          <span key={index} className="mr-2">{text}</span>
        ))}
        {window.innerWidth < 979 && window.innerWidth > 550 &&
          Array(3).fill('| Promoción hoy al 20% descuento').map((text, index) => (
          <span key={index} className="mr-2">{text}</span>
        ))}
        {window.innerWidth < 550 &&
          Array(2).fill('| Promoción hoy al 20% descuento').map((text, index) => (
          <span key={index} className="mr-2">{text}</span>
        ))}
      </div>
    </div> */}

    <Tienda />

    </>
  )
}





