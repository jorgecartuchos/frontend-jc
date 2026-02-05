"use client";

export const BtnWhatsApp = () => {
  return (
    <a href="https://wa.me/573205682187?text=Hola%20Jorge%20Cartuchos%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20los%20t%C3%B3ners%20disponibles.%20%C2%A1Gracias!" target="_blank" rel="noopener noreferrer">
        <button className="z-10 group bg-gradient-to-br from-[#22c55e] via-[#25D366] to-[#16a34a] fixed hover:scale-110 transition-transform duration-300 rounded-full shadow-border-bottom w-14 h-14 w-position-mobile right-1 md:right-3 bottom-16 overflow-hidden flex items-center justify-center"
        title="Atención inmediata por WhatsApp."
        >
            <img src="/wasa.svg" alt="Logo de whatsApp" className="max-w-[33px] group-hover:scale-110 transition-transform duration-500 max-h-[33px] img-w-icono mx-auto" draggable="false" />
        </button>
    </a>
  )
}
