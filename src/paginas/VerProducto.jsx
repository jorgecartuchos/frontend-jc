"use client";

import { useEffect, useState, useRef } from "react";

import { Link } from "../next-link-shim";
import { useNavigate, useParamsShim as useParams } from "../router-shim";

import { ListadoMarca } from "../components/";
import { useInicio } from "../hooks/useInicio";

export const VerProducto = () => {

  const { category, slugAndId } = useParams();
  const navigate = useNavigate();

  const lastDashIndex = slugAndId.lastIndexOf("-");
  const id = Number(slugAndId.slice(lastDashIndex + 1));

  const [addCart, setAddCart] = useState(false);
  const { productos, masUsados, globalProductCart, productosCarrito, setIsCartOpen, setRealizarPedido, isRemovingRef, fromTienda, setModalSearch, handleCotizarAhora } = useInicio();

  const START_YEAR = 2006;
  const currentYear = new Date().getFullYear();
  const years = currentYear - START_YEAR;

  const dataId = Number(id);
  const valorBoton = !!productosCarrito?.find((product) => product.id === dataId);
  const idMasUsados = masUsados.find(product => product.id === dataId);

  const productoActual = productos.find(product => product.id === dataId) || masUsados.find(product => product.id === dataId);
  const { nombre, marca, imagen, info, categoria, compatibleConTexto, compatibleCon, especificaciones, porqueElegir } = productoActual || {};

  const filtrados = idMasUsados
    ? masUsados.filter(product => product.id !== dataId)
    : masUsados;

  const solo = productos.filter(product => product.marca === marca && product.id !== dataId);

  const transferCart = (id) => {
    globalProductCart(id);
    setAddCart(!addCart);
  };

  const handleBack = (e) => {
    e.preventDefault();

    const scrollPosition = sessionStorage.getItem('scrollPosition');

    navigate('/');

    if (scrollPosition) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo(0, parseInt(scrollPosition, 10));
        }, 0);
      });
    }
  };

  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (containerRef.current.firstChild) {
      containerRef.current.firstChild.style.transformOrigin = `${x}px ${y}px`;
    }
  };

  useEffect(() => {
    if (!isRemovingRef.current) {
      setIsCartOpen(false);
      setRealizarPedido(false);
    }

    isRemovingRef.current = false;

  }, [productosCarrito, dataId]);

  useEffect(() => {
    if (fromTienda) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setModalSearch(false);
    } else {
      window.scrollTo({ top: 0 });
      setModalSearch(false);
    }
  }, [dataId]);

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const hideTimeoutId = setTimeout(() => {
      setVisible(false);
    }, 0);

    const randomDelay = Math.random() * 1500;

    const showTimeoutId = setTimeout(() => {
      setVisible(true);
    }, randomDelay);

    return () => {
      clearTimeout(hideTimeoutId);
      clearTimeout(showTimeoutId);
    };
  }, [dataId]);

  return (
    <>
      <div className="flex flex-col place-self-center margin-ver-producto px-0 md:px-6  shadow-sm">
        <nav className="text-xs md:text-sm text-[#dbc2a5] mb-4 ml-2 md:ml-0">
          <ol className="flex items-center gap-1 flex-wrap">
            <li className="flex items-center">
              <button
                onClick={handleBack}
                className="flex items-center hover:underline group"
              >
                <img
                  src="/Volver.svg"
                  alt="Icono volver"
                  className="mr-1 transition-transform duration-300 transform group-hover:-translate-x-1"
                  style={{ width: "13px", height: "11px" }}
                  draggable="false"
                  loading="eager"
                />
                <span>Tienda</span>
              </button>
              <span className="mx-1 text-gray-400">›</span>
            </li>

            {categoria && (
              <li className="flex items-center">
                <span className="cursor-default">{categoria}</span>
                <span className="mx-1 text-gray-400">›</span>
              </li>
            )}

            {nombre && (
              <li className="flex items-center">
                <span className="text-gray-500">{nombre}</span>
              </li>
            )}
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1.1fr_1fr] lg:max-w-[1184px] bg-[#0d222c] rounded-lg pb-5 p-2 md:p-6 md:pr-0 lg:pr-6"
        >

          <div className="sticky md:top-[84px] lg:top-[85px] h-min flex order-1 md:order-1 lg:order-1">

            <div className="hidden md:block w-14 h-14 flex-shrink-0">
              <img
                src={`../${imagen.miniatura}`}
                alt="Miniatura"
                className="rounded-xl border-2 border-[#a77d4e] w-full h-full object-cover"
                draggable="false"
                loading="eager"
              />
            </div>

            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              className="relative overflow-hidden rounded-lg ml-0 md:ml-3 flex-1 max-w-full"
            >
              <img
                src={`../${imagen.detalle}`}
                alt="Imagen del producto"
                className="w-full h-auto object-contain transition-transform duration-700 ease-in-out hover:scale-150 cursor-zoom-in"
                loading="eager"
              />
            </div>

          </div>

          <div className="flex flex-col px-0 md:px-6 order-2 md:order-2 md:col-span-1 lg:col-span-1">

            <h1 className="mt-4 md:mt-0 font-semibold uppercase tracking-wide text-2xl mb-2 text-[#f0c986]">
              {nombre}
            </h1>
            <p className="text-sm text-[#dbc2a5]">{info}</p>

            <div className="block md:block lg:hidden mt-4 lg:mt-0 md:mt-6 border-b pb-6 border-[#103849]">
              <div className="flex flex-col text-sm text-[#f0c986]">
                <div className="flex items-center">
                  <div className="w-9 h-9 mr-3 p-2 bg-[#103849] rounded-md">
                    <img src="/soporte-dorado.svg" alt="Soporte" className="w-full" />
                  </div>
                  <span>Servicio Presencial</span>
                </div>

                <div className="flex items-center mt-2">
                  <div className="w-9 h-9 mr-3 p-1 bg-[#103849] rounded-md">
                    <img src="/ambient.svg" alt="ECO" className="w-7" />
                  </div>
                  <span>Compromiso Ambiental</span>
                </div>

                <div className="flex items-center mt-2">
                  <div className="w-9 h-9 mr-3 bg-[#103849] rounded-md flex">
                    <img src="/cobertura-dorado.svg" alt="Cobertura" className="w-[17px] mx-auto" />
                  </div>
                  <span>Cobertura Bogoá</span>
                </div>
              </div>

              <button
                className="group flex justify-center items-center w-full pr-9 mt-6 pl-4 py-3 rounded-md mt- text-base border font-semibold bg-[#997246] border-[#997246] hover:shadow-[#312f28] hover:shadow-lg text-[#061922] group hover:bg-[#f0c986] transition-all duration-500"
                onClick={() => handleCotizarAhora(dataId)}
              >
                <span className="flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <img
                    src="/cotizar.svg"
                    className="w-[24px] h-[18px] mr-2 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    alt="Icono cotizar"
                    draggable="false"
                  />
                  <span>Cotizar ahora</span>
                </span>
              </button>


              <button
                className={`group w-full flex justify-center items-center px-4 py-3 rounded-md mt-4 transition-all duration-500 hover:border-[#bd905c] hover:text-[#ad8454] text-base border font-semibold hover:shadow-[#312f28] hover:shadow-lg ${valorBoton
                  ? "text-[#997246] bg-[#09212c] border-[#103849]"
                  : "bg-[#09212c] border-[#997246] text-[#997246]"
                  }`}
                onClick={() => transferCart(dataId)}
              >
                <img
                  src={valorBoton ? "/carrito-borrar.svg" : "/Carrito-agregar.svg"}
                  className={`opacity-70 transition-opacity duration-500 group-hover:opacity-100 ${valorBoton
                    ? "w-[16px] h-[19px] mr-3 group-hover:scale-110 transition-transform"
                    : "w-[22px] h-[21.4px] mr-2 group-hover:scale-110 transition-transform"
                    }`}
                  alt={valorBoton ? "Quitar del carrito" : "Agregar al carrito"}
                  draggable="false"
                />
                {valorBoton ? "Borrar del carrito" : "Agregar al carrito"}
              </button>

              <div
                className={`bg-[#6adb82] mt-3 tracking-tight block rounded-md px-2 w-min transition-all
                ${visible ? "opacity-100 translate-y-0" : "opacity-10 translate-y-0.5"}
              `}
                style={{
                  transitionDuration: "300ms",
                }}
              >
                <p className="text-xs text-nowrap font-semibold text-[#2c6838]">
                  ✔️ Disponible
                </p>
              </div>

              <section className="pt-6">
                <p className="font-semibold uppercase tracking-wide text-base mb-3 text-[#f0c986]">
                  Métodos de pago seguros
                </p>

                <ul className="list-disc list-outside pl-5 text-sm text-[#dbc2a5] space-y-1">
                  <li>
                    <span className="font-semibold">Pago contraentrega</span> al recibir tu
                    producto. Puedes pagar en <span className="font-semibold">efectivo</span> o
                    por <span className="font-semibold">Nequi</span>.
                  </li>
                  <li>
                    También puedes pagar por{" "}
                    <span className="font-semibold">transferencia bancaria</span> si te
                    resulta más cómodo.
                  </li>
                </ul>
              </section>
            </div>

            <section className="pt-6">
              <p className="font-semibold uppercase tracking-wide text-base mb-2 text-[#f0c986]">
                Compatible con:
              </p>
              <p className="text-sm text-[#dbc2a5]">{compatibleConTexto}</p>

              {Array.isArray(compatibleCon) && (
                <ul className="list-disc list-inside mt-3 text-sm text-[#dbc2a5]">
                  {compatibleCon.map((modelo) => (
                    <li key={modelo}>{modelo}</li>
                  ))}
                </ul>
              )}
            </section>

            <section className="pt-6">
              <p className="font-semibold uppercase tracking-wide text-base mb-2 text-[#f0c986]">
                Especificaciones:
              </p>

              <ul className="list-disc list-outside pl-5 text-sm text-[#dbc2a5]">
                {Object.entries(especificaciones).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-semibold capitalize">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </section>

            <section className="pt-6">
              <p className="font-semibold uppercase tracking-wide text-base mb-3 text-[#f0c986]">
                {categoria === "Tóner"
                  ? "Por qué elegir este tóner:"
                  : categoria === "Tinta"
                    ? "Por qué elegir esta tinta:"
                    : "Por qué elegir este producto:"}
              </p>

              <ul className="list-disc list-outside pl-5 text-sm text-[#dbc2a5]">
                {porqueElegir.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="pt-6">
              <p className="font-semibold uppercase tracking-wide text-base mb-2 text-[#f0c986]">
                Garantía y devoluciones:
              </p>

              <ul className="list-disc list-outside pl-5 text-sm text-[#dbc2a5]">
                <li>
                  30 días de garantía directa con Jorge Cartuchos para cambios o
                  devoluciones si tu pedido no cumple tus expectativas.
                </li>
                <li>
                  6 meses de garantía por defectos de fábrica, aplicable a nuestros
                  tóners y tintas.
                </li>
              </ul>

              <p className="mt-3 text-sm text-[#dbc2a5]">
                Para conocer más sobre condiciones y requisitos,{" "}
                <Link className="underline hover:text-[#f0c986]" to="/devoluciones">
                  haz clic aquí
                </Link>.
              </p>
            </section>
          </div>

          <div className="static h-min flex flex-col order-3 md:order-none md:col-start-2 md:row-start-2 lg:sticky lg:top-[75px] lg:col-start-3 lg:row-start-1 md:px-6 lg:px-0">

            <div className="hidden md:hidden lg:block">

              <div className="flex flex-col text-sm text-[#f0c986]">
                <div className="flex items-center">
                  <div className="w-9 h-9 mr-3 p-2 bg-[#103849] rounded-md">
                    <img src="/soporte-dorado.svg" alt="Soporte" className="w-full" />
                  </div>
                  <span>Servicio Presencial</span>
                </div>

                <div className="flex items-center mt-2">
                  <div className="w-9 h-9 mr-3 p-1 bg-[#103849] rounded-md">
                    <img src="/ambient.svg" alt="ECO" className="w-7" />
                  </div>
                  <span>Compromiso Ambiental</span>
                </div>

                <div className="flex items-center mt-2">
                  <div className="w-9 h-9 mr-3 bg-[#103849] rounded-md flex">
                    <img src="/cobertura-dorado.svg" alt="Cobertura" className="w-[17px] mx-auto" />
                  </div>
                  <span>Cobertura Bogotá</span>
                </div>
              </div>

              <button
                className="group flex justify-center items-center w-full pr-9 mt-6 pl-4 py-3 rounded-md mt- text-base border font-semibold bg-[#997246] border-[#997246] hover:shadow-[#312f28] hover:shadow-lg text-[#061922] group hover:bg-[#f0c986] transition-all duration-500"
                onClick={() => handleCotizarAhora(dataId)}
              >
                <span className="flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <img
                    src="/cotizar.svg"
                    className="w-[24px] h-[18px] mr-2 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    alt="Icono cotizar"
                    draggable="false"
                  />
                  <span>Cotizar ahora</span>
                </span>
              </button>


              <button
                className={`group w-full flex justify-center items-center px-4 py-3 rounded-md mt-4 transition-all duration-500 hover:border-[#bd905c] hover:text-[#ad8454] text-base border font-semibold hover:shadow-[#312f28] hover:shadow-lg ${valorBoton
                  ? "text-[#997246] bg-[#09212c] border-[#103849]"
                  : "bg-[#09212c] border-[#997246] text-[#997246]"
                  }`}
                onClick={() => transferCart(dataId)}
              >
                <img
                  src={valorBoton ? "/carrito-borrar.svg" : "/Carrito-agregar.svg"}
                  className={`opacity-70 transition-opacity duration-500 group-hover:opacity-100 ${valorBoton
                    ? "w-[16px] h-[19px] mr-3 group-hover:scale-110 transition-transform"
                    : "w-[22px] h-[21.4px] mr-2 group-hover:scale-110 transition-transform"
                    }`}
                  alt={valorBoton ? "Quitar del carrito" : "Agregar al carrito"}
                  draggable="false"
                />
                {valorBoton ? "Borrar del carrito" : "Agregar al carrito"}
              </button>

              <div
                className={`bg-[#6adb82] mt-3 tracking-tight block rounded-md px-2 w-min transition-all
                ${visible ? "opacity-100 translate-y-0" : "opacity-10 translate-y-0.5"}
              `}
                style={{
                  transitionDuration: "300ms",
                }}
              >
                <p className="text-xs text-nowrap font-semibold text-[#2c6838]">
                  ✔️ Disponible
                </p>
              </div>

              <section className="pt-6">
                <p className="font-semibold uppercase tracking-wide text-base mb-3 text-[#f0c986]">
                  Métodos de pago seguros
                </p>

                <ul className="list-disc list-outside pl-5 text-sm text-[#dbc2a5] space-y-1">
                  <li>
                    <span className="font-semibold">Pago contraentrega</span> al recibir tu
                    producto. Puedes pagar en <span className="font-semibold">efectivo</span> o
                    por <span className="font-semibold">Nequi</span>.
                  </li>
                  <li>
                    También puedes pagar por{" "}
                    <span className="font-semibold">transferencia bancaria</span> si te
                    resulta más cómodo.
                  </li>
                </ul>
              </section>
            </div>

            <div className="mt-5 md:mt-10 flex flex-col border border-[#103849] rounded-lg px-3 pt-3 pb-4">
              <p className="mb-2 font-medium text-base text-[#f0c986]">
                Contacto
              </p>

              <a
                href="tel:+573205682187"
                className="bg-[#103849] text-sm w-full flex items-center rounded-md pl-2 pr-4 py-1"
              >
                <img src="/call.svg" alt="Llamada" />
                <span className="text-[#c49866] tracking-wide ml-2">+57 <span className="text-[#f0c986]">320 568 2187</span></span>
              </a>

              <a
                href="mailto:jorgelo1469@gmail.com"
                className="bg-[#103849] text-sm mt-2 w-full flex items-center rounded-md pl-2 pr-7 py-1"
              >
                <img src="/email.svg" alt="Correo" className="mr-2" />
                <span className="text-[#c49866]">jorgelo1469@gmail.com</span>
              </a>
            </div>

            <div className="mt-4 bg-[#b38755] text-sm flex justify-center items-center rounded-md pl-2 pr-4 py-1">
              <span className="mr-2">🏆</span>
              <span className="text-[#09212c] font-medium">
                Trayectoria de más de <span className="font-semibold">{years} años</span>.
              </span>
            </div>
          </div>
        </div>

      </div>



      <div className="w-auto h-auto pt-12 pb-6 max-w-[1279px] flex-col flex place-self-center items-center relative text-[#cc9c65] border-[#103849]">

        <p className="mt-6 uppercase tracking-tight font-medium text-left text-xl">Los más vendidos</p>
        {<ListadoMarca data={filtrados} />}

        <p className="mt-6 uppercase tracking-tight font-medium text-center text-xl">Productos  Relacionados</p>
        {<ListadoMarca data={solo} />}

        <div className="w-auto mr-auto">
          <div className="w-full max-w-[1250px]">
            <Link
              className="text-sm inline-flex items-center uppercase tracking-tight font-medium group hover:text-[#f0c986] transition-all duration-500"
              onClick={(e) => handleBack(e)}
            >
              <img
                src="/Volver.svg"
                alt=""
                className="mr-2 transition-transform duration-300 transform group-hover:-translate-x-1"
                style={{ width: "13px", height: "11px" }}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                loading="lazy"
              />
              Volver a la tienda
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}
