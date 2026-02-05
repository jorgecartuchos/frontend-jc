"use client";

import { createContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { clienteAxios } from "../config/axios";
import { productos, masUsados } from "../data/productos";
import { camposValidosWhatsApp, slugify } from "../helpers/";

const InicioContext = createContext();

export const InicioProvider = ({children}) => {
  
  const tiendaRef = useRef(null);
  const [activeButton, setActiveButton] = useState('Todos');
  const [toggleBurger, setToggleBurger] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [realizarPedido, setRealizarPedido] = useState(false);
  const [msgConfirmado, setMsgConfirmado] = useState(false);
  const [fromTienda, setFromTienda] = useState(true);
  const [modalSearch, setModalSearch] = useState(false);
  const [modalAddCart, setModalAddCart] = useState(false);

  const isRemovingRef = useRef(false);

  const allProducts = [productos, masUsados].flatMap(list => list);
  
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const searchString = searchParams?.toString();

    const [navState, setNavState] = useState(null);

    useEffect(() => {
      let nextNavState = null;

      try {
        const raw = sessionStorage.getItem("__nav_state");
        if (raw) {
          nextNavState = JSON.parse(raw);
          sessionStorage.removeItem("__nav_state");
        }
      } catch {
        nextNavState = null;
      }

      const t = setTimeout(() => setNavState(nextNavState), 0);
      return () => clearTimeout(t);
    }, [pathname, searchString]);

    const location = {
      pathname: pathname ?? "/",
      state: navState,
      search: searchParams?.toString() ? `?${searchParams.toString()}` : "",
    };

    const navigate = (to, options) => {
      if (typeof to === "number") return;
      if (options?.state) {
        try {
          sessionStorage.setItem("__nav_state", JSON.stringify(options.state));
        } catch {
          // ignore
        }
      }
      router.push(to);
    };

    const [infoForm, setInfoForm] = useState({
      nombre: "",
      correo: "",
      asunto: "",
      mensaje: "",
      activarCarrito: false,
    });

    useEffect(() => {
      try {
        const savedInfo = sessionStorage.getItem('infoForm');
        if (savedInfo) setInfoForm(JSON.parse(savedInfo));
      } catch {
        // ignore
      }
    }, []);

    useEffect(() => {
      try {
        sessionStorage.setItem('infoForm', JSON.stringify(infoForm));
      } catch {
        // ignore
      }
    }, [infoForm]);

    const handleToggleBurger = () => {
      setToggleBurger(!toggleBurger);
    }

    const scrollTiendaFunction = () => {
      const offset = 80; 
      const elementPosition = tiendaRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      sessionStorage.setItem('scrollPosition', offsetPosition);

      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);

    };

    const handleScrollTienda = (event) => {
      event.preventDefault();
      const target = event.target;
  
      target.classList.add("active");
      setTimeout(() => {
        target.classList.remove("active")
      }, 1000);
  
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          scrollTiendaFunction();
          setToggleBurger(false);
        }, 100);
      } else {
        scrollTiendaFunction(); 
        setToggleBurger(false);
      }
    };

    const [productosCarrito, setProductosCarrito] = useState([]);
    const [productosEnviados, setProductosEnviados] = useState([]);

    useEffect(() => {
      const itemStr = localStorage.getItem("productosEnviados");

      let nextProductosEnviados;
      if (itemStr) {
        const item = JSON.parse(itemStr);
        const now = new Date();

        if (now.getTime() > item.expiry) {
          localStorage.removeItem("productosEnviados");
        } else {
          nextProductosEnviados = item.value;
        }
      }

      const carritoGuardado = localStorage.getItem("productosCarrito");
      let nextProductosCarrito;
      if (carritoGuardado) {
        nextProductosCarrito = JSON.parse(carritoGuardado);
      }

      const t = setTimeout(() => {
        if (nextProductosEnviados !== undefined) setProductosEnviados(nextProductosEnviados);
        if (nextProductosCarrito !== undefined) setProductosCarrito(nextProductosCarrito);
      }, 0);

      return () => clearTimeout(t);
    }, []);

    const totalProductosCarrito = productosCarrito.reduce((acc, item) => acc + 1, 0);    

    const globalProductCart = (id) => {

      isRemovingRef.current = true;

      const foundProduct = allProducts.find(product => product.id === id);

      const repit = productosCarrito.find(product => product.id === id);

      let updatedCarrito;

      if(repit){
        updatedCarrito = productosCarrito.filter(product => product.id !== id);
        setModalAddCart(false);
      } else {
        updatedCarrito = [foundProduct, ...productosCarrito];
        setModalAddCart(true);
      }

      setProductosCarrito(updatedCarrito);
      if(updatedCarrito.length > 0) {
        localStorage.setItem('productosCarrito', JSON.stringify(updatedCarrito));
      }else {
        localStorage.removeItem('productosCarrito');
        setRealizarPedido(false);
      }
    };

    const borrarProductos = () => {
      isRemovingRef.current = true;
      setProductosCarrito([]);
      setRealizarPedido(false);
      localStorage.removeItem('productosCarrito');
    }

    const sentContact = async (datos) => {
      if(datos.correo === ""){

        const numero = '573205682187';
        let mensaje = 
        `Asunto: ${encodeURIComponent(datos.asunto)}%0A` +
        `Nombre: ${encodeURIComponent(datos.nombre)}%0A` +
        `Mensaje: ${encodeURIComponent(datos.mensaje)}%0A%0A` +
        `Productos solicitados:%0A`;

        productosCarrito.forEach((producto) => {
          mensaje += ` 📦  ${encodeURIComponent(producto.nombre)}%0A`;
        });
        const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numero}&text=${mensaje}`;

        window.open(urlWhatsApp, '_blank');

        if(msgConfirmado){
          const ttl = 7 * 24 * 60 * 60 * 1000;
          const now = new Date();

          const item = {
            value: productosCarrito,
            expiry: now.getTime() + ttl,
          };

          localStorage.setItem('productosEnviados', JSON.stringify(item));
          setProductosEnviados(productosCarrito);
        }
        
            return;
      } else {
        if(!datos.activarCarrito){
          const empaquetadoParaBackFalse = {
            nombre: datos.nombre,
            correo: datos.correo,
            asunto: datos.asunto,
            mensaje: datos.mensaje,
            activarCarrito: false
          }
          try {
            const data = await clienteAxios.post("/toners/contactanos", empaquetadoParaBackFalse);
             return data;
          } catch (error) {
            return error;
          }
  
        } else {
  
          const carritoSinImagenes = productosCarrito.map(producto => ({id: producto.id, nombre: producto.nombre, info: producto.info}));
          
          const empaquetadoParaBackTrue = {
            nombre: datos.nombre,
            correo: datos.correo,
            asunto: datos.asunto,
            mensaje: datos.mensaje,
            activarCarrito: true,
            carrito: carritoSinImagenes,
          };
          try {
            const data = await clienteAxios.post("/toners/contactanos", empaquetadoParaBackTrue);
  
            const ttl = 7 * 24 * 60 * 60 * 1000;
            const now = new Date();
  
            const item = {
              value: productosCarrito,
              expiry: now.getTime() + ttl,
            };
  
            localStorage.setItem('productosEnviados', JSON.stringify(item));
            setProductosEnviados(productosCarrito);
  
            return data;
          } catch (error) {
            return error;        
          }
        }
      }
    };

    useEffect(() => {
      const nextFromTienda =
        location.pathname.includes("/toner") || location.pathname.includes("/tintas");

      const t = setTimeout(() => setFromTienda(nextFromTienda), 0);
      return () => clearTimeout(t);
    }, [location.pathname]);


    const [camposLlenos, setCamposLlenos] = useState(true);
    const [correoEnviado, setCorreoEnviado] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [classColor, setClassColor] = useState(false);
    const [isSugerenciasVisible, setIsSugerenciasVisible] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [sugerencias, setSugerencias] = useState([]);
    const containerRef = useRef(null);
    const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);
    const [requestedOrder, setRequestedOrder] = useState(false);

    const handleCarrito = () => {
      setIsCartOpen(!isCartOpen);
      setRealizarPedido(false);
      if(!realizarPedido){
        setIsModalVisible(false);
      }
    };
    const handleListToners = (e) => {
      const nameButton = e.target.innerHTML;
      setClassColor(true);
    
      if (location.pathname !== "/") {
        navigate("/", { state: { nameButton } });
      } else {
        executeValidations(nameButton);
      }
    };
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

    const handleCotizarAhora = (id) => {
      const foundProduct = allProducts.find(product => product.id === id);
      const exists = productosCarrito.some(product => product.id === id);
    
      const updatedCarrito = exists
        ? productosCarrito
        : [foundProduct, ...productosCarrito];
    
      setProductosCarrito(updatedCarrito);
      localStorage.setItem("productosCarrito", JSON.stringify(updatedCarrito));
    
      setIsModalVisible(false);
    
      setRequestedOrder(true);
    };

    useEffect(() => {
      if (!requestedOrder) return;

      const t = setTimeout(() => {
        setIsCartOpen(true);
        setRealizarPedido(true);
        setInfoForm((prev) => ({ ...prev, activarCarrito: true }));
        setRequestedOrder(false);
      }, 0);

      return () => clearTimeout(t);
    }, [requestedOrder]);
    
    
    const handleCloseModal = () => {
      setIsModalVisible(false);
    };
  
    const handleChangeForm = (e) => {
      const { name, value } = e.target;
      setInfoForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const executeValidations = (nameButton) => {
        setActiveButton(nameButton === 'Explorar productos' ? 'Todos' : nameButton);
        setTimeout(() => {
          scrollTiendaFunction();
        }, 10);
    
        if(window.innerWidth >= 736){
          setTimeout(() => {
            setModalSearch(false);
            setIsSugerenciasVisible(false);
            setClassColor(false);
            setIsCartOpen(false);
            setRealizarPedido(false);
          }, 700);
        } else {
    
          setTimeout(() => {
            setModalSearch(false);
            setClassColor(false);
          }, 500);
          setIsCartOpen(false);
          setRealizarPedido(false);
        }
      };

    useEffect(() => {
        if (location.pathname === "/" && location.state?.nameButton) {
          executeValidations(location.state.nameButton);
        }
      }, [location.pathname, location.state?.nameButton]);
      
      const onSubmitForm = (e) => {
        e.preventDefault();
    
        if(camposValidosWhatsApp(infoForm)){
          setCamposLlenos(true);
          setIsLoading(true);
          setTimeout(() => {
            setCorreoEnviado(true);
          }, 100); 
         
          setTimeout(() => {
            sentContact(infoForm);
            setIsLoading(false);
            setTimeout(() => {setIsModalVisible(true)}, 500);
          }, 1000); 
          
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
      const handleNavigation = (id, name, categoria) => {
        setModalSearch(false);
        const categorySlug = categoria
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

        if(!name){
          if(sugerencias.length >= 2){
            setIsSugerenciasVisible(true);
            return;
          } else if(sugerencias.length === 1){
            const [sugerencia] = sugerencias;
            const { id, nombre, categoria } = sugerencia;
            const categorySlug = categoria
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
            navigate(`/${categorySlug}/${slugify(nombre)}-${id}`);
            setIsSugerenciasVisible(false);
            return;        
          } else if(sugerencias.length === 0) {
            setModalSearch(false);
            return;
          }
        } else {
          navigate(`/${categorySlug}/${slugify(name)}-${id}`);
          setModalSearch(false);
          setIsSugerenciasVisible(false);
          setBusqueda(`${name}`);
        }
      };
      const handleKeyDown = (e, product) => {
          if(e.key === 'Enter'){
            handleNavigation(product.id, product.nombre, product.categoria);
          }
        };
        
        const handleClickOutsideSearch = (e) => {
          if(containerRef.current && !containerRef.current.contains(e.target)){
            setIsSugerenciasVisible(false);
            setModalSearch(false);
          }
        }
        useEffect(() => {
          document.addEventListener('mousedown', handleClickOutsideSearch)
          return () => document.removeEventListener('mousedown', handleClickOutsideSearch);
          
        }, []);
        useEffect(() => {
          document.body.classList.toggle("overflow-hidden", isCartOpen);
        }, [isCartOpen]);
        const handleClickOutside = (e) => {
          if(e.target.id === 'overlay'){
            setIsCartOpen(false);
            setRealizarPedido(false);
            setToggleBurger(false);
            setIsModalVisible(false);
          }
        };
  return (
    <InicioContext.Provider value={{
        tiendaRef,
        activeButton,
        setActiveButton,
        handleScrollTienda,
        scrollTiendaFunction,
        productosCarrito,
        setProductosCarrito,
        globalProductCart,
        allProducts,
        productos,
        masUsados,
        borrarProductos,
        setInfoForm,
        infoForm,
        sentContact,
        totalProductosCarrito,
        handleToggleBurger,
        toggleBurger,
        setToggleBurger,
        isCartOpen, 
        setIsCartOpen,
        realizarPedido, 
        setRealizarPedido,
        isRemovingRef,
        productosEnviados,
        setMsgConfirmado,
        setProductosEnviados,
        fromTienda,
        modalSearch, 
        setModalSearch,
        handleListToners,
        removeItem,
        handleRealizarPedido,
        handleCloseModal,
        handleChangeForm,
        handleCarrito,
        onSubmitForm,
        containerRef,
        isLoadingAnimation,
        handleClickOutside,
        handleKeyDown,
        handleNavigation,
        busqueda, 
        isSugerenciasVisible,
        classColor,
        isModalVisible,
        isLoading,
        correoEnviado,
        camposLlenos,
        resetForm,
        sugerencias,
        setSugerencias,
        setIsLoadingAnimation,
        setBusqueda,
        setIsSugerenciasVisible,
        modalAddCart,
        setModalAddCart,
        handleCotizarAhora,
    }}>{children}</InicioContext.Provider>
  )
}

export default InicioContext