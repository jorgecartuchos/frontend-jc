import { useEffect, useState } from "react";

import { useInicio } from "../hooks/useInicio";
import { Link } from "react-router-dom";

export const Tarjeta = ({product}) => {

  const { nombre, marca, info, imagen, id } = product;

  const { productosCarrito, globalProductCart } = useInicio();

  const [isInCart, setIsInCart] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const existsInCart = productosCarrito.some(cartItem => cartItem.id === id);
    setIsInCart(existsInCart);
  }, [productosCarrito, product ]);
  

  const handleTransfer = (id) => {
    globalProductCart(id);
    const existsInCart = productosCarrito.some(cartItem => cartItem.id === product.id);
    setIsInCart(!existsInCart);

    if(window.innerWidth < 621){
      if(!existsInCart){
        setIsModalVisible(true);
        setTimeout(() => {
          setIsModalVisible(false);
        }, 1000);
      }
    }
  };


  return (
    <>
    
    <div className="w-64 mx-auto shadow-lg h-80 rounded-sm bg-[#ffffff] px-1 py-1 relative">

        { window.innerWidth < 621 && 
          <div
            className={`absolute font-montserrat text-sm font-medium tracking-tight bottom-16 -right-4 px-2 py-1 backdrop-blur border border-[#dadada] rounded-md transform transition-all duration-500 ${isInCart && isModalVisible ? '' : 'translate-y-ful opacity-0'}`}
          >
            Agregado
          </div>
        }
        
        <Link to={`/producto/${id}/${nombre}`}
          aria-label={`Toner láser de la marca ${marca}, referencia ${nombre}`}
        >
          <div className="w-full h-60 flex justify-center items-center rounded-sm bg-[#ffffff] mb-2">
            <img src={`/${imagen.portada}`} className="w-[247px] h-[238px]" alt="Imagen portada del producto"
            title={nombre} />
          </div>
        </Link>

        <Link to={`/producto/${id}/${nombre}`}>
          <div className="w-full h-16 rounded-sm bg-[#f8f8f8] grid grid-cols-[4fr_1fr] overflow-hidden">
              <div>
                  <p className="font-montserrat font-medium text-base mt-2 ml-3 uppercase tracking-tight">{nombre}</p>
                  <p className="font-montserrat text-[#424242] text-xs mt-2 ml-3 line-clamp-1" title={info}>{info}</p>
              </div>

          </div>
        </Link>

        <div className={`cursor-pointer flex items-center pl-[3px] w-7 h-7 rounded-full absolute bottom-3 right-3 border border-[#d6d6d6] ${isInCart ? 'bg-[#4e4e4e]' : 'bg-[#f2f2f2]'}`}
        onClick={()=> handleTransfer(id)}
        >
          {isInCart ? (
            <img src="/carrito-tarjeta-agregado.png" alt="imagen del carrito"
            className="flex-shrink-0 w-[18px] h-[17px] opacity-95"
            title="Agregado al carrito"
            loading="lazy"
            />
          ) : (
            <img src="/carrito-tarjeta.png" alt="imagen del carrito"
            className="flex-shrink-0 w-[18px] h-[17px]"
            title="Agregar al carrito"
            loading="lazy"
            />
          )
          }
        </div>
    </div>
    </>
  )
}
