"use client";

import { useEffect, useRef } from "react";

import { Link } from "../next-link-shim";

import { slugify } from "../helpers"
import { useInicio } from "../hooks/useInicio";
import { ModalPregunta } from "./ModalPregunta";
import { SetAlerta } from "./setAlerta";

export const Cart = () => {

  const { realizarPedido, setIsCartOpen, setRealizarPedido, isCartOpen, totalProductosCarrito, productosCarrito, productosEnviados, infoForm, borrarProductos, handleCarrito, handleListToners, removeItem, handleRealizarPedido, isModalVisible, handleCloseModal, camposLlenos, correoEnviado, isLoading, handleChangeForm, onSubmitForm } = useInicio();

  const formRef = useRef(null);

  useEffect(() => {
    const node = formRef.current;
    if (!node) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      if (window.innerWidth <= 950) {
        touchStartX = e.changedTouches[0].screenX;
      }
    };

    const handleTouchEnd = (e) => {
      if (window.innerWidth <= 950) {
        touchEndX = e.changedTouches[0].screenX;
        const deltaX = touchEndX - touchStartX;

        if (deltaX > 50) {
          setRealizarPedido(false);
        }
      }
    };

    node.addEventListener("touchstart", handleTouchStart);
    node.addEventListener("touchend", handleTouchEnd);

    return () => {
      node.removeEventListener("touchstart", handleTouchStart);
      node.removeEventListener("touchend", handleTouchEnd);
    };
  }, [formRef, productosCarrito]);

  const cartRef = useRef(null);

  useEffect(() => {
    const node = cartRef.current;
    if (!node) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      if (window.innerWidth <= 950) {
        touchStartX = e.changedTouches[0].screenX;
      }
    };

    const handleTouchEnd = (e) => {
      if (window.innerWidth <= 950) {
        touchEndX = e.changedTouches[0].screenX;
        const deltaX = touchEndX - touchStartX;

        if (deltaX < -50 && productosCarrito.length >= 1) {
          setRealizarPedido(true);
        }
      }
    };


    node.addEventListener("touchstart", handleTouchStart);
    node.addEventListener("touchend", handleTouchEnd);

    return () => {
      node.removeEventListener("touchstart", handleTouchStart);
      node.removeEventListener("touchend", handleTouchEnd);
    };
  }, [cartRef, productosCarrito]);

  useEffect(() => {
    const node = cartRef.current;
    if (!node) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      if (window.innerWidth <= 950) {
        touchStartX = e.changedTouches[0].screenX;
      }
    };

    const handleTouchEnd = (e) => {
      if (window.innerWidth <= 950) {
        touchEndX = e.changedTouches[0].screenX;
        const deltaX = touchEndX - touchStartX;

        if (deltaX > 50) {
          setIsCartOpen(false);
        }
      }
    };

    node.addEventListener("touchstart", handleTouchStart);
    node.addEventListener("touchend", handleTouchEnd);

    return () => {
      node.removeEventListener("touchstart", handleTouchStart);
      node.removeEventListener("touchend", handleTouchEnd);
    };
  }, [cartRef]);

  return (
    <div
      className={`fixed cart-global z-40 flex h-full top-0 right-0 shadow-md  transform transition-transform duration-300 ease-in-out ${isCartOpen
          ? realizarPedido
            ? 'translate-x-0'
            : 'translate-x-cart'
          : 'translate-x-full'
        } ${isCartOpen && realizarPedido ? 'translate-x-form' : ''
        }`}
    >

      <div className="cart bg-[#103849] relative h-auto transform transition-all duration-500"
        ref={cartRef}
      >

        <div className="flex w-full h-auto items-center mt-8">
          <p
            className="ml-8 font-semibold tracking-tight text-[#f0c986] text-xl text-left uppercase"
          >Carrito</p>

          {productosCarrito.length > 0 &&
            <img src="/carrito-tarjeta-agregado.svg" alt="Icono de carrito vacío" className="w-[18px] h-[17px]] ml-3" />
          }

          <p
            className={`ml-auto min-w-[139.5px] pt-1.5 text-[#f0c986] text-xs font-medium transition-opacity duration-500 ${realizarPedido || infoForm.activarCarrito ? 'opacity-100' : 'opacity-0'}`}
          >{infoForm.activarCarrito && productosCarrito.length >= 1 ? 'Agregado a tu pedido' : ''}</p>

          <button
            onClick={handleCarrito}
            className={`text-[#f0c986] hover:text-[#f8d392] ml-auto mr-4 font-normal text-4xl w-8 h-8 flex items-center justify-center ${realizarPedido && isCartOpen ? '!text-[#103849] cursor-auto' : ''}`}
          >
            &times;
          </button>

        </div>
        <div className={`flex w-full border-t border-[#224757] bg-[#0a2936] custom-scrollbar justify-center text-center mt-2 px-4 py-3 overflow-y-auto relative ${productosCarrito.length === 0 ? 'h-full' : 'h-[calc(100%-170px)]'}`}>

          {productosCarrito.length === 0 ? (
            <div className="flex flex-col h-full place-items-center">

              <img src="/carrito-tarjeta-agregado.svg" alt="Icono de carrito vacío" className="mt-6 w-[18px] h-[17px]]" />

              <p className="text-sm tracking-wider text-center mt-2 text-[#c09665]"><span className="font-semibold">Tu carrito está vacío.</span> Agrega productos y contáctanos para solicitar tu tóner.</p>

              <button className="mt-6 text-sm px-24 py-4 font-normal border-2 border-[#f0c986] rounded-md hover:shadow-[#5a5449] hover:shadow-xl text-[#f0c986] hover:text-[#103849] transition-all hover:font-medium duration-1000 hover:bg-[#f0c986]"
                onClick={handleListToners}
              >
                Explorar productos
              </button>

              <div className="mt-auto mb-24">
                <p className="text-sm tracking-wider text-center text-[#c09665]"><span className="font-semibold text-[#c09665]">¿Dudas o necesitas ayuda?</span><br />¡Contáctanos por WhatsApp!</p>

                <a href="https://wa.me/573205682187?text=Hola%20Jorge%20Cartuchos%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20los%20t%C3%B3ners%20disponibles.%20%C2%A1Gracias!" target="_blank" rel="noopener noreferrer">
                  <button className="mt-5 rounded-md text-sm px-20 py-4 font-normal border border-transparent hover:border-[#997246] text-[#af895e] hover:text-[#f0c986] transition-all hover:font-semibold duration-700 bg-[#061922] hover:bg-[#09212c]"
                  >
                    Comunícate ahora
                    <img src="/whatsapp-tarjeta.svg" alt="logo de Whatsapp" className="w-[22px] h-auto ml-2 inline" />
                  </button>
                </a>
              </div>
            </div>

          ) : (
            <>

              <ul className="relative w-1/2 gap-2 h-min flex flex-wrap flex-1"
              >
                {productosCarrito.map(item => (

                  <div key={item.id}
                    className={`grid grid-cols-2 min-w-[271px] min-h-[173px] max-h-[190px] width-producto h-auto p-1 rounded-xl text-left transition-all duration-1000 bg-white shadow-lg shadow-[#051e2c]`}>

                    <Link
                      to={`/${slugify(item.categoria)}/${slugify(item.nombre)}-${item.id}`}
                      className="flex items-center bg-[#f2f2f2] rounded-sm w-full h-full overflow-hidden" >
                      <img src={`/${item.imagen?.portada}`}
                        alt="Imagen del producto en el carrito"
                        className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                      />
                    </Link>

                    <div className={`relative flex flex-col rounded-md h-full bg-white`}>
                      <span className="text-[#061922] font-semibold uppercase tracking-tighter margin-precio text-xl pr-3 block mb-1 leading-[24px]">{item.nombre}</span>
                      <span className="flex tracking-tight font-normal margin-inf mt-aut text-xs line-clamp-1 pr-1 text-[#103849]">{item.info}</span>
                      <div className="flex mt-auto mb-2 ml-auto mr-2">

                        {productosEnviados.some(p => p.id === item.id) && (
                          <div className="flex justify-center items-center mt-auto px-2 h-7 mr-1 rounded-full bg-[#acf1b9]"
                            title="Este producto ya fue solicitado por WhatsApp.">
                            <img
                              src="/whatsapp-confirm.svg"
                              className="opacity- transition-opacity duration-200 mr-1 group-hover:opacity-100 w-[20.5px] h-[20.5px]"
                              alt="Quitar del carrito"
                              draggable="false"
                            />
                            <img src="/cotizar.svg" className="w-[19px] h-[15px] transition-opacity duration-500 group-hover:opacity-100"
                              alt="Icono de cotizar"
                              draggable="false"
                            />

                          </div>
                        )}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="group text-[#316b84] bg-[#ffd7d7] hover:bg-[#ffc3c3] transition-all duration-300 hover:text-[#234d5f] font-light text-3xl w-12 h-7 rounded-full flex items-center justify-center"
                          title="Eliminar del carrito"
                        >
                          <img
                            src="/carrito-borrar-item.svg"
                            className="opacity-70 transition-opacity duration-200 group-hover:opacity-100 w-[16px] h-[20.5px]"
                            alt="Quitar del carrito"
                            draggable="false"
                          />
                        </button>

                      </div>

                    </div>

                  </div>

                ))}
              </ul>
            </>
          )}

        </div>
        {productosCarrito.length > 0 && (
          <div className="flex flex-row items-center w-full pt-5 pb-5 border-t border-[#224757] text-sm tracking-tight font-medium bg-[#103849] px-2 absolute bottom-0"
          >
            <button
              className="group flex justify-center items-center w-1/2 h-14 pr-2 border transition-all duration-700 border-[#103849] hover:font-semibold hover:border-[#997246] hover:bg-[#09212c] hover:text-[#c59b6b] rounded-md mr-1 text-[#997246] bg-[#061922] text-center"
              onClick={borrarProductos}
            >
              <img src="/carrito-borrar.svg" alt="Icono vaciar carrito." className="w-[12px] h-[15px] mr-2 opacity-75 group-hover:opacity-100 transition-opacity duration-700" />
              Vaciar Carrito
            </button>

            <button
              className="relative w-1/2 flex transition-all hover:shadow-[#5a5449] hover:shadow-xl rounded-md ml-1 items-center justify-center duration-1000 h-14 bg-[#997246] hover:font-semibold hover:bg-[#f0c986] text-[#061922] text-center group"
              onClick={handleRealizarPedido}
            >
              {realizarPedido ? "Cerrar Pedido" : "Realizar Pedido"}

              <img
                src="/Volver-blanco.svg"
                alt="Icono Realizar pedido"
                className={`ml-2 transition-transform duration-500 rotate-[-45deg] transform ${realizarPedido ? 'hidden' : 'right-24 group-hover:translate-x-1'}`}
                style={{ width: "15px", height: "15px" }}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                loading="lazy"
              />
            </button>
          </div>
        )}
      </div>

      <div className="form relative bg-[#061922] h-screen flex flex-col custom-scrollbar overflow-y-auto px-2 md:px-10"
        ref={formRef}
      >
        {isModalVisible && (
          <div
            className="absolute inset-0 bg-black bg-opacity-15 z-20 rounded-md"
            onClick={handleCloseModal}
          ></div>
        )}

        {totalProductosCarrito > 0 ? (
          <div className="max-w-[412px] justify-items-center place-self-center grid grid-cols-1 grid-rows-[auto,auto,50px,auto] h-auto">

            {isModalVisible && (
              <ModalPregunta
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                adClass="modal-header"
              />
            )}

            <button
              onClick={handleRealizarPedido}
              className="text-[#b18552] ml-auto absolute position-x-times right-4 font-normal flex items-center justify-center text-4xl w-8 h-8 "
            >
              <span className="inline icono-equis font-normal text-4xl cursor-pointer">
                &times;
              </span>
              <img
                src="/Volver.svg"
                alt="Icono volver"
                className="icono-flechita hidden"
                style={{ width: "17px", height: "15px" }}
                draggable="false"
                loading="eager"
              />
            </button>

            <p className="text-[#f0c986] mx-16 w-auto tracking-tight text-center text-3xl font-medium leading-7">
              REALIZAR PEDIDO <br />
              <span className="text-xl">
                por WhatsApp <img src="/whatsapp-tarjeta.svg" alt="" className="w-5 inline" />
              </span>
            </p>

            <div className="flex flex-col text-left gap-2 mt-4 md:w-96 lg:w-full text-sm font-normal text-[#c7a279]">
              <p>Los productos en tu carrito se agregarán a tu pedido.</p>
              <p className="text-left">
                Número de artículos:
                <span className="text-sm text-[#bd9568] tracking-tight font-semibold">
                  {" "}
                  {totalProductosCarrito}{" "}
                </span>
              </p>
            </div>

            <div className="h-[50px] flex items-center justify-center">
              {!camposLlenos && (
                <p className="text-xs text-center text-[#cf2e2e] font-medium">
                  Todos los espacios son necesarios
                </p>
              )}
              {correoEnviado && (
                <SetAlerta
                  message="Revisa WhatsApp para confirmar"
                  status="WhatsApp"
                />
              )}
            </div>

            <form
              className="flex-col w-full md:w-1/2 lg:w-1/2 place-self-center px-2 md:min-w-96 lg:min-w-96"
              onSubmit={onSubmitForm}
            >
              <label
                htmlFor="asunto"
                className="block pl-4 text-left uppercase text-sm font-medium mb-2 text-[#f0c986]"
              >
                Asunto
              </label>
              <input
                id="asunto"
                type="text"
                placeholder="Escribe el asunto"
                className="bg-[#103849] border-[#103849] text-[#f0c986] focus:outline-double focus:outline-[#997246] placeholder:text-[#997246] border placeholder:uppercase placeholder:text-xs rounded-sm w-full py-2.5 px-5"
                name="asunto"
                value={infoForm.asunto}
                onChange={handleChangeForm}
              />

              <label
                htmlFor="nombre"
                className="block pl-4 mt-5 text-left uppercase text-sm font-medium mb-2 text-[#f0c986]"
              >
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                autoComplete="name"
                placeholder="Escribe tu nombre"
                className="bg-[#103849] border-[#103849] text-[#f0c986] focus:outline-double focus:outline-[#997246] placeholder:text-[#997246] border placeholder:uppercase placeholder:text-xs rounded-sm w-full py-2.5 px-5"
                name="nombre"
                value={infoForm.nombre}
                onChange={handleChangeForm}
              />

              <label
                htmlFor="mensaje"
                className="block mt-5 text-left pl-4 uppercase text-sm font-medium mb-2 text-[#f0c986]"
              >
                Mensaje
              </label>
              <textarea
                id="mensaje"
                placeholder="Escribe el mensaje"
                className="placeholder:pt-1 bg-[#103849] border-[#103849] text-[#f0c986] focus:outline-double focus:outline-[#997246] placeholder:text-[#997246] border min-h-24 placeholder:uppercase placeholder:text-xs rounded-sm w-full py-2.5 px-5"
                name="mensaje"
                value={infoForm.mensaje}
                onChange={handleChangeForm}
              ></textarea>

              <button
                type="submit"
                className="block mt-4 rounded-sm bg-[#997246] transition-all duration-700 hover:font-semibold hover:shadow-xl hover:shadow-[#29442e] font-medium text-sm px-10 py-2 cursor-pointer hover:bg-[#56d872] text-[#103849]"
                disabled={isLoading}
              >
                {isLoading ? "Enviando pedido" : "Enviar pedido"}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center text-center px-6">
            <p className="text-[#f0c986] text-sm md:text-base">
              Tu carrito está vacío. Agrega productos desde la tienda para realizar un
              pedido. 💛
            </p>
          </div>
        )}
      </div>

    </div>
  )
}
