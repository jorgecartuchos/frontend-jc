import { useEffect, useState } from "react";

export const ImgGarantia = () => {

    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    
  }, []);
  return (

    <>
        {screenSize >= 1149 && (
            <img src="/garantia-lg.png" alt="Imagen de garantía"  className="inline img-garantia"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              loading="lazy"
            />
               
        )}
        { screenSize < 1149 && (
            <img src="/garantia-md.png" alt="Imagen de garantía"  className="inline min-w-[82px] w-[82px] h-[82px] img-garantia"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              loading="lazy"
            />
            
        )}
        
    </>

  )
}
