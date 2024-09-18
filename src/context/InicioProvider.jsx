import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { clienteAxios } from "../config/axios";
import { productos, masUsados } from "../../public/data/productos";

const InicioContext = createContext();

export const InicioProvider = ({children}) => {
  
  const tiendaRef = useRef(null);
  const [activeButton, setActiveButton] = useState('Todos');
  const [toggleBurger, setToggleBurger] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [realizarPedido, setRealizarPedido] = useState(false);
  const [msgConfirmado, setMsgConfirmado] = useState(false);
  const [isFixed, setIsFixed] = useState(false);



  const isRemovingRef = useRef(false);

  const allProducts = [productos, masUsados].flatMap(list => list);

  useEffect(() => {
    const itemStr = localStorage.getItem("productosEnviados");

    if(itemStr){
      const item = JSON.parse(itemStr);
      const now = new Date();

      if(now.getTime() > item.expiry) {
        localStorage.removeItem("productosEnviados");
      } else {
        setProductosEnviados(item.value);
      }
    }

    const carritoGuardado = localStorage.getItem('productosCarrito');
  
    if (carritoGuardado) {
    setProductosCarrito(JSON.parse(carritoGuardado));
    }
      }, []);
  
    const location = useLocation();
    const navigate = useNavigate();

    const [infoForm, setInfoForm] = useState(() => {
      const savedInfo = sessionStorage.getItem('infoForm');
      return savedInfo ? JSON.parse(savedInfo) : {
        nombre: "",
        correo: "",
        asunto: "",
        mensaje: "",
        activarCarrito: false,
      }
    });
    useEffect(() => {
      sessionStorage.setItem('infoForm', JSON.stringify(infoForm));
    }, [infoForm]);

    const handleToggleBurger = () => {
      setToggleBurger(!toggleBurger);
    }

    const scrollTiendaFunction = () => {
      setIsFixed(false);
      const offset = 95; 
      const elementPosition = tiendaRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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

    const totalProductosCarrito = productosCarrito.reduce((acc, item) => acc + 1, 0);    

    const globalProductCart = (id) => {
      isRemovingRef.current = true;

      const foundProduct = allProducts.find(product => product.id === id);

      const repit = productosCarrito.find(product => product.id === id);

      let updatedCarrito;

      if(repit){
        updatedCarrito = productosCarrito.filter(product => product.id !== id);
      } else {
        updatedCarrito = [foundProduct, ...productosCarrito];
      }

      setProductosCarrito(updatedCarrito);
      if(updatedCarrito.length > 0) {
        localStorage.setItem('productosCarrito', JSON.stringify(updatedCarrito));
      }else {
        localStorage.removeItem('productosCarrito');
      }
    };

    const borrarProductos = () => {
      isRemovingRef.current = true;
      setProductosCarrito([]);
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
        setIsFixed,
        isFixed
    }}>{children}</InicioContext.Provider>
  )
}

export default InicioContext