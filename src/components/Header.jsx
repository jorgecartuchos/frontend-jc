import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useInicio } from "../hooks/useInicio";
import { Modal, SetAlerta } from "./";
import { camposValidos, respuestasFormulario } from "../helpers/";

export const Header = () => {

  const [isSugerenciasVisible, setIsSugerenciasVisible] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [sugerencias, setSugerencias] = useState([]);
  const [sugerenciasPrev, setSugerenciasPrev] = useState(false);
  const [classColor, setClassColor] = useState(false);
  const [camposLlenos, setCamposLlenos] = useState(true);
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const [mensaje, setMensaje] = useState({message: '', status: null});
  const [isModalVisible, setIsModalVisible] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();


    const {handleToggleBurger, handleScrollTienda, toggleBurger, allProducts, activeButton, setActiveButton, setIsCartOpen, scrollTiendaFunction, realizarPedido, isCartOpen, totalProductosCarrito, setInfoForm, setRealizarPedido, productosCarrito, productosEnviados, infoForm, globalProductCart, borrarProductos, sentContact, setToggleBurger} = useInicio();

  const containerRef = useRef(null);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setInfoForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNavigation = (id, name) => {

    if(!name){
      if(sugerencias.length >= 2){
        setIsSugerenciasVisible(true);
        return;
      } else if(sugerencias.length === 1){
        const [sugerencia] = sugerencias;
        const { id, nombre } = sugerencia;
        navigate(`/producto/${id}/${nombre}`);
        setIsSugerenciasVisible(false);
        return;        
      } else if(sugerencias.length === 0) {
        setSugerenciasPrev(true);
        return;
      }
    } else {
      navigate(`/producto/${id}/${name}`);
      setIsSugerenciasVisible(false);
      setBusqueda(`${name}`);
    }
  };

  const handleKeyDown = (e, product) => {
    if(e.key === 'Enter'){
      handleNavigation(product.id, product.nombre);
    }
  };

  const handleChangeSearch = (e) => {
    const valor = e.target.value;

    setBusqueda(valor);
    
    if(valor.length === 0){
      setIsSugerenciasVisible(false);
      setSugerenciasPrev(true);
    } else {
      setSugerenciasPrev(false);
      filtrarSugerencias(valor);
    }
  };

  const filtrarSugerencias = (valor) => {
    const searchValue = valor.trim().toLowerCase();
    const searchWords = searchValue.split(/\s+/);
  
    if (searchValue.length > 0) {
      const filtrado = allProducts.filter((product) => {
        const productText = `${product.nombre.toLowerCase()}`;
        return searchWords.every(word => productText.includes(word));
      });
  
      const ordenado = filtrado.sort((a, b) => {
        const productTextA = `${a.nombre.toLowerCase()}`;
        const productTextB = `${b.nombre.toLowerCase()}`;
  
        const countMatches = (text, words) => {
          return words.reduce((count, word) => count + (text.includes(word) ? 1 : 0), 0);
        };
  
        const matchesA = countMatches(productTextA, searchWords);
        const matchesB = countMatches(productTextB, searchWords);
  
        return matchesB - matchesA;
      });
      
      const unicos = ordenado.filter((product, index, self) =>
        index === self.findIndex((p) => (p.nombre === product.nombre))
      );
  
      if (unicos.length > 0) {
        setSugerencias(unicos);
        setIsSugerenciasVisible(true);
        setSugerenciasPrev(false);
      } else {
        setSugerencias([]);
        setIsSugerenciasVisible(false);
        setSugerenciasPrev(true);
      }
    } else {
      setSugerencias([]);
      setIsSugerenciasVisible(false);
      setSugerenciasPrev(true);
    }
  };

  const getHighlightedText = (text, highlight) => {
    if(!highlight.trim()){
      return text;
    }

    const normalizedHighlight = highlight.trim().toLowerCase();
    const searchWords = normalizedHighlight.split(/\s+/);

    const regex = new RegExp(`(${searchWords.join('|')})`, 'gi');

    const parts = text.split(regex);

    return parts.map((part, index) => 
      searchWords.some(word => part.toLowerCase() === word) ? (
        <span key={index} style={{ color: '#292929', fontWeight: 'bold' }}>
          {part}
        </span>
      ) : (
      part
    )
    );
  };

  const clearInput = () => {
    setBusqueda('');
    setSugerencias([]);
    setIsSugerenciasVisible(false);    
  };

  const handleClickOutsideSearch = (e) => {
    if(containerRef.current && !containerRef.current.contains(e.target)){
      setIsSugerenciasVisible(false);
      setSugerenciasPrev(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideSearch)
    return () => document.removeEventListener('mousedown', handleClickOutsideSearch);
    
  }, []);

  const handleListToners = (e) => {
    const nameButton = e.target.innerHTML;
    setClassColor(true);
  
    if (location.pathname !== "/") {
      navigate("/", { state: { nameButton } });
    } else {
      executeValidations(nameButton);
    }
  };
  
  useEffect(() => {
    if (location.pathname === "/" && location.state?.nameButton) {
      executeValidations(location.state.nameButton);
    }
  }, [location.pathname, location.state?.nameButton]);
  
  const executeValidations = (nameButton) => {
    setActiveButton(nameButton === 'Explorar productos' ? 'Todos' : nameButton);
    scrollTiendaFunction();

    if(window.innerWidth >= 736){
      setTimeout(() => {
        setSugerenciasPrev(false);
        setClassColor(false);
        setIsCartOpen(false);
      }, 700);
    } else {

      setTimeout(() => {
        setSugerenciasPrev(false);
        setClassColor(false);
      }, 500);
      setIsCartOpen(false);
    }
  };

  const handleCarrito = () => {
    setIsCartOpen(!isCartOpen);
    setRealizarPedido(false);
    if(!realizarPedido){
      setIsModalVisible(false);
    }
  }

  const removeItem = (id) => {
    globalProductCart(id);
  };

  const handleRealizarPedido = () => {
    setRealizarPedido(!realizarPedido);
    setInfoForm((prev) => ({...prev, activarCarrito: true}));
    if(realizarPedido && isCartOpen){
      setInfoForm((prev) => ({...prev, activarCarrito: false}));
      setIsModalVisible(false);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if(camposValidos(infoForm)){
      setCamposLlenos(true);
      try {
        const response = await sentContact(infoForm);
        respuestasFormulario(response, setMensaje, setIsModalVisible);
        
      } catch (error) {
        console.log(error);
        setMensaje({ message: "Error desconocido. Intenta más tarde", status: "Desconocido" });
      }
      
      setCorreoEnviado(true);
      resetForm();
    } else{ 
      setCamposLlenos(false);
    }
  };

  const resetForm = () => {
    setInfoForm({
      nombre: "",
      correo: "",
      asunto: "",
      mensaje: "",
      activarCarrito: false,
    });
    setTimeout(() => {
    setCorreoEnviado(false);
    }, 5000);
  };
  
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleClickOutside = (e) => {
    if(e.target.id === 'overlay'){
      setIsCartOpen(false);
      setRealizarPedido(false);
      setToggleBurger(false);
      setIsModalVisible(false);
    }
  }

  return (
    <header className="w-full fixed z-20 border-b border-[#f2f2f2] bg-white py-4 grid grid-cols-[1fr_5fr_1fr] columns-lg justify-between items-center">

          <nav className="hidden lg:flex">
            <ul className="flex pl-28 uppercase font-normal tracking-tight font-montserrat text-sm space-x-14">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "active nav-item"
                      : "text-[#696969] nav-item"
                  }
                >
                  Inicio
                </NavLink>
              </li>
              <li>
                <Link
                  className="text-[#696969] nav-item"
                  onClick={handleScrollTienda}
                >
                  Tienda
                </Link>
              </li>
              <li>
                <NavLink
                  to="/nosotros"
                  className={({ isActive }) =>
                    isActive
                      ? "active nav-item"
                      : "text-[#696969] nav-item"
                  }
                >
                  Nosotros
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contactanos"
                  className={({ isActive }) =>
                    isActive
                      ? "active nav-item"
                      : "text-[#696969] nav-item"
                  }
                >
                  Contáctanos
                </NavLink>
              </li>
            </ul>
          </nav>

          <button
            onClick={handleToggleBurger}
            className="focus:outline-none items-center flex lg:hidden ml-5"
            aria-label="Menú hamburguesa"
          >
            <div className="flex flex-col w-5 h-auto"
              style={{ gap: "7px" }}
            >
              <div className="w-full bg-black"
                style={{ height: "2px" }}
              />
              <div className="w-full bg-black"
                style={{ height: "2px" }}
              />
              <div className="w-full bg-black"
                style={{ height: "2px" }}
              />
            </div>

            <p className="font-montserrat md:flex hidden ml-3 font-medium uppercase text-xs">Menú</p>
          </button>

          <div
          className={`${
            toggleBurger ? "translate-x-0" : "-translate-x-full"
          } fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden z-10`}
          >
          
            <ul className="p-8 uppercase font-normal tracking-tight font-montserrat text-sm space-y-6">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "active nav-item-mobile"
                      : "text-[#696969] nav-item-mobile"
                  }
                  onClick={handleToggleBurger}
                >
                  Inicio
                </NavLink>
              </li>
              <li>
                <Link
                  className="text-[#696969] nav-item-mobile"
                  onClick={handleScrollTienda}
                >
                  Tienda
                </Link>
              </li>
              <li>
                <NavLink
                  to="/nosotros"
                  className={({ isActive }) =>
                    isActive
                      ? "active nav-item-mobile"
                      : "text-[#696969] nav-item-mobile"
                  }
                  onClick={handleToggleBurger}
                >
                  Nosotros
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contactanos"
                  className={({ isActive }) =>
                    isActive
                      ? "active nav-item-mobile"
                      : "text-[#696969] nav-item-mobile"
                  }
                  onClick={handleToggleBurger}
                >
                  Contáctanos
                </NavLink>
              </li>
            </ul>
            
          </div>

            <Link to="/"
              className="flex-grow hidden logo-block lg:bloc leading-3 bo text-center font-montserrat font-medium uppercase tracking-tight"
            >Jorge<span className="block relative top-0.5 font-bold">Cartuchos</span></Link>

            <div className="flex mx-auto relative place-content-center w-full max-w-md min-w-[220px] lg:max-w-xs" 
              ref={containerRef}
            >
              <img src="../../public/Lupa.png" 
                alt="Lupa de busqueda" 
                className="relative cursor-pointer top-1 -right-8  w-5 h-5" 
                onClick={handleNavigation}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                loading="lazy"
                />

              <input type="text" 
                className={`bg-[#f2f2f2] w-full  focus:outline-1 focus:outline-[#d6d6d6] text-buscador rounded-full font-montserrat pl-11 py-1 lg:pl-12 pr-7 md:pl-14 text-sm ${!isSugerenciasVisible && !sugerenciasPrev ? 'text-[#9c9c9c]' : ''}`} 
                placeholder="Busca un suministro"
                value={busqueda} 
                onChange={handleChangeSearch}
                onFocus={() => {
                  if(busqueda.length === 0){
                    setSugerenciasPrev(true);
                  } else {
                    if(sugerencias.length === 0){
                      setSugerenciasPrev(true);
                      setIsSugerenciasVisible(false);
                    } else {
                      setSugerenciasPrev(false);
                      setIsSugerenciasVisible(true);
                    }
                  }
                }}
                />

                { isSugerenciasVisible && sugerencias.length > 0 && (
                  <ul className="fixed shadow-sm custom-scrollbar max-w-md w-full max-h-[460px] mt-11 bg-white border border-[#f2f2f2] overflow-y-auto rounded-lg"
                  >
                    { sugerencias.map((product) => (
                      <li 
                        key={product.id} 
                        className="p-2 hover:bg-[#f2f2f2] text-[#b6b6b6] font-montserrat rounded-sm text-sm cursor-pointer mx-3 py-3 my-2 focus-within:bg-[#f2f2f2]"
                        onClick={() => handleNavigation(product.id, product.nombre)}
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, product)}
                        >
                        <span>{getHighlightedText(product.nombre, busqueda)}</span> 
                      </li>
                    ))
                    }
                  </ul>
                )}

                {busqueda && (
                  <button className="absolute right-3 text-gray-400"
                    style={{ top: "1px" }}
                    onClick={clearInput}
                  >
                  &times;
                  </button>
                )}
                
                {sugerenciasPrev && (
                    <ul
                      className="fixed shadow-sm max-w-md w-full max-h-[460px] bg-white border border-[#f2f2f2] mt-11 py-3 overflow-y-auto rounded-lg text-center"
                  >

                    { sugerencias.length === 0 && busqueda.length > 0 &&
                      <div 
                        className="py-5 mb-2 px-2 bg-[#f2f2f2] text-[#b6b6b6] font-montserrat border-b border-[#f2f2f2] rounded-sm text-sm cursor-default mx-3"
                      >
                        <li
                          className=""
                          >Ningún producto relacionado con tu búsqueda</li>
                        <li
                          className="font-semibold"
                          >{`"${busqueda}"`}</li>
                        
                      </div>
                    }
                    
                    <li
                      className={`py-3.5 px-2 hover:bg-[#f2f2f2] text-[#696969] font-montserrat hover:text-[#292929] hover:font-medium border-b border-[#f2f2f2] rounded-sm text-sm cursor-pointer mx-3 ${classColor && activeButton === 'Todos' ? 'bg-[#f6f6f6]' : ''}`}
                      onClick={handleListToners}
                    >Explorar productos</li>
                    <li
                      className={`py-3.5 px-2 hover:bg-[#f2f2f2] text-[#696969] font-montserrat hover:text-[#292929] hover:font-medium border-b border-[#f2f2f2] rounded-sm text-sm uppercase cursor-pointer mx-3 ${classColor && activeButton === 'HP' ? 'bg-[#f6f6f6]' : ''}`}
                      onClick={handleListToners}
                    >HP</li>
                    <li
                      className={`py-3.5 px-2 hover:bg-[#f2f2f2] text-[#696969] font-montserrat hover:text-[#292929] hover:font-medium border-b border-[#f2f2f2] rounded-sm text-sm uppercase cursor-pointer mx-3 ${classColor && activeButton === 'Lexmark' ? 'bg-[#f6f6f6]' : ''}`}
                      onClick={handleListToners}
                    >Lexmark</li>
                        <li
                          className={`py-3.5 px-2 hover:bg-[#f2f2f2] text-[#696969] font-montserrat hover:text-[#292929] hover:font-medium border-b border-[#f2f2f2] rounded-sm text-sm uppercase cursor-pointer mx-3 ${classColor && activeButton === 'Samsung' ? 'bg-[#f6f6f6]' : ''}`}
                          onClick={handleListToners}
                        >Samsung</li>
                      <li
                        className={`py-3.5 px-2 hover:bg-[#f2f2f2] text-[#696969] font-montserrat hover:text-[#292929] hover:font-medium rounded-sm text-sm uppercase cursor-pointer mx-3 ${classColor && activeButton === 'Kyocera' ? 'bg-[#f6f6f6]' : ''}`}
                        onClick={handleListToners}
                      >Kyocera</li>
                  </ul>
                )}
                
            </div>

            <button className="flex ml-auto min-w-6 min-h-6 mr-10 margin-cart" 
              onClick={handleCarrito}
              aria-label="Agregar al carrito"
              >
              <div
                className={`relative transition-opacity duration-1000 ${productosCarrito.length ? '' : 'hidden '}`}
                style={{ left: "6.9px", top: "-4px",
                }}
              >
                <div
                  className="absolute bg-[#eb0400] rounded-full border-white flex items-center justify-center"
                  style={{ width: "15.6px", height: "15.6px", top: "-0.2px" }}
                >
                  <span
                    className="font-montserrat font-medium text-white"
                    style={{ fontSize: "0.7rem", paddingLeft: "0px" }}
                  >
                    {totalProductosCarrito}
                  </span>
                </div>
              </div>

              <img src="../../public/Carrito.png" className="h-[23.4px]" alt="Icono del carrito" 
                style={{ width: "25px" }}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                title="Carrito"
                loading="lazy"
              />
            </button>

              <div 
                className={`fixed w-full cart-global flex h-full top-0 right-0 shadow-md transform transition-transform duration-300 ease-in-out z-10 ${isCartOpen ? (realizarPedido ? 'lg:translate-x-0 -translate-x-full' : '-translate-x-0 lg:translate-x-[700px]') : 'translate-x-full'}`}
              >

                <div className="cart w-full md:w-full lg:w-[400px] transform transition-all duration-500 h-auto relative bg-white">

                    <div className="flex w-full h-auto items-center mt-8">
                      <span 
                        className="ml-11 font-montserrat font-semibold tracking-tight text-xl text-left uppercase"
                      >Carrito</span>

                      <p 
                        className={`ml-auto min-w-[139.5px] text-[#2fd152] font-montserrat text-xs font-medium transition-opacity duration-500 ${infoForm.activarCarrito ? 'opacity-100' : 'opacity-0'}`}
                      >{infoForm.activarCarrito ? 'Agregado a la solicitud' : ''}</p>
                      
                      <button
                        onClick={handleCarrito}
                        className={`text-black ml-auto mr-4 font-montserrat font-normal text-4xl w-8 h-8 flex items-center justify-center ${realizarPedido && isCartOpen ? 'text-white cursor-auto' : ''}`}
                        >
                        &times;
                      </button>

                    </div>
                    <div className="flex w-full custom-scrollbar justify-center text-center px-4 pt-8 pb-2 overflow-y-auto relative h-full">

                      {productosCarrito.length === 0 ? (
                        <div className="w-full h-auto">
                          <p className="font-montserrat uppercase text-xs tracking-wider text-center mt-6 text-[#949494]">Carrito vacío</p>

                          <button className="mt-20 text-sm px-24 py-4 font-montserrat font-normal border-2 border-[#f3f3f3] text-[#b4b4b4] hover:text-[#a1a1a1] hover:border-[#ebebeb]"
                            onClick={handleListToners}
                          >
                            Explorar productos
                          </button>

                        </div>
                    
                      ) : (
                        <>

                        <ul className="relative pb-56 w-1/2 gap-2 h-min flex flex-wrap overflow-y-auto flex-1 "
                        >
                          {productosCarrito.map(item => (
                          
                          <div key={item.id}
                          className={`grid grid-cols-2 min-w-[271px] min-h-[173px] max-h-[245px] width-producto h-auto p-1 rounded-sm text-left transition-colors duration-1000 ${productosEnviados.some(p => p.id === item.id) ? 'bg-[#eaf3ff] border-[1px] border-[#c2dcff]' : infoForm.activarCarrito ? 'border border-[#b4ffc4] bg-[#f8fff9]' : 'border-0 bg-[#f5f5f5]'}`}>

                            <Link 
                              to={`/producto/${item.id}/${item.nombre}`}
                              className="flex items-centerbg-[#f2f2f2] rounded-sm w-full h-full" >
                                <img src={`../${item.imagen?.portada}`} alt="Imagen del producto en el carrito" />
                              </Link>

                            <div className="relative flex flex-col h-full pb-6 px-4">
                              <p 
                                className={`absolute bottom-0 text-[#8bb7f1] font-montserrat text-[10.5px] font-medium`}
                              >{productosEnviados.some(p => p.id === item.id) ? 'Producto solicitado' : ''}</p>

                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-black font-montserrat font-light text-3xl absolute right-mobile right-1 w-8 h-8 pt-1">
                                  &times;
                              </button>
                              <span className="font-montserrat font-medium uppercase tracking-tight margin-precio text-xl mt-4 pr-3 block mb-2">{item.nombre}</span>
                              <span className="flex font-montserrat tracking-tight font-normal margin-inf mt-auto text-xs line-clamp-1 text-[#686868]">{item.info}</span>

                            </div>

                          </div>
                          
                          ))}
                        </ul>
                        </>
                      )}
                      
                    </div>
                    { productosCarrito.length > 0 && (
                      <div className="w-full pt-5 pb-5 shadow-xl border-t border-[#ffffff] bg-[#e0e0e0] px-0.5 flex-col flex absolute bottom-0"
                      >
                        <button 
                          className="w-full mb-2 h-14 text-base hover:bg-[#f0f0f0] text-[#000000] bg-[#c2c2c2] duration-300 font-montserrat transition-colors uppercase text-center font-medium"
                          onClick={borrarProductos}
                        >
                        Vaciar Carrito
                        </button>

                        <button 
                          className="relative w-full flex transition-colors items-center justify-center duration-500 h-14 bg-[#181818] text-base hover:bg-[#000000] text-white font-montserrat uppercase text-center font-medium group"
                          onClick={handleRealizarPedido}
                        >
                          <img 
                            src="../../public/Volver-blanco.png"
                            alt="Icono Cerrar pedido" 
                            className={`mr-2 transition-transform rotate-[-45deg] transform ${realizarPedido ? 'left-24 rotate-[134deg] group-hover:-translate-x-1' : 'hidden'}`}
                            style={{ width: "10px", height: "10px" }}
                            draggable="false"
                            onContextMenu={(e) => e.preventDefault()}
                            loading="lazy"
                            />
                          {realizarPedido ? 'Cerrar Pedido' : 'Realizar Pedido'} 
                          <img 
                            src="../../public/Volver-blanco.png"
                            alt="Icono Realizar pedido" 
                            className={`ml-2 transition-transform rotate-[-45deg] transform ${realizarPedido ? 'hidden' : 'right-24 group-hover:translate-x-1'}`}
                            style={{ width: "10px", height: "10px" }}
                            draggable="false"
                            onContextMenu={(e) => e.preventDefault()}
                            loading="lazy"
                            />
                        </button>
                      </div>
                    )}
                </div>
                
                <div className="bg-[#f7f7f7] custom-scrollbar relative form lg:min-w-min md:min-w-full h-auto pt-8 md:pt-14 lg:pt-32 pb-10 flex flex-col items-center px-2 md:px-10 lg:px-36 overflow-y-auto"
                >
                  { isModalVisible && 
                      <Modal isVisible={isModalVisible} onClose={handleCloseModal} adClass="modal-contactanos modal-header"/>
                  }

                  <button
                      onClick={handleRealizarPedido}
                      className="text-black ml-auto md:inline lg:absolute lg:right-4 top-8 font-montserrat font-normal flex items-center justify-center text-4xl w-8 h-8 ">
                        &times;
                  </button>

                    <p className="font-montserrat w-auto tracking-tight uppercase text-center text-3xl font-medium">Realizar Pedido</p>

                    <p className="font-montserrat md:w-96 lg:w-full text-justify text-sm font-normal text-[#a4a4a4] mt-4">*Los productos añadidos al carrito serán incluidos en tu pedido.</p>
                    <div className="flex lg:w-full h-auto md:w-96">
                      <p className="font-montserrat md:absolute lg:absolute text-xs uppercase text-[#a4a4a4] mt-4 font-medium"
                      >Carrito <span className="tracking-tight">( {totalProductosCarrito} )</span></p>
                    </div>
                    
                    {!camposLlenos &&
                      <p className="font-montserrat text-xs text-center text-[#cf2e2e] mt-3 mb-2 font-medium">*Todos los espacios son necesarios</p>
                    }
                  
                    { correoEnviado && (
                      <SetAlerta message={mensaje.message} status={mensaje.status}/>
                    )
                    }

                    <form action="" 
                      className={`bg-[#f7f7f7] mb-6 z-10 flex-col lg:w-1/2 w-full max-w-96 md:max-w-96 md:min-w-96 lg:min-w-96 ${camposLlenos && !correoEnviado ? 'mt-10 md:mt-16 lg:mt-16' : 'mt-1 md:mt-6 lg:mt-7'}`}
                      onSubmit={(e) => onSubmitForm(e)}
                    >
                      <label className="block ml-4 font-montserrat uppercase text-sm font-medium mb-2">Nombre</label>
                      <input type="text" name="name" autoComplete="name" placeholder="Escribe tu nombre" className="placeholder:font-montserrat placeholder:text-[#b9b9b9] border bg-[#e8ffed] border-[#b4ffc4] placeholder:uppercase placeholder:text-xs rounded-sm font-montserrat w-full py-1.5 px-5" 
                      name="nombre"
                      value={infoForm.nombre}
                      onChange={handleChangeForm}
                      />

                      <label className="block mt-5 ml-4 font-montserrat uppercase text-sm font-medium mb-2">Correo Electrónico</label>
                      <input type="email" placeholder="Escribe tu correo electrónico" className="placeholder:font-montserrat border placeholder:text-[#b9b9b9] bg-[#e8ffed] border-[#b4ffc4] placeholder:uppercase placeholder:text-xs rounded-sm font-montserrat w-full py-1.5 px-5" 
                      name="correo"
                      value={infoForm.correo}
                      onChange={handleChangeForm}
                      />

                      <label className="block mt-5 ml-4 font-montserrat uppercase text-sm font-medium mb-2">Asunto</label>
                      <input type="text" placeholder="Escribe el asunto" className="placeholder:font-montserrat border placeholder:text-[#b9b9b9] placeholder:uppercase placeholder:text-xs rounded-sm font-montserrat w-full py-1.5 px-5 bg-[#e8ffed] border-[#b4ffc4]" 
                      name="asunto"
                      value={infoForm.asunto}
                      onChange={handleChangeForm}
                      />

                      <label className="block mt-5 ml-4 font-montserrat uppercase text-sm font-medium mb-2">Mensaje</label>
                      <textarea name="" id="" placeholder="Escribe el mensaje" className="placeholder:pt-1 placeholder:font-montserrat border bg-[#e8ffed] border-[#b4ffc4] placeholder:text-[#b9b9b9] placeholder:uppercase placeholder:text-xs rounded-sm font-montserrat w-full py-1.5 px-5 min-h-24"
                      name="mensaje"
                      value={infoForm.mensaje}
                      onChange={handleChangeForm}
                      ></textarea>

                      <input type="submit" className="block mt-4 rounded-sm bg-[#dfdfdf] transition-colors duration-500 font-montserrat font-medium text-sm px-10 py-2 cursor-pointer hover:bg-[#56d872] hover:text-white"
                        value="Enviar"
                      />
                    </form>

                    <div 
                      className="flex w-full mb-10 mt-auto lg:hidden md:flex bottom-8 left-5 md:left-10 cursor-pointer items-center font-montserrat font-medium uppercase text-xs"
                      onClick={handleRealizarPedido}
                      ><img src="../../public/Volver.png" alt="Icono de volver" className="mr-2" style={{ width: "14px", height: "12px" }} loading="lazy"/>Volver
                    </div>

                </div>

              </div>

              <div
                className={`fixed inset-0 bg-black transition-opacity duration-1000 ${isCartOpen ? 'bg-opacity-50 visible' : 'bg-opacity-50 invisible'}`}
                style={{
                  transition: 'opacity 1s ease, visibility 1s ease',
                  opacity: isCartOpen ? 0.5 : 0,
                  visibility: isCartOpen ? 'visible' : 'hidden'
                }}
                id="overlay"
                onClick={handleClickOutside}
              />

              <div
                className={`fixed inset-0 bg-black transition-opacity duration-1000 ${toggleBurger ? 'bg-opacity-50 visible' : 'bg-opacity-50 invisible'}`}
                style={{
                  transition: 'opacity 1s ease, visibility 1s ease',
                  opacity: toggleBurger ? 0.5 : 0,
                  visibility: toggleBurger ? 'visible' : 'hidden'
                }}
                id="overlay"
                onClick={handleClickOutside}
              />
            
        </header>
  )
}
