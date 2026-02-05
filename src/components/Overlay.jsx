"use client";

import { useInicio } from "../hooks/useInicio"

export const Overlay = () => {

    const {handleClickOutside, toggleBurger, isCartOpen} = useInicio()

  return (
    <div
      className={`fixed inset-0 bg-black transition-opacity z-30 duration-1000 ${isCartOpen || toggleBurger ? 'bg-opacity-50 visible' : 'bg-opacity-50 invisible'}`}
      style={{
        transition: 'opacity 1s ease, visibility 1s ease',
        opacity: isCartOpen || toggleBurger ? 50 : 0,
        visibility: isCartOpen || toggleBurger ? 'visible' : 'hidden'
      }}
      id="overlay"
      onClick={handleClickOutside}
    />
  )
}