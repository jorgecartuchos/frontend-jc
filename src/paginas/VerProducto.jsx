import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { ListadoMarca } from "../components/";
import { useInicio } from "../hooks/useInicio";

export const VerProducto = () => {
    
  const { id } = useParams();
  const navigate = useNavigate();

  const [addCart, setAddCart] = useState(false);
  const { productos, masUsados, globalProductCart, productosCarrito, setIsCartOpen, setRealizarPedido, isRemovingRef
} = useInicio();

  const [valorBoton, setValorBoton] = useState(false);
  
  const dataId = Number(id); 
  const idMasUsados = masUsados.find(product => product.id === dataId);

  const productoActual = productos.find(product => product.id === dataId) || masUsados.find(product => product.id === dataId);
  const { nombre, marca, imagen, info } = productoActual || {};

  const filtrados = idMasUsados 
    ? masUsados.filter(product => product.id !== dataId) 
    : masUsados;

  const solo = productos.filter(product => product.marca === marca && product.id !== dataId);

  const transferCart = (id) => {
    globalProductCart(id);
    setAddCart(!addCart);
  };

  const handleBack = (e) => {
    e.preventDefault();
    
    const scrollPosition = sessionStorage.getItem('scrollPosition');

    navigate('/');

    if(scrollPosition){
        requestAnimationFrame(() => {
            window.scrollTo(0, parseInt(scrollPosition, 10));
            sessionStorage.removeItem('scrollPosition');
        }, 0);
    }
    
  };

  useEffect(() => {
    const productoEncontrado = productosCarrito.find(product => product.id === dataId);

    setValorBoton(!!productoEncontrado);
    if(!isRemovingRef.current){
      setIsCartOpen(false);
      setRealizarPedido(false);
    }

    isRemovingRef.current = false;
    
  }, [productosCarrito, dataId]);
  

  return (
    <>
    
    <Link 
        className="absolute mt-2 md:mt-3 flex lg:hidden md:flex left-4 cursor-pointer items-center font-montserrat font-medium uppercase text-xs"
        style={{ top: "72px" }}
        onClick={(e) => handleBack(e)}
        draggable="false"
        onContextMenu={(e) => e.preventDefault()}
        ><img src="../../public/Volver.png" alt="" className="mr-2" style={{ width: "14px", height: "12px" }} loading="lazy"/>Volver
    </Link>

    <div className="grid grid-cols-1 mb-12 lg:min-w-[928px] lg:mb-28 md:mb-20 md:grid md:grid-cols-[2fr_1fr] lg:grid-cols-[3fr_1fr] mt-20 ver-producto lg:w-6/12 md:px-4 md:mr-0 "
    >

        <div className="mt-10 grid mx-auto lg:mx-0 md:mx-0  grid-cols-1 grid-rows-[6fr_1fr] md:flex lg:flex lg:max-w-4xl w-full max-w-sm min-h-max md:max-w-xl md:min-h-max md:h-auto lg:h-auto"
        >
            <div className="md:inline lg:inline hidden flex-shrink-0 md:w-12 lg:w-20 md:h-12 lg:h-20"
            >
              <img src={`../${imagen.miniatura}`} alt="Imagen miniatura" />

            </div>

            <div className="w-full flex items-center justify-center h-auto ml-0 md:ml-3 lg:ml-3 bg-white">
              <img src={`../${imagen.detalle}`} alt="Imagen del producto" />
            </div>

            <div className="border border-[#f2f2f2] mt-3 md:hidden lg:hidden inline flex-shrink-0 w-10 h-10">

              <img src={`../${imagen.miniatura}`} alt="Imagen miniatura" />

            </div>
        </div>
        
        <div className="grid-cols-1 grid md:flex-col md:pr-2 lg:flex-col px-5 lg:px-0 md:px-0 w-full md:ml-5 lg:ml-14 mt-2 md:mt-12 lg:mt-20">
            <span className="font-montserrat font-medium uppercase tracking-tight text-2xl block mb-2">{nombre}</span>
            <span className="block font-montserrat tracking-tight font-normal lg:mt-7 md:mt-7 mt-4 text-sm md:text-sm lg:text-base text-[#4e4e4e]">{info}
            </span>

            <button className={`w-full max-w-xs min-w-min mx-auto md:mx-0 lg:mx-0 lg:min-w-64 md:min-w-52 px-4 py-3 rounded-sm mt-6 md:mt-28 lg:mt-28 font-montserrat font-medium text-sm md:text-sm lg:text-base uppercase tracking-tight transition-colors ${valorBoton ? 'bg-black text-white ' : 'bg-white text-black '}`}
                onClick={() => transferCart(dataId)}
            >{valorBoton ? 'Borrar del carrito': 'Agregar al carrito'}</button>

            <div className="flex flex-col mt-12">
                <div className="flex items-center">
                    <div className="w-10 h-10 mr-5 p-2 flex-shrink-0 bg-white rounded-sm">
                      <img src="../../public/soporte.png" 
                        alt="Imagen de sorporte" 
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                        loading="lazy"
                      />
                    </div>
                    <span className="font-montserrat text-sm md:min-w-36">Servicio Presencial</span>
                </div>

                <div className="flex mt-2 items-center">
                    <div className="w-10 flex items-center justify-center h-10 mr-5 p-2 flex-shrink-0 bg-white rounded-sm">
                      <img src="../../public/cobertura.png" alt="Imagen ECO" 
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                        loading="lazy"
                        className="w-[18px] h-[24.3px]"
                      />
                    </div>
                    <span className="font-montserrat text-sm md:min-w-36">Cobertura Bogotá</span>
                </div>
            </div>

            <div className="mt-10 flex flex-col ">
                <span className="mb-2 font-montserrat font-medium text-lg">Contácto</span>
                <span className="font-montserrat w-44 mb-1 font-medium text-sm ">Tel:<span className="font-normal"> +57 (320) 568 2187</span></span>
                <span className="font-montserrat font-medium text-sm ">Email:<span className="font-normal"> contacto.jorgecartuchos<span className="font-medium">@</span>gmail.com</span></span>
            </div>
        </div>
        
    </div>

    <div className="w-full h-auto mb-12 lg:mb-0 md:mb-0 pt-12 md:pb-20 lg:pb-28 border-t-2 border-[#e0e0e0]">

      <p className="font-montserrat mt-6  uppercase tracking-tight font-medium text-center text-xl">Más usados</p>
      {<ListadoMarca data={filtrados}/>}

      <p className="font-montserrat mt-6  uppercase tracking-tight font-medium text-center text-xl">{marca}</p>
      {<ListadoMarca data={solo}/>}
      
        
        <Link 
            className="md:ml-9 lg:ml-48 ml-5 text-xs md:text-base lg:text-base flex items-center font-montserrat font-medium uppercase group"
            onClick={(e) => handleBack(e)}
        ><img src="../../public/Volver.png" alt="" 
            className="mr-2 transition-transform duration-300 transform group-hover:-translate-x-1"
            style={{ width: "14px", height: "12px" }}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            loading="lazy"
            />Volver a la tienda
        </Link>
    </div>
    </>
  )
}
