"use client";

import { Link } from "../next-link-shim";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#103849] w-full mt-auto">

      <div
        className="footer-class mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm"
      >

        <div className="block mt-12">
          <p className="text-[#f0c986] font-semibold uppercase ">Contácto</p>
          <p className="text-[#c29d73] font-medium uppercase mt-2"><span className="text-[#968068]">+57</span> 320 568 2187</p>

          <p className="text-[#f0c986] font-semibold mt-6 uppercase ">Correo Electrónico</p>
          <p className="text-[#c29d73] font-medium mt-2">jorgelo1469<span className="font-semibold">@</span>gmail.com</p>
        </div>

        <div className="block mt-12 transition-all">
          <p className="text-[#f0c986] font-semibold uppercase">Páginas</p>
          <Link to="/nosotros" className="block text-[#c29d73] font-medium uppercase mt-3 hover:text-[#8d7456]  duration-300">Acerca de Nosotros</Link>
          <Link to="/contactanos" className="text-[#c29d73] block uppercase font-medium mt-2 hover:text-[#8d7456]  duration-300">Contáctanos</Link>
          <Link to="/blog" className="block text-[#c29d73] font-medium uppercase mt-2 hover:text-[#8d7456]  duration-300">Blog</Link>
        </div>

        <div className="block mt-12">
          <p className="text-[#f0c986] font-semibold uppercase">Recursos</p>
          <Link to="/devoluciones" className="block text-[#c29d73] font-medium uppercase mt-3 hover:text-[#8d7456]  duration-300">Política de Devoluciones</Link>

        </div>

      </div>

      <div className=" text-center bg-[#f0c986] w-full h-24 md:h-16 lg:h-16 mt-10 flex justify-center">
        <div className="max-w-[1910px] grid grid-cols-3  place-items-center">
          <p className="text-[#103849] lg:text-sm text-xs text-left pl-2 lg:pl-8 md:ml-10 font-medium font-sans">© {year} <span className="whitespace-nowrap">Jorge Cartuchos</span> Empresa Limitada. Todos Los Derechos Reservados.</p>

          <Link to="/" className="flex items-center">
            <img src="/logox25-black.svg" alt="Logo de Jorge Cartuchos" className="w-7" />
            <span className="pl-2 mt-0.5 logo-footer-text text-[#103849] whitespace-nowrap text-center font-semibold uppercase tracking-tight">Jorge Cartuchos</span>
          </Link>

          <div className="flex ml-auto md:mr-10 lg:mr-36">
            <a href="https://www.facebook.com/profile.php?id=100067410135870"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 mr-4">
              <img src="/facebook.svg" alt="Logo de Facebook" className="w-[32px]"
                loading="lazy" />
            </a>
            <a href="https://wa.me/573205682187?text=Hola%20Jorge%20Cartuchos%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20los%20t%C3%B3ners%20disponibles.%20%C2%A1Gracias!"
              className="w-8 h-8 mr-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/whatsapp.svg" alt="logo de Whatsapp" className="w-[32px] rounded-md"
                loading="lazy" />

            </a>
          </div>
        </div>
      </div>

    </footer>
  )
}
