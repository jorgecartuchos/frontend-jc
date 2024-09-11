import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { useInicio } from "../hooks/useInicio";

import { Header, Footer } from "../components";


const Layout = () => {

  const location = useLocation();

  const { setInfoForm, infoForm, isCartOpen, realizarPedido } = useInicio(); 

  useEffect(() => {
    let stateSaved = infoForm.activarCarrito

    if(isCartOpen && realizarPedido && !stateSaved){
      setInfoForm((prev) => ({...prev, activarCarrito: true}));
    }

    if(!isCartOpen && !realizarPedido){
    setInfoForm((prev) => ({...prev, activarCarrito: false}));
    }

    if(location.pathname === '/contactanos' && !isCartOpen && !realizarPedido){
      if(stateSaved){
        setInfoForm((prev) => ({...prev}));
      } else {
        setInfoForm((prev) => ({...prev, activarCarrito: false}));
      }
    }
  }, [realizarPedido]);
  
  useEffect(() => {
    const validPaths = ["/devoluciones", "/nosotros", "/contactanos", "/"]
    const isProductPath = location.pathname.startsWith("/producto");

    if(validPaths.includes(location.pathname)){
      const section = document.getElementById("header-top");
      if(section){
        section.scrollIntoView({ behavior: 'smooth', block: 'start'})
      }
    }
    if(isProductPath){
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <div id="header-top" className="w-full flex-col min-h-screen bg-[#f2f2f2] flex overflow-hidden" >

        <Header />
        
        <main className="margin-main custom-scrollbar">
          <Outlet />
        </main>

        <Footer />

      </div>    

    </>
  )
}

export default Layout