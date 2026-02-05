"use client";

import { Link, NavLink } from "../next-link-shim";
import { useLocation } from "../router-shim";
import { useEffect, useState } from "react";

import { useInicio } from "../hooks/useInicio";
import { SearchRecommendations, CartNotificationModal } from "./";
import { slugify } from "../helpers";


export const Header = () => {

  const location = useLocation();

  const { handleToggleBurger, handleScrollTienda, totalProductosCarrito, productosCarrito, modalSearch, setModalSearch, setIsSugerenciasVisible, handleNavigation, containerRef, busqueda, isSugerenciasVisible, sugerencias, handleCarrito, setSugerencias, setBusqueda, setIsLoadingAnimation, allProducts } = useInicio();

  const handleChangeSearch = (e) => {
    setIsLoadingAnimation(true);

    const valor = e.target.value;
    setBusqueda(valor);

    if (valor.length === 0) {
      setIsSugerenciasVisible(false);
      setSugerencias([]);
      setModalSearch(true);
    } else {
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
        setModalSearch(true);
      } else {
        setSugerencias([]);
        setIsSugerenciasVisible(false);
        setModalSearch(true);
      }
    } else {
      setSugerencias([]);
      setIsSugerenciasVisible(false);
      setModalSearch(true);
    }
    setTimeout(() => {
      setIsLoadingAnimation(false);
    }, 700);
  };

  const clearInput = () => {
    setBusqueda('');
    setSugerencias([]);
    setIsSugerenciasVisible(false);
  };

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth <= 1149;
      const currentScrollY = window.scrollY;

      if (!isMobile) {
        setShowHeader(true);
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleResize = () => {
      if (window.innerWidth > 1149) {
        setShowHeader(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 left-0 w-full h-[60px] header-class z-30 shadow-border-bottom border-[#14455a] bg-[#103849] transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-9'
      }`}>
      <div className="grid columns-lg justify-between items-center mx-auto max-w-[1910px] w-full lg:px-8">
        <Link
          to="/"
          className="flex items-center w-fit mr-14 logo-grid"
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <img src="/logox25.svg" alt="Logo de Jorge Cartuchos" className="w-7" />
          <span
            className="ml-2 mt-0.5 whitespace-nowrap text-center text-[16px] font-semibold uppercase tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right, #f0c986, #ddad83, #f0c986)" }}
          >
            Jorge Cartuchos
          </span>
        </Link>

        <div className="line-class hidden"></div>

        <nav className="hidden lg:flex padding-nav">
          <ul className="flex pl-2 uppercase font-normal text-[13.5px] space-x-[28px]">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "active nav-item"
                    : "text-[#997246] nav-item hover:font-medium"
                }
                onClick={(e) => {
                  if (location.pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <Link
                className="text-[#997246] uppercase nav-item hover:font-medium"
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
                    : "text-[#997246] nav-item hover:font-medium"
                }
              >
                Nosotros
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? "active nav-item"
                    : "text-[#997246] nav-item hover:font-medium"
                }
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contactanos"
                className={({ isActive }) =>
                  isActive
                    ? "active nav-item"
                    : "text-[#997246] nav-item hover:font-medium"
                }
              >
                Contáctanos
              </NavLink>
            </li>
          </ul>
        </nav>

        <button
          onClick={handleToggleBurger}
          className="focus:outline-none margin-menu items-center flex lg:hidden ml-5"
          aria-label="Menú hamburguesa"
        >
          <div className="flex flex-col w-5 h-auto"
            style={{ gap: "7px" }}
          >
            <div className="w-full bg-[#f0c986]"
              style={{ height: "2px" }}
            />
            <div className="w-full bg-[#f0c986]"
              style={{ height: "2px" }}
            />
            <div className="w-full bg-[#f0c986]"
              style={{ height: "2px" }}
            />
          </div>

          <p className="text-menu hidden text-[#f0c986] ml-3 font-medium uppercase text-xs">Menú</p>
        </button>

        <div className="flex w-full xl:mr-10 relative place-self-center search-class max-w-80 min-w-[220px] lg:max-w-xs"
          ref={containerRef}
        >
          <img src="/Lupa.svg"
            alt="Lupa de busqueda"
            className="absolute left-3 cursor-pointer top-1 w-5 h-5"
            onClick={() => {
              const sugerencia = sugerencias.find(s => slugify(s.nombre) === slugify(busqueda));
              if (sugerencia) {
                handleNavigation(sugerencia.id, sugerencia.nombre, sugerencia.categoria);
              }
            }}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            loading="lazy"
          />

          <input type="text"
            className={`bg-[#061922] w-full  focus:outline-double focus:outline-[#997246] text-buscador rounded-full pl-11 py-1 lg:pl-12 pr-7 placeholder-[#a38a6e] text-sm ${!isSugerenciasVisible && !modalSearch ? 'text-[#a38a6e]' : 'text-[#f0c986]'}`}
            placeholder="Busca un tóner"
            value={busqueda}
            onChange={handleChangeSearch}
            onFocus={() => {
              if (busqueda.length >= 0 && sugerencias.length > 0) {
                setModalSearch(true);
                setIsSugerenciasVisible(true);
              } else {
                setModalSearch(true);
              }
            }}
          />

          {modalSearch &&
            <SearchRecommendations />
          }

          {busqueda && (
            <button className="absolute right-3 text-[#b38755]"
              style={{ top: "1px" }}
              onClick={clearInput}
            >
              &times;
            </button>
          )}

        </div>

        <button className="flex ml-auto min-w-6 min-h-6 mr-24 margin-cart"
          onClick={handleCarrito}
          aria-label="Agregar al carrito"
        >
          <div
            className={`relative transition-opacity duration-1000 ${productosCarrito.length ? '' : 'hidden '}`}
            style={{
              left: "6.9px", top: "-4px",
            }}
          >
            <div
              className="absolute bg-[#f3100c] rounded-full border-white flex items-center justify-center"
              style={{ width: "15.4px", height: "15.4px", top: "-1px" }}
            >
              <span
                className="font-medium text-white"
                style={{ fontSize: "0.7rem", paddingLeft: "0px" }}
              >
                {totalProductosCarrito}
              </span>
            </div>
          </div>

          <img src="/Carrito.svg" className="h-[23.4px]" alt="Icono del carrito"
            style={{ width: "25px" }}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            title="Carrito"
            loading="lazy"
          />
        </button>

        <CartNotificationModal />
      </div>
    </header>
  )
}
