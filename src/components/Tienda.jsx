import { useEffect, useState, useRef, Suspense, lazy } from "react"

import { useInicio } from "../hooks/useInicio";
// import { Carruseles } from "./Carruseles";

const Carruseles = lazy(() => import('../components/Carruseles'))

export const Tienda = () => {

    const { tiendaRef, activeButton, setActiveButton, scrollTiendaFunction } = useInicio();

  const handleListToners = (e) => {
    const nameButton = e.target.innerHTML;
    setActiveButton(nameButton);
    scrollTiendaFunction();  
  };

    const [isFixed, setIsFixed] = useState(false);

  const [navHeight, setNavHeight] = useState(0);
  const [navTopStyle, setNavTopStyle] = useState(59)
  const navRef = useRef(null);
  const navTopRef = useRef(0);

  const handleScroll = () => {
    if (window.scrollY >= navTopRef.current) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

    useEffect(() => {
        const nav = navRef.current;
    
        const updateNavTopRef = () => {
    
          if(window.innerWidth >= 1920){
            navTopRef.current = nav.offsetTop - 50;
            setNavTopStyle(49);
          } else if(window.innerWidth >= 810){
            navTopRef.current = nav.offsetTop - 50;
            setNavTopStyle(49);
          } else {
            navTopRef.current = nav.offsetTop - 60;
            setNavTopStyle(56);
          }
        };
    
        updateNavTopRef();
        const handleResize = () => {
          updateNavTopRef();
        }
    
        const navTotalHeight = nav.offsetHeight + 20;
        setNavHeight(navTotalHeight); 
    
        const handleScrollSave = () => {
          sessionStorage.setItem('scrollPosition', window.scrollY);
        };
        
        window.addEventListener('scroll', handleScrollSave);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('scroll', handleScrollSave);
          window.removeEventListener('resize', handleResize)
        };
      }, []);

  return (
    <div className="mt-20 mb-28" ref={tiendaRef} >

      <h2 className="font-montserrat tracking-tighter font-medium text-3xl uppercase text-center mb-4">Cartuchos</h2>

      <div style={{ 
        height: isFixed ? navHeight : 0
        }} 
      />

      <nav className={`mb-11 ${isFixed ? 'fixed left-0 right-0 z-20 border-b border-[#e4e4e4] backdrop-blur bg-[#f2f2f2] bg-opacity-80' : ''}`}
        id="nav"
        ref={navRef}
        style={{top: `${navTopStyle}px`}}
      >
        <ul className="flex-wrap flex md:flex lg:flex pt-5 md:pt-6 lg:pt-6 gap-y-3 justify-center text-xs md:text-sm lg:text-sm space-x-6 md:space-x-8 lg:space-x-8 ">
          <li>
            <button onClick={handleListToners} className={activeButton === 'Todos' ? 'active nav-item2 font-normal uppercase font-montserrat tracking-tight' : 'nav-item2 font-normal text-[#757575] uppercase font-montserrat tracking-tight'}>Todos</button></li>
          <li>
            <button onClick={handleListToners} className={activeButton === 'HP' ? 'active nav-item2 font-normal uppercase font-montserrat tracking-tight' : 'nav-item2 font-normal text-[#757575]  uppercase font-montserrat tracking-tight'}>HP</button></li>
          <li>
            <button onClick={handleListToners} className={ activeButton === 'Lexmark' ? 'active nav-item2 font-normal uppercase font-montserrat tracking-tight' : 'nav-item2 font-normal text-[#8a8a8a] uppercase font-montserrat tracking-tight'}>Lexmark</button></li>
          <li>
            <button onClick={handleListToners} className={ activeButton === 'Samsung' ? 'active nav-item2 font-normal uppercase font-montserrat tracking-tight' : 'nav-item2 font-normal text-[#757575] uppercase font-montserrat tracking-tight'}>Samsung</button></li>
          <li>
            <button onClick={handleListToners} className={ activeButton === 'Kyocera' ? 'active nav-item2 font-normal uppercase font-montserrat tracking-tight' : 'nav-item2 font-normal text-[#757575] uppercase font-montserrat tracking-tight'}>Kyocera</button></li>
        </ul>
      </nav>

      
      <Suspense fallback={<p className="text-center text-[#000000] font-montserrat tracking-wider fadeInOut cursor-default">Cargando...</p>}>
        <Carruseles />
      </Suspense>
    </div>
  )
}
