import { useEffect, useState } from "react"

export const ImagenesPortada = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
    
  }, []);
  
    return (

    <div className="flex-col flex items-center relative mt-14 lg:mt-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            {screenSize >= 1149 && (
                <>
                    <img className="absolute min-w-max toner3 translate-x-1/2" src="/toner3.png" alt="Toner 3"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    loading="eager"
                    />
                    <img className="relative h-auto w-auto min-w-max toner2" src="/toner2.png" alt="Toner 2"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    loading="eager"
                    />
                    <img className="absolute min-w-[345px] max-w-[345px] toner1 -translate-x-1/2" src="/toner1.png" alt="Toner 1"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    loading="eager"
                    />
                </>
            )}
            {screenSize >= 876 && screenSize < 1149 && (
                <>
                    <img className="absolute max-w-[243px] min-w-[243px] toner3" src="/toner3-tablet.png" alt="Toner 3"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    loading="eager"
                    />
                    <img className="absolute max-w-[243px] min-w-[243px] toner2" src="/toner2-tablet.png" alt="Toner 2"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    loading="eager"
                    />
                    <img className="absolute toner1 min-w-[220px] max-w-[220px]" src="/toner1-tablet.png" alt="Toner 1"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    loading="eager"
                    />
                </>
            )}
            {screenSize >= 613 && screenSize < 876 && (
                <>
                <img className="absolute max-w-[243px] min-w-[243px] toner2" src="/toner2-tablet.png" alt="Toner 2"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                loading="eager"
                />
                <img className="absolute toner1 min-w-[220px] max-w-[220px]" src="/toner1-tablet.png" alt="Toner 1"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                loading="eager"
                />
                </>
            )}
            {screenSize < 613 && (
                <img className="absolute toner1 min-w-[220px] max-w-[220px]" src="/toner1-tablet.png" alt="Toner 1"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                loading="eager"
                />
            )}
        </div>

    </div>
  )
}
