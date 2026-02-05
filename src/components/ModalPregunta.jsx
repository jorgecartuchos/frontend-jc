"use client";

import { useState } from "react";
import { useInicio } from "../hooks/useInicio";

import { useNavigate } from "../router-shim";

export const ModalPregunta = ({ isVisible, onClose, adClass }) => {
  const navigate = useNavigate();
  
  const [mensajeFinal, setMensajeFinal] = useState(false);

    const  { productosCarrito, setProductosEnviados, setIsCartOpen, setRealizarPedido } = useInicio();

    const handleConfirma = () => {
            const ttl = 7 * 24 * 60 * 60 * 1000;
            const now = new Date();
  
            const item = {
              value: productosCarrito,
              expiry: now.getTime() + ttl,
            };
            localStorage.setItem('productosEnviados', JSON.stringify(item));
            setProductosEnviados(productosCarrito);
            onClose();
            setRealizarPedido(false);
    }
    
    const handleNoConfirma = () => {
        setMensajeFinal(true);
    }

    const navigateContactanos = () => {
        setIsCartOpen(false);
        setRealizarPedido(false);
        navigate("/contactanos");
    }

    return (
      <div
        className={`${mensajeFinal ? '!max-h-48' : ''} ${adClass} bottom-8 z-30 right-5 p-4 max-w-72 px-10 py-7 bg-white rounded-md shadow-md transition-transform transform ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        } ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{ transition: 'transform 0.3s ease-out, opacity 0.3s ease-out' }}
      >
        { mensajeFinal ? (<div className="flex flex-col text-[#202020] text-center items-center text-sm">

          <p>Si no pudiste enviar el mensaje, también puedes comunicarte a través de la sección <button onClick={navigateContactanos} className="underline hover:font-medium transition-all duration-500 text-[#5e3e1a] hover:text-[#271a0b]">Contáctanos</button> de la web. ¡Gracias!</p>
          
          <button onClick={onClose} className="mt-4 transition duration-300 text-[#868686] font-light hover:text-[#000]">
            Cerrar
          </button>
        </div>) : (<div className="flex flex-col text-[#202020] font-medium text-center items-center text-sm">
          <p>¿Pudiste enviar el mensaje a través de WhatsApp?</p>

          <div className="flex gap-8 mt-3 ">
            <button 
                onClick={handleConfirma}
                className="transition-all duration-500 rounded-md px-6 py-1.5 text-[#41834f] hover:text-[#0f2013] hover:font-medium hover:bg-[#6ddd86] bg-[#9beead]">Si</button>
            <button 
                onClick={handleNoConfirma}
                className="transition-all hover:font-medium text-[#8b3c3c] duration-500 rounded-md px-6 py-1.5 bg-[#eb7f7f] hover:text-[#381818] hover:bg-[#e96363]">No</button>
          </div>
  
          <button onClick={onClose} className="mt-4 transition duration-300 text-[#868686] font-light hover:text-[#000]">
            Cerrar
          </button>
        </div>)

        }
        
      </div>
    )
  }