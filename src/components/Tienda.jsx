"use client";

import { Suspense, lazy, useEffect, useLayoutEffect } from "react"

import { useInicio } from "../hooks/useInicio";

import { debounce } from "../helpers";

const Carruseles = lazy(() => import('../components/Carruseles'));

export const Tienda = () => {

    const { tiendaRef, activeButton, setActiveButton, scrollTiendaFunction } = useInicio();

  const handleListToners = (e) => {
    const nameButton = e.target.innerHTML;
    setActiveButton(nameButton);
    scrollTiendaFunction();  
  };

  useEffect(() => {
    const handleScrollSave = debounce(() => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
    }, 10);

    window.addEventListener('scroll', handleScrollSave);
    return () => {
      window.removeEventListener('scroll', handleScrollSave);
    };
  }, []);

  useLayoutEffect(() => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
    }
  }, []);

  return (
    <div className="mt-20 lg:mb-14 md:mb-10 mb-10" ref={tiendaRef} >

      <h2 className="tracking-tight text-[#f3cf90] font-medium text-3xl uppercase text-center mb-4">Tóners</h2>


      <nav className="w-full place-self-center mb-11 border rounded-md border-[#103849] max-w-[600px]"
        id="nav"
      >
        <ul className="flex-wrap flex gap-y-0.5 justify-center text-xs md:text-sm lg:text-sm space-x-6 md:space-x-8 lg:space-x-8">
          <li>
            <button onClick={handleListToners} className={activeButton === 'Todos' ? 'active nav-item2 font-normal uppercase tracking-tight' : 'hover:font-medium nav-item2 font-normal text-[#9e7b52] uppercase tracking-tight'}>Todos</button></li>
          <li>
            <button onClick={handleListToners} className={activeButton === 'HP' ? 'active nav-item2 font-normal uppercase tracking-tight' : 'hover:font-medium nav-item2 font-normal text-[#9e7b52]  uppercase tracking-tight'}>HP</button></li>
          <li>
            <button onClick={handleListToners} className={ activeButton === 'Lexmark' ? 'active nav-item2 font-normal uppercase tracking-tight' : 'hover:font-medium nav-item2 font-normal text-[#9e7b52] uppercase tracking-tight'}>Lexmark</button></li>
          <li>
            <button onClick={handleListToners} className={ activeButton === 'Samsung' ? 'active nav-item2 font-normal uppercase tracking-tight' : 'hover:font-medium nav-item2 font-normal text-[#9e7b52] uppercase tracking-tight'}>Samsung</button></li>
          <li>
            <button onClick={handleListToners} className={ activeButton === 'Kyocera' ? 'active nav-item2 font-normal uppercase tracking-tight' : 'hover:font-medium nav-item2 font-normal text-[#9e7b52] uppercase tracking-tight'}>Kyocera</button></li>
        </ul>
      </nav>

      
      <Suspense fallback={<p className="text-center text-[#9e7b52] tracking-wider fadeInOut cursor-default">Cargando...</p>}>
        <Carruseles/>
      </Suspense>
    </div>
  )
}
