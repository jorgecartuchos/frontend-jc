"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useInicio } from "../hooks/useInicio";

import { Header, Footer, MenuBurger, Cart, Overlay, BtnWhatsApp } from "../components";

const Layout = ({ children }) => {

  const pathname = usePathname();
  const location = { pathname: pathname ?? "/" };

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
    const validPaths = ["/devoluciones", "/nosotros", "/contactanos", "/", "/blog"];

    if (validPaths.includes(location.pathname)) {
      const section = document.getElementById("header-top");
      if (section) {
        section.scrollIntoView({ block: "start" });
      }
    }
  }, [location.pathname]);

  const [showBtnWhatsApp, setShowBtnWhatsApp] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY + window.innerHeight;
      const docHeight = document.body.offsetHeight;
  
      if (scrollTop >= docHeight - 100) {
        setShowBtnWhatsApp(false);
      } else {
        setShowBtnWhatsApp(true);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div id="header-top" className="relative flex flex-col w-full custom-scrollbar font-montserrat bg-[#061922] min-h-screen">

        <Header />
        <MenuBurger />
        <Cart />
        <Overlay /> 

        <div className={`transition-opacity duration-500 ${showBtnWhatsApp ? "opacity-100" : "opacity-0 md:opacity-40"}`}>
          <BtnWhatsApp />
        </div>

        
        <main className="flex-1">{children}</main>

        <Footer />
      </div>    
    </>
  )
}

export default Layout;