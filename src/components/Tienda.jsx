import { useEffect, useState, useRef, Suspense, lazy } from "react"

import { useInicio } from "../hooks/useInicio";
import { debounce } from "../helpers";

const Carruseles = lazy(() => import('../components/Carruseles'))

export const Tienda = () => {

    const { tiendaRef, activeButton, setActiveButton, scrollTiendaFunction } = useInicio();

  const handleListToners = (e) => {
    const nameButton = e.target.innerHTML;
    setActiveButton(nameButton);
    scrollTiendaFunction();  
  };
  
  const [navHeight, setNavHeight] = useState(null);
  const navRef = useRef(null);
  const navTopRef = useRef(0);
  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsFixed(currentScrollY >= navTopRef.current);
  };

  
  useEffect(() => {
    const nav = navRef.current;
  
    const storedNavTopRef = sessionStorage.getItem('navTopRef');
    const navRect = nav.getBoundingClientRect();
    
    const updateNavTopRef = () => {
      setTimeout(() => {
        if (window.innerWidth >= 810) {
          navTopRef.current = navRect.top - 59;
          setNavHeight(navRect.height + 20);

        } else {
          navTopRef.current = navRect.top - 60;
          setNavHeight(navRect.height + 20);

        }
        
        if (navTopRef.current >= 1000 && navTopRef.current <= 2000 && ![-1, -4, 1].includes(navTopRef.current)) {
          sessionStorage.setItem('navTopRef', navTopRef.current);
        }
      }, 500);
    };
    
    if (storedNavTopRef && parseInt(storedNavTopRef, 10) >= 1000 && ![-1, -4, 1].includes(parseInt(storedNavTopRef, 10))) {
      navTopRef.current = parseInt(storedNavTopRef, 10);
    } else {
      updateNavTopRef();
    }
    
    const handleResize = debounce(() => {
        updateNavTopRef(); 
    }, 100);

    const handleScrollSave = debounce(() => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
    }, 100);
  
    setNavHeight(navRect.height + 20);
  
    window.addEventListener('scroll', handleScrollSave);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollSave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="mt-20 mb-28" ref={tiendaRef} >

      <h2 className="font-montserrat tracking-tighter font-medium text-3xl uppercase text-center mb-4">Cartuchos</h2>

      <div style={{ 
        height: isFixed ? `${navHeight}px` : 0
        }} 
      />

      <nav className={`mb-11 ${isFixed ? 'fixed border-b border-[#e4e4e4] backdrop-blur bg-[#f2f2f2] bg-opacity-80' : ''}`}
        id="nav"
        ref={navRef}
      >
        <ul className="flex-wrap flex gap-y-0.5 justify-center text-xs md:text-sm lg:text-sm space-x-6 md:space-x-8 lg:space-x-8">
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
