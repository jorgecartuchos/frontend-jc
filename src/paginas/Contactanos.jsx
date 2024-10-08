import { useEffect, useState } from "react";

import { useInicio } from "../hooks/useInicio";
import { SetAlerta, Modal } from "../components/";
import { camposValidosCorreo, respuestasFormulario } from "../helpers";
import { Helmet } from "react-helmet-async";

export const Contactanos = () => {

  const [camposLlenos, setCamposLlenos] = useState(true);
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const [mensaje, setMensaje] = useState({message: '', status: null});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setInfoForm, infoForm, sentContact, totalProductosCarrito, realizarPedido, isCartOpen } = useInicio();

  const handleToggle = () => {
    if(totalProductosCarrito > 0){
      setInfoForm( prev => ({...prev, activarCarrito: !prev.activarCarrito}));
    } 
  }

  const handleEnviar = async (e) => {
    e.preventDefault();

    if(camposValidosCorreo(infoForm)){
      setCamposLlenos(true);
      setIsLoading(true);
      try {
        const response = await sentContact(infoForm);
        setIsLoading(false);
        respuestasFormulario(response, setMensaje, setIsModalVisible);
        
      } catch (error) {
        console.log(error);
        setMensaje({ message: "Error desconocido. Intenta más tarde", status: "Desconocido" });
      }
      
      setCorreoEnviado(true);
      resetForm();
    } else{ 
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
    const {name, value} = e.target;
    setInfoForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setInfoForm((prev) => ({...prev, activarCarrito: false}));
  }, [totalProductosCarrito])
  
  return (
    <>
    <Helmet>
      <title>Contáctanos - Jorge Cartuchos</title>
      <meta name="description" content="Ponte en contacto con Jorge Cartuchos para consultas sobre nuestros toners láser. Envía tu solicitud por correo, incluyendo productos del carrito para una atención personalizada y eficiente." />
      <meta name="keywords" content="contacto Jorge Cartuchos, consulta toners láser, soporte Jorge Cartuchos, atención al cliente Bogotá, enviar correo Jorge Cartuchos, productos del carrito, asistencia personalizada" />

      <meta property="og:title" content="Contáctanos - Jorge Cartuchos"/>
      <meta property="og:description" content="Ponte en contacto con Jorge Cartuchos para consultas sobre nuestros toners láser. Envía tu solicitud por correo, incluyendo productos del carrito para una atención personalizada y eficiente."/>
      <meta property="og:type" content="website" />

      <meta property="og:image" content="https://drive.google.com/uc?export=view&id=1OdDSlGR9LuJCk2vLs1aPnjAhyoXHbWGh"/>
      <meta property="og:url" content="https://jorgecartuchos.vercel.app/contactanos"/>
      
      <meta name="twitter:card" content="https://drive.google.com/uc?export=view&id=1OdDSlGR9LuJCk2vLs1aPnjAhyoXHbWGh" />
      <meta name="twitter:title" content="Contáctanos - Jorge Cartuchos" />
      <meta name="twitter:description" content="Ponte en contacto con Jorge Cartuchos para consultas sobre nuestros toners láser. Envía tu solicitud por correo, incluyendo productos del carrito para una atención personalizada y eficiente." />
      <meta name="twitter:image" content="https://drive.google.com/uc?export=view&id=1OdDSlGR9LuJCk2vLs1aPnjAhyoXHbWGh" />
      <meta name="twitter:url" content="https://jorgecartuchos.vercel.app/contactanos" />

    </Helmet>

      <Modal isVisible={isModalVisible} onClose={handleCloseModal} adClass="modal-contactanos"/>

      <div className={`${realizarPedido || isCartOpen ? 'cursor-none' : ''} mt-20 lg:w-[405px] padding-contacto md:w-[405px] lg:mb-36 md:mb-28 mb-28 relative grid grid-cols-1 mx-auto align-self-center h-auto text-center max-w-[405px]`}
      >
        <h2 className="font-montserrat uppercase text-n-c font-medium tracking-tight">Contáctanos</h2>

        <div className="relative items-center mt-contactanos grid grid-cols-[10fr_2fr] grid-rows-1 mx-3">

          <p className={`font-montserrat font-medium transition-colors text-sm text-left mr-auto md:mr-0 lg:mr-0 tracking-wid ${infoForm.activarCarrito ? 'text-[#3f3f3f]' : 'text-[#bebebe]'}`}>Agregar al correo productos del  <span className="whitespace-nowrap">{`carrito ( ${totalProductosCarrito} )`}</span></p>

          <div
            className={`mt-auto w-10 h-5 items-center rounded-full transition-colors duration-300 ${infoForm.activarCarrito ? "bg-[#56d872]" : "bg-[#a0a0a0]"
            }`}
            onClick={handleToggle}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 border-[#e6e6e6] bg-[#ffffff] transition-transform duration-300 transform ${
                infoForm.activarCarrito ? "translate-x-5" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>

        <div className="mx-3">
          <p className="mt-3 font-montserrat text-sm text-[#a3a3a3] text-contactos text-justify">*Al activar el botón, los productos seleccionados en el carrito se incluirán en el correo. No es obligatorio usar esta opción.</p>
        </div>

        {!camposLlenos &&
          <p className="font-montserrat text-xs text-center text-[#cf2e2e] mt-3 mb-2 font-medium">*Todos los espacios son necesarios</p>
        }

        { isLoading && (
          <SetAlerta message={"Espera un momento, por favor"} status="esperar"/>
        )
        }
       
        { correoEnviado && (
          <SetAlerta message={mensaje.message} status={mensaje.status}/>
        )
        }

        <form className={`flex-col w-full md:w-1/2 lg:w-1/2 place-self-center px-2 md:min-w-96 lg:min-w-96 transition-colors ${camposLlenos && !correoEnviado && !isLoading ? 'mt-10' : 'mt-1'}`}
          onSubmit={handleEnviar}
          disabled={realizarPedido}
        >
          <label htmlFor="nombre" className="block pl-4 text-left font-montserrat uppercase text-sm font-medium mb-2">Nombre</label>
          <input id="nombre" type="text" autoComplete="name" placeholder="Escribe tu nombre" className={`placeholder:font-montserrat placeholder:text-[#dbdbdb] border placeholder:uppercase placeholder:text-xs rounded-sm font-montserrat w-full  py-1.5 px-5 duration-300 ${infoForm.activarCarrito ? 'bg-[#e8ffed] border-[#b4ffc4]' : 'bg-white border-[#dcdcdc]'}`} 
          name="nombre"
          value={infoForm.nombre}
          onChange={handleChange}
          />

          <label htmlFor="email" className="block mt-5 pl-4 text-left font-montserrat uppercase text-sm font-medium mb-2">Correo Electrónico</label>
          <input id="email" type="email" placeholder="Escribe tu correo electrónico" className={`placeholder:font-montserrat border placeholder:text-[#dbdbdb] placeholder:uppercase placeholder:text-xs rounded-sm font-montserrat w-full py-1.5 px-5 duration-300 ${infoForm.activarCarrito ? 'bg-[#e8ffed] border-[#b4ffc4]' : 'bg-white border-[#dcdcdc]'}`} 
          name="correo"
          value={infoForm.correo}
          onChange={handleChange}
          />

          <label htmlFor="asunto" className="block mt-5 pl-4 text-left font-montserrat uppercase text-sm font-medium mb-2">Asunto</label>
          <input id="asunto" type="text" placeholder="Escribe el asunto" className={`placeholder:font-montserrat border placeholder:text-[#dbdbdb] placeholder:uppercase placeholder:text-xs rounded-sm font-montserrat w-full py-1.5 px-5 duration-300 ${infoForm.activarCarrito ? 'bg-[#e8ffed] border-[#b4ffc4]' : 'bg-white border-[#dcdcdc]'}`} 
          name="asunto"
          value={infoForm.asunto}
          onChange={handleChange}
          />

          <label htmlFor="mensaje" className="block mt-5 text-left pl-4 font-montserrat uppercase text-sm font-medium mb-2">Mensaje</label>
          <textarea id="mensaje" placeholder="Escribe el mensaje" className={`placeholder:pt-1 placeholder:font-montserrat border placeholder:text-[#dbdbdb] placeholder:uppercase placeholder:text-xs rounded-sm font-montserrat w-full py-1.5 px-5 min-h-24 duration-500 ${infoForm.activarCarrito ? 'bg-[#e8ffed] border-[#b4ffc4]' : 'bg-white border-[#dcdcdc]'}`}
          name="mensaje"
          value={infoForm.mensaje}
          onChange={handleChange}
          ></textarea>

          <button type="submit" className={`block mt-4 rounded-sm bg-white duration-500 font-montserrat font-medium text-sm px-10 py-2 cursor-pointer ${infoForm.activarCarrito ? 'hover:bg-[#56d872] hover:text-white' : 'hover:bg-black hover:text-white'}`}
          disabled={isLoading}
          >{isLoading ? 'Enviando' : 'Enviar'}</button>
        </form>
      </div>
    </>
  )
}

