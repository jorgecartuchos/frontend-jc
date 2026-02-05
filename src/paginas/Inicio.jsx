"use client";

import { useEffect } from "react";

import { ImagenesPortada, InfoGrafia, Tienda, ImgGarantia } from "../components/"
import { useInicio } from "../hooks/useInicio";
import { Link } from "../next-link-shim";
import { useLocation } from "../router-shim";

export const Inicio = () => {

  const location = useLocation()

  const { scrollTiendaFunction, setInfoForm } = useInicio();

  const handleTienda = () => {
    scrollTiendaFunction();
  };

  useEffect(() => {
    setInfoForm((prev) => ({ ...prev, activarCarrito: false }));
  }, [location.pathname]);


  return (
    <>
      <div className="flex grid-columns place-self-center text-titulo">
        <div className="flex flex-col w-1/2 text-img">
          <div className="w-full h-auto">
            <h1 className="text-[#f0c986] uppercase font-medium text-6xl text-titulo-mobile">Máxima Calidad <br />en Tóner Láser</h1>
            <div className="mt-5 px-2 text-left texto-servicio">
              <p className="font-bold uppercase tracking-wider text-[#a88358] text-xs text-left">Servicio de Tóner genérico para impresoras láser en Bogotá</p>
              <div className="flex flex-col ml-3 margin-description !leading-tight text-sm md:text-base lg:text-base font-normal w-full">

                <div className="flex mt-2 md:mt-1.5">
                  <div className="mt-[6px] rounded-sm w-2 h-2 inline-flex flex-shrink-0 bg-[#997246] mr-3 mb-[1.5px]" />
                  <p className="inline text-descripcion text-[#e2caa0]">Suministros compatibles de <span className="font-semibold">alta calidad</span> y <span className="font-semibold">excelente desempeño</span> para tu impresora.</p>
                </div>

                <div className="flex mt-1.5 -ml-2">
                  <img src="/ambient.svg" alt="" className="w-[20px] h-auto flex-shrink-0 mr-2 mb-auto" />
                  <p className="inline text-descripcion text-[#e2caa0]">Más vida útil, menos residuos. Un servicio que <span className="font-semibold"> piensa en el planeta.</span></p>
                </div>

              </div>
            </div>
            <div className="btn-icono">
              <div className="flex items-center margin-btn-logo">

                <div className="group w-40 btn-w-tienda h-12 cursor-pointer transition-all duration-700 hover:shadow-xl hover:text-[#103849] hover:shadow-[#5a5449] hover:bg-[#775936] bg-[#997246] relative rounded-md"
                  onClick={() => handleTienda()}
                >
                  <div className="absolute top-1.5 left-1.5 hover:left-2 hover:top-2 transition-all duration-300 flex rounded-md w-40 btn-w-tienda h-12 hover:font-semibold bg-[#f0c986] uppercase font-medium text-sm items-center justify-center text-[#061922]">Tienda
                    <img src="/Volver-blanco.svg" alt=""
                      className="ml-1.5"
                      style={{ transform: "rotate(0deg)", width: "15px", height: "15px" }}
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                      loading="eager"
                    />
                  </div>
                </div>
                <ImgGarantia />
              </div>
            </div>
          </div>
        </div>

        <ImagenesPortada />

      </div>

      <InfoGrafia />

      <p className="text-sm text-[#bea88e] mx-auto comunicado-tienda text-justify mt-11 max-w-[620px]">En nuestra tienda, encontrarás una selección de los tóner más populares del mercado. Si buscas un tóner específico que no está en nuestra lista, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte a encontrar lo que necesitas. <Link to="/contactanos" className="transition-all duration-500 hover:text-[#f0c986] hover:font-medium">Contáctanos aquí.</Link></p>

      <Tienda />

    </>
  )
}





