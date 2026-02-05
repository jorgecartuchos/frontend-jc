"use client";

import { useEffect, useState } from "react";

export const ImgGarantia = () => {

    const [screenSize, setScreenSize] = useState(0);

    useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    
  }, []);
  return (

    <>
        {screenSize >= 1149 && (
            <img src="/garantia-lgs.png" alt="Imagen de garantía"  className="inline img-garantia w-[140px] h-[140px]"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              loading="eager"
              title="Satisfacción 100% garantizada"
            />
               
        )}
        { screenSize < 1149 && (
            <img src="/garantia-lgs.png" alt="Imagen de garantía"  className="inline w-[140px] h-[140px] img-garantia"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              loading="eager"
              title="Satisfacción 100% garantizada"
            />
            
        )}
        
    </>

  )
}
