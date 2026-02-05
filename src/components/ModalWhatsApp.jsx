"use client";

export const ModalWhatsApp = ({ isVisible, onClose, adClass }) => {

  return (
    <div
      className={`${adClass} absolute bottom-20 z-50 right-5 min-w-64 min-h-[185px] max-w-72 max-h-[186px] px-5 pt-5 pb-5 bg-[#103849] rounded-lg border border-[#997246] shadow-md transition-transform transform ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      style={{ transition: 'transform 0.3s ease-out, opacity 0.3s ease-out' }}
    >
      <div className="flex flex-col text-[#dfbd84] items-center text-sm">
        <p className="font-medium">En este momento no podemos recibir mensajes por correo.</p>
        <span className="font-normal mt-2 text-[#d6ad7f]">Por favor, contáctanos a través de{" "}
        <a
          href="https://api.whatsapp.com/send/?phone=573205682187&text=Hola+Jorge+Cartuchos%2C+me+gustar%C3%ADa+recibir+informaci%C3%B3n+sobre+los+t%C3%B3ners+disponibles.+%C2%A1Gracias%21&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#dfbd84]"
        >
          WhatsApp
        </a>. <img src="/whatsapp-tarjeta.svg" alt="WhatsApp" className="inline shadow-md w-[19px] h-[19px]"
              loading="lazy"/></span>
        <button onClick={onClose} className="mt-4 transition duration-300 text-[#997246] font-light hover:text-[#f0c986]">
          Cerrar
        </button>
      </div>
    </div>
  )
}
