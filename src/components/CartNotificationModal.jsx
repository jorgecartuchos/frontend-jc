"use client";

import { useEffect, useState } from "react";
import { useInicio } from "../hooks/useInicio";

export const CartNotificationModal = () => {
  const [progress, setProgress] = useState(false);

  const { modalAddCart, setModalAddCart } = useInicio();

  useEffect(() => {
    if (!modalAddCart) return;

    const frame = requestAnimationFrame(() => {
      setProgress(true);
    });
  
    const timeout = setTimeout(() => {
      setModalAddCart(false);
      setProgress(false);
    }, 2000);
  
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [modalAddCart]);

  if (!modalAddCart) return null;

  return (
    <div
      className="fixed text-center cursor-default top-add-modal right-2 z-50 bg-[#103849] text-[#f0c986] shadow-lg rounded-md px-4 py-2 w-[220px] animate-slide-in"
    >
      <p className="text-sm font-medium">Agregado al carrito</p>
      <div className="h-1 mt-2 bg-[#685535] w-full relative overflow-hidden rounded-sm">
        <div
          className={`absolute left-0 top-0 h-full bg-[#f0c986] transition-all duration-[2000ms] ${
            progress ? "w-full" : "w-0"
          }`}
        ></div>
      </div>
    </div>
  );
};
