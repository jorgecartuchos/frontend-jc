"use client";

import { useEffect, useState } from "react"

export const ImagenesPortada = () => {
  const [screenSize, setScreenSize] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    
  }, []);
  
    return (

    <div className="flex-col flex w-1/2 items-center relative mt-14 lg:mt-0 text-img">
        <div className="absolute">
            {screenSize >= 1149 && (
                <>
                    <img className="relative w-[250px] h-auto toner3 toners translate-x-1/2" src="/toner3.webp" alt="Toner 3"
                    draggable="false"
                    loading="eager"
                    />
                    <img className="absolute h-auto w-[245px] toners toner2" src="/toner2.webp" alt="Toner 2"
                    draggable="false"
                    loading="eager"
                    />
                    <img className="absolute w-[230px] toners shadow-white toner1 -translate-x-1/2" src="/toner1.webp" alt="Toner 1"
                    draggable="false"
                    loading="eager"
                    />
                </>
            )}
            {screenSize >= 876 && screenSize < 1149 && (
                <>
                    <img className="relative w-[250px] h-auto toner3 toners translate-x-1/2" src="/toner3.webp" alt="Toner 3"
                    draggable="false"
                    loading="eager"
                    />
                    <img className="absolute h-auto w-[245px] toners toner2" src="/toner2.webp" alt="Toner 2"
                    draggable="false"
                    loading="eager"
                    />
                    <img className="absolute w-[230px] toners shadow-white toner1 -translate-x-1/2" src="/toner1.webp" alt="Toner 1"
                    draggable="false"
                    loading="eager"
                    />
                </>
            )}
            {screenSize >= 452 && screenSize < 876 && (
                <>
                    <img className="relative w-[250px] h-auto toner3 toners translate-x-1/2" src="/toner3.webp" alt="Toner 3"
                    draggable="false"
                    loading="eager"
                    />
                    <img className="absolute w-[230px] toners toners toner2" src="/toner2.webp" alt="Toner 2"
                    draggable="false"
                    loading="eager"
                    />
                    <img className="absolute w-[230px] toners shadow-white toner1 -translate-x-1/2" src="/toner1.webp" alt="Toner 1"
                    draggable="false"
                    loading="eager"
                    />
                </>
            )}
            {screenSize < 452 && (
                <>
                    <img className="relative w-[250px] h-auto toner3 toners translate-x-1/2" src="/toner3.webp" alt="Toner 3"
                    draggable="false"
                    loading="eager"
                    />

                    <img className="absolute w-[230px] toners shadow-white toner1 -translate-x-1/2" src="/toner1.webp" alt="Toner 1"
                    draggable="false"
                    loading="eager"
                    />
                </>
            )}
        </div>

    </div>
  )
}
