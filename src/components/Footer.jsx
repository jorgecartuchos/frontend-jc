import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export const Footer = () => {

  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, [])

  return (
    <footer className="bg-white w-full flex-col mr-72 mt-auto ">

          <div className="grid grid-cols-1 pl-8 md:pl-0 lg:pl-0 md:flex lg:flex justify-center text-xs lg:text-base md:text-sm">

            <div className="block mt-12 lg:mr-32 md:mr-14">
                <p className="font-montserrat font-semibold uppercase ">Contácto</p>
                <p className="font-montserrat font-regular uppercase mt-3">+57 (320) 568 2187</p>

                <p className="font-montserrat font-semibold mt-4 uppercase ">Correo Electrónico</p>
                <p className="font-montserrat font-regular mt-3">contacto.jorgecartuchos<span className="font-medium">@</span>gmail.com</p>
            </div>

            <div className="block mt-12 lg:mr-32 md:mr-14">
                <p className="font-montserrat font-semibold uppercase ">Páginas</p>
                <Link to="/nosotros" className="block font-montserrat font-regular uppercase mt-3">Acerca de Nosotros</Link>

                <Link to="/contactanos" className="font-montserrat block uppercase font-regular mt-4">Contáctanos</Link>
            </div>

            <div className="block mt-12">
                <p className="font-montserrat font-semibold uppercase ">Recursos</p>
                <Link to="/devoluciones" className="block font-montserrat font-regular uppercase mt-3">Política de Devoluciones</Link>

            </div>

          </div>  

          <div className="grid grid-cols-3 text-center place-items-center bg-black w-full h-24 md:h-16 lg:h-16 mt-10">
            <p className="text-white lg:text-sm text-xs text-left pl-2 lg:pl-8 md:ml-10 font-thin ">© {year} Jorge Cartuchos Empresa Limitada. Todos Los Derechos Reservados.</p>

            <Link to="/"
              className="flex-grow lg:text-base text-xs md:tracking-tight lg:pt-3 lg:ml-8 leading-3 text-center font-montserrat font-thin md:font-light lg:font-medium text-white uppercase lg:tracking-tight">Jorge<span className="block -top-0 relative lg:-top-2.5 font-normal md:font-semibold lg:font-bold">Cartuchos</span></Link>

            <div className="flex ml-auto md:mr-10 lg:mr-36">
              <a href="https://www.facebook.com/profile.php?id=100067410135870" 
              target="_blank"
                className="bg-[#3a3a3a] w-8 h-8 relative rounded-full mr-4 border border-[#d6d6d6]">
                  <img src="../../public/facebook.png" alt="Logo de Facebook" className="absolute right-[0.46rem] top-[0.22rem] w-[16px] rounded-md" 
                  loading="lazy"/>
                </a>
              <a href="https://wa.me/573205682187?text=Hola%20Jorge%20Cartuchos%2C%20me%20interesa%20un%20cartucho"
                className="bg-[#3a3a3a] w-8 h-8 relative rounded-full mr-2 border border-[#d6d6d6]"
                target="_blank"
                >
                  <img src="../../public/whatsapp.png" alt="logo de Whatsapp" className="absolute right-[0.285rem] top-[0.28rem] w-[21px] rounded-md" 
                  loading="lazy"/>

                </a>
            </div>
          </div>

        </footer>
  )
}
