"use client";

export const Modal = ({ isVisible, onClose, adClass }) => {

  return (
    <div
      className={`${adClass} absolute bottom-20 z-40 right-5 p-4 max-w-72 px-10 py-7 bg-[#103849] rounded-md border border-[#997246] shadow-md transition-transform transform ${isVisible ? 'translate-y-0' : 'translate-y-full'
        } ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      style={{ transition: 'transform 0.3s ease-out, opacity 0.3s ease-out' }}
    >
      <div className="flex flex-col text-[#f0c986] items-center text-sm">
        <p>Por favor, revisa tu correo.<br /> Gracias por tu atención.</p>
        <img src="/msg.svg" alt="Mensaje" className="mt-3 shadow-md w-[27px] h-auto"
          loading="lazy" />

        <button onClick={onClose} className="mt-4 transition duration-300 text-[#997246] font-light hover:text-[#f0c986]">
          Cerrar
        </button>
      </div>
    </div>
  )
}
