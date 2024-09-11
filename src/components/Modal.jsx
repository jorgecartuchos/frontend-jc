export const Modal = ({ isVisible, onClose, adClass }) => {

  return (
    <div
      className={`${adClass} bottom-20 z-20 right-5 p-4 max-w-72 px-10 py-7 bg-white rounded-sm border border-[#f2f2f2] shadow-md transition-transform transform ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      style={{ transition: 'transform 0.3s ease-out, opacity 0.3s ease-out' }}
    >
      <div className="flex flex-col items-center font-montserrat text-sm">
        <p>Por favor, revisa tu correo.<br /> Gracias por tu atención.</p>
        <img src="/msg.png" alt="Mensaje" className="mt-3"
        loading="lazy"/>

        <button onClick={onClose} className="mt-4 transition duration-300 text-[#cfcfcf] font-light hover:text-[#8f8f8f]">
          Cerrar
        </button>
      </div>
    </div>
  )
}
