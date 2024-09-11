import { useEffect, useRef, useState } from "react"
import { useLocation, useParams } from "react-router-dom";

import { Tarjeta } from ".";
import { useInicio } from "../hooks/useInicio";

export const ListadoMarca = ({data}) => {

  const [itemsPerSlide, setItemsPerSlide] = useState(5);
  const [itemsPerSlideClass, setItemsPerSlideClass] = useState("w-1/5");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gridCols, setGridCols] = useState('');

  const carouselRef = useRef(null);
  const startX = useRef(0);
  const moveX = useRef(0);

  const location = useLocation();
  const { id } = useParams();
  
  let dataId = Number(id) || null;

  const marca = data.length > 0 ? data[0]?.marca : "No hay datos disponibles";
  
  const { activeButton } = useInicio();

  const filterLocation = location.pathname.startsWith('/producto');

  const nextSlide = () => {
    if (currentIndex < data.length - itemsPerSlide) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };
  const handleTouchMove = (e) => {
    moveX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };
  const handleTouchEnd = () => {
    const deltaX = startX.current - moveX.current;

    if(deltaX > 50){
      nextSlide();
    } else if(deltaX < -50){
      prevSlide();
    }
  };

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if(window.innerWidth >= 1656){
        setItemsPerSlide(5);
        setItemsPerSlideClass("w-1/5");
        setGridCols('grid-cols-[2fr_50fr_2fr]');
      } else if(window.innerWidth >= 1389) {
        setItemsPerSlide(4);
        setItemsPerSlideClass("w-1/4");
        setGridCols('grid-cols-[2fr_40fr_2fr]');
      } else if(window.innerWidth >= 1131){
        setItemsPerSlide(3);
        setItemsPerSlideClass("w-1/3");
        setGridCols('grid-cols-[2fr_30fr_2fr]');
      } else if(window.innerWidth >= 644){
        setItemsPerSlide(2);
        setItemsPerSlideClass("w-1/2");
        setGridCols('grid-cols-[2fr_20fr_2fr]');
      } else {
        setItemsPerSlide(1);
        setItemsPerSlideClass("w-full");
        setGridCols('grid-cols-[1fr_10fr_1fr]');

      }
    };
  
    updateItemsPerSlide();
    const handleResize = () => {
      updateItemsPerSlide();
    }
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  return (

      <>

      { activeButton !== marca && location.pathname === '/' && 
          <p className="font-montserrat mt-6 uppercase tracking-tight font-medium text-center text-xl">{marca}</p>
      }
        <div className={`grid items-center w-full mt-5 mb-12 relative lg:px-28 ${gridCols}`}>

          <button
            className="mt-8 min-w-[28px] w-9 h-9 transform -translate-y-1/2"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <img src="/Flecha-fondo.png" alt="Flecha izquierda" className={`w-9 h-9 shadow rounded-full transform rotate-180 ${currentIndex === 0 ? 'opacity-0' : ''}`} loading="lazy"/>
          </button>

          <div 
            className="relative w-full overflow-hidden"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex w-full transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`}}
            >
              { filterLocation ? (
                  data
                    .filter((product) => product.id !== dataId)
                    .map((product) => ( 
                      <div key={product.id} className={`flex-shrink-0 ${itemsPerSlideClass}`}>
                        <Tarjeta product={product} />
                      </div>
                    ))
              ) : (
                  data.map((product) => (
                    <div key={product.id} className={`flex-shrink-0 ${itemsPerSlideClass}`}>
                      <Tarjeta product={product} />
                    </div>
                  ))
              )}
            </div>
          </div>

          <button
            className={`mt-8 min-w-[28px] w-9 h-9 transform -translate-y-1/2 ${currentIndex === 6 ? 'inline' : ''}`}
            onClick={nextSlide}
            disabled={currentIndex >= data.length - itemsPerSlide}
          >
            <img src="/Flecha-fondo.png" alt="Flecha derecha" className={`w-9 h-9 shadow rounded-full ${currentIndex >= data.length - itemsPerSlide ? 'opacity-0' : ''}`}  loading="lazy"/>
          </button>
        </div>
      </>
    
  )
}
