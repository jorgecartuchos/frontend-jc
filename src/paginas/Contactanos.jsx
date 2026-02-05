"use client";

import { useEffect, useState } from "react";

import { useInicio } from "../hooks/useInicio";
import { SetAlerta, Modal, ModalWhatsApp } from "../components/";
import { camposValidosCorreo, respuestasFormulario } from "../helpers";

export const Contactanos = () => {

  const [camposLlenos, setCamposLlenos] = useState(true);
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const [mensaje, setMensaje] = useState({ message: '', status: null });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalWVisible, setIsWModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setInfoForm, infoForm, sentContact, totalProductosCarrito, realizarPedido, isCartOpen } = useInicio();

  const handleToggle = () => {
    if (totalProductosCarrito > 0) {
      setInfoForm(prev => ({ ...prev, activarCarrito: !prev.activarCarrito }));
    }
  }

  const handleEnviar = async (e) => {
    e.preventDefault();

    if (camposValidosCorreo(infoForm)) {
      setCamposLlenos(true);
      setIsLoading(true);
      try {
        const response = await sentContact(infoForm);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setIsLoading(false);

        const shouldShowWhatsApp =
          !response ||
          !response.status ||
          (response.status !== 200 && response.status !== 400 && response.status !== 500);

        respuestasFormulario(response, setMensaje, setIsModalVisible);

        if (shouldShowWhatsApp) {
          setIsWModalVisible(true);
        }
      } catch (error) {
        console.log(error);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setIsLoading(false);
        setMensaje({ message: "Error desconocido. Intenta más tarde", status: "Desconocido" });
        setIsWModalVisible(true);
      }
      setCorreoEnviado(true);
      resetForm();
    } else {
      setCamposLlenos(false);
    }
  };

  const resetForm = () => {
    setInfoForm({
      nombre: "",
      correo: "",
      asunto: "",
      mensaje: "",
      activarCarrito: false,
    });
    setTimeout(() => {
      setCorreoEnviado(false);
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsWModalVisible(false);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 950);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setInfoForm((prev) => ({ ...prev, activarCarrito: false }));
  }, [totalProductosCarrito]);

  useEffect(() => {
    if (!isCartOpen) return;
    const t = setTimeout(() => setIsModalVisible(false), 0);
    return () => clearTimeout(t);
  }, [isCartOpen]);

  return (
    <>
      {isModalVisible && isMobile && (
        <div className="absolute inset-0 bg-black bg-opacity-15 z-30 rounded-md"
          onClick={handleCloseModal}
        ></div>
      )}

      <div
        className={`${realizarPedido || isCartOpen ? 'cursor-none' : ''} mt-28 lg:w-[405px] md:w-[405px] lg:mb-28 md:mb-16 mb-16 relative grid grid-cols-1 grid-rows-[auto,auto,auto,50px,auto] mx-auto items-center text-center max-w-[405px]`}>

        {isModalVisible &&
          <Modal isVisible={isModalVisible} onClose={handleCloseModal} adClass="modal-contactanos" />
        }

        {isModalWVisible &&
          <ModalWhatsApp isVisible={isModalWVisible} onClose={handleCloseModal} adClass="modal-contactanos-w" />
        }

        <h1 className="uppercase text-n-c font-medium tracking-tight text-[#f0c986]">Contáctanos</h1>

        <div className="relative items-center mt-contactanos flex gap-x-4 grid-rows-1 mx-3">
          <p
            className={`transition-all duration-1000 font-medium text-sm text-left tracking-wid ${infoForm.activarCarrito ? 'text-[#f0c986] contac-shadow' : 'text-[#b18654]'
              }`}
          >
            Incluir carrito{' '}
            <span className="whitespace-nowrap">{`( ${totalProductosCarrito} )`}</span>
          </p>
          <div
            className={`mt-auto w-10 h-5 items-center rounded-full transition-all ${infoForm.activarCarrito ? 'bg-[#b18654]' : 'bg-[#1d3641]'
              }`}
            onClick={handleToggle}
          >
            <div
              className={`w-5 h-5 rounded-full bg-[#061922] border-2 transition-transform duration-300 transform ${infoForm.activarCarrito
                ? 'translate-x-5 border-[#b18654]'
                : 'translate-x-0 border-[#1d3641]'
                }`}
            ></div>
          </div>
        </div>

        <div className="mx-3">
          <p className="mt-3 text-sm text-[#b9a389] text-contactos text-justify">Al activarlo, los productos seleccionados se adjuntarán al correo. Es opcional.
          </p>
        </div>

        <div className="mx-3 flex flex-col justify-center">
          {!camposLlenos && (
            <p className="text-xs text-center text-[#cf2e2e] font-medium">
              Todos los espacios son necesarios
            </p>
          )}
          {isLoading && (
            <SetAlerta message="Espera un momento, por favor" status="esperar" />
          )}
          {correoEnviado && (
            <SetAlerta message={mensaje.message} status={mensaje.status} />
          )}

        </div>

        <form
          className="flex-col w-full md:w-1/2 lg:w-1/2 place-self-center px-2 md:min-w-96 lg:min-w-96 transition-colors"
          onSubmit={handleEnviar}
          disabled={realizarPedido}
        >
          <label htmlFor="nombre" className="block pl-4 text-left uppercase text-sm font-medium mb-2 text-[#f0c986]">
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
            onChange={handleChange}
          />

          <label htmlFor="email" className="block mt-5 pl-4 text-left uppercase text-sm font-medium mb-2 text-[#f0c986]">
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Escribe tu correo electrónico"
            className="bg-[#103849] border-[#103849] text-[#f0c986] focus:outline-double focus:outline-[#997246] placeholder:text-[#997246] border placeholder:uppercase placeholder:text-xs rounded-sm w-full py-2.5 px-5"
            name="correo"
            value={infoForm.correo}
            onChange={handleChange}
          />

          <label htmlFor="asunto" className="block mt-5 pl-4 text-left uppercase text-sm font-medium mb-2 text-[#f0c986]">
            Asunto
          </label>
          <input
            id="asunto"
            type="text"
            placeholder="Escribe el asunto"
            className="bg-[#103849] border-[#103849] text-[#f0c986] focus:outline-double focus:outline-[#997246] placeholder:text-[#997246] border placeholder:uppercase placeholder:text-xs rounded-sm w-full py-2.5 px-5"
            name="asunto"
            value={infoForm.asunto}
            onChange={handleChange}
          />

          <label htmlFor="mensaje" className="block mt-5 text-left pl-4 uppercase text-sm font-medium mb-2 text-[#f0c986]">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            placeholder="Escribe el mensaje"
            className="placeholder:pt-1 bg-[#103849] border-[#103849] text-[#f0c986] focus:outline-double focus:outline-[#997246] placeholder:text-[#997246] border min-h-24 placeholder:uppercase placeholder:text-xs rounded-sm w-full py-2.5 px-5"
            name="mensaje"
            value={infoForm.mensaje}
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            className="block mt-4 rounded-sm bg-[#997246] transition-all duration-700 hover:font-semibold hover:shadow-xl hover:shadow-[#5a5449] font-medium text-sm px-10 py-2 cursor-pointer hover:bg-[#f0c986] text-[#103849]"
            disabled={isLoading}
          >
            {isLoading ? 'Enviando mensaje' : 'Enviar mensaje'}
          </button>
        </form>
      </div>
    </>
  )
}

