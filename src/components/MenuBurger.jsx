"use client";

import { NavLink, Link } from "../next-link-shim";
import { useInicio } from "../hooks/useInicio";

export const MenuBurger = () => {

  const { handleToggleBurger, handleScrollTienda, toggleBurger } = useInicio();

  return (
    <div
      className={`${toggleBurger ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 z-40 left-0 width-manu-hamburguesa h-full bg-[#0a2936] transform transition-transform duration-300 ease-in-out lg:hidden`}
    >

      {toggleBurger && (
        <button
          onClick={handleToggleBurger}
          className="absolute hidden block-equis top-6 right-6 text-[#f0c986] text-4xl"
        >
          &times;
        </button>
      )}

      <ul className="p-8 uppercase font-normal tracking-tight text-sm space-y-6">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "active nav-item-mobile"
                : "text-[#997246] nav-item-mobile"
            }
            onClick={(e) => {
              if (typeof window !== "undefined" && window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              handleToggleBurger();
            }}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <Link
            className="text-[#997246] nav-item-mobile uppercase"
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
                : "text-[#997246] nav-item-mobile"
            }
            onClick={handleToggleBurger}
          >
            Nosotros
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive
                ? "active nav-item-mobile"
                : "text-[#997246] nav-item-mobile"
            }
            onClick={handleToggleBurger}
          >
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contactanos"
            className={({ isActive }) =>
              isActive
                ? "active nav-item-mobile"
                : "text-[#997246] nav-item-mobile"
            }
            onClick={handleToggleBurger}
          >
            Contáctanos
          </NavLink>
        </li>
      </ul>

    </div>
  )
}
