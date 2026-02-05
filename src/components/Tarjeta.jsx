"use client";

import { Link } from "../next-link-shim";

import { useInicio } from "../hooks/useInicio";

import { slugify } from "../helpers";

export const Tarjeta = ({product}) => {

  const { nombre, info, marca, imagen, id, categoria } = product;

  const { productosCarrito, globalProductCart } = useInicio();

  const isInCart = productosCarrito.some((cartItem) => cartItem.id === id);

  const categorySlug = categoria
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  

  const handleTransfer = (id) => {
    globalProductCart(id);
  };

  return (
    <>
      <Link to={`/${categorySlug}/${slugify(nombre)}-${id}`}
            aria-label={`Tóner láser de la marca ${marca}, referencia ${nombre}`}>
        <div className="w-auto max-h-auto overflow-hidden relative z-0">
          <img
            src={`/${imagen.portada}`}
            alt="Imagen portada del producto"
            title={nombre}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="bg-[#ffffff] w-full rounded-md grid grid-cols-[3.9fr_1.1fr] place-items-center relative">

        <Link to={`/${categorySlug}/${slugify(nombre)}-${id}`}
              aria-label={`Tóner láser de la marca ${marca}, referencia ${nombre}`}>
            <div className="w-full relative z-10 pb-0.5">
              <h2 className="flex mr-auto ml-1 -mt-5 font-semibold text-[#061922] text-base uppercase tracking-tighter whitespace-nowrap">{nombre}</h2>
              <p className="text-xs w-40 mt-[1px] mb-1.5 text-[#103849] font-medium ml-1.5 line-clamp-2" title={info}>{info}</p>
            </div>
        </Link>

        <button className={`absolute flex right-1 bottom-1 cursor-pointer mt-auto mb-1 items-center w-10 h-7 justify-center transition-all duration-500 rounded-full border border-[#316b84] ${isInCart ? 'bg-[#103849] hover:bg-[#255063] !border-[#f0c986]' : 'bg-[#ffffff] hover:bg-[#c7eeff]'}`}
        onClick={()=> handleTransfer(id)}
        >
          {isInCart ? (
            <img src="/carrito-tarjeta-agregado.svg" alt="imagen del carrito"
            className="flex-shrink-0 w-[18px] h-[17px] mt-0.5"
            title="Agregado al carrito"
            loading="lazy"
            />
          ) : (
            <img src="/carrito-tienda-agregar.svg" alt="imagen del carrito"
            className="flex-shrink-0 w-[18px] h-[17px] mt-0.5"
            title="Agregar al carrito"
            loading="lazy"
            />
          )
          }
        </button>

      </div>
        
    </>
  )
}
