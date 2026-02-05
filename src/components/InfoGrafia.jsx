"use client";

export const InfoGrafia = () => {
  return (
    <div className="margin-infografia w-auto md:py-1 px-2 lg:pt-6 lg:pb-4 grid grid-cols-[25fr_1fr_25fr] grid-rows-[35fr_1fr_35fr] md:grid md:grid-cols-[50fr_1fr_50fr] md:grid-rows-[20fr_1fr_20fr] md:place-items-center lg:grid lg:grid-cols-[2fr_1fr_2fr_1fr_2fr_1fr_2fr] lg:grid-rows-1 place-items-center justify-around rounded-xl bg-[#f0c986] text-xs md:text-base lg:text-base text-center">
      
        <div className="flex-col flex pt-0 px-5 md:py-0 lg:py-0 lg:mb-auto">
          <div className="w-14 h-14 p-2.5 bg-[#e5bb72] rounded-full mx-auto">
            <img src="/seguridad.svg" alt="Imagen de seguridad" 
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            loading="lazy"
            className="w-[36px] h-[36px]"
            />
          </div>

          <p className="font-semibold tracking-tight uppercase mt-2 text-[#061922] md:mt-5 lg:mt-5">Seguridad</p>
          <p className="font-medium text-sm text-[#103849] mt-1.5 text-infografia">Calidad garantizada en cada compra</p>
        </div>
            <div className="h-44 w-0.5 hidden md:inline lg:inline bg-[#ecb87d]"/>
            <div className="h-full w-0.5 inline md:hidden lg:hidden bg-[#ecb87d]"/>

        <div className="flex-col flex pt-0 px-2 md:py-0 lg:py-0 lg:mb-auto">
          <div className="w-14 h-14 flex items-center justify-center bg-[#e5bb72] p-2 rounded-full mx-auto">
            <img src="/cobertura.svg" alt="Imagen ECO" 
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              loading="lazy"
              className="w-[28px] h-[38px]"
            />

          </div>

          <p className="text-[#061922]  font-semibold uppercase mt-2 md:mt-5 lg:mt-5 tracking-tight">Cobertura</p>
          <p className="font-medium text-sm text-[#103849] mt-1.5 text-infografia">Entrega rápida y personalizada en Bogotá</p>
        </div>

            <div className="h-44 w-0.5 hidden lg:inline bg-[#ecb87d]"/>
            <div className="h-0.5 w-full hidden md:inline lg:hidden bg-[#ecb87d]"/>
            <div className="h-0.5 w-0 hidden md:inline lg:hidden bg-[#ecb87d]"/>
            <div className="h-0.5 w-full hidden md:inline lg:hidden bg-[#ecb87d]"/>

            <div className="h-0.5 w-full inline md:hidden lg:hidden bg-[#ecb87d]"/>
            <div className="h-0 w-0 inline md:hidden lg:hidden bg-[#ecb87d]"/>
            <div className="h-0.5 w-full inline md:hidden lg:hidden bg-[#ecb87d]"/>
            
        <div className="flex-col lg:pt-0 md:py-5 flex pt-5 pb-6 lg:py-0 lg:mb-auto">
          <div className="w-14 h-14 p-2 bg-[#e5bb72] rounded-full mx-auto">
            <img src="/soporte.svg" className="rounded-full w-[40px] h-[40.7px]" alt="Imagen de soporte" 
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              loading="lazy"
            />

          </div>

          <p className="text-[#061922]  font-semibold uppercase mt-2 md:mt-5 lg:mt-5 tracking-tight">Servicio</p>
          <p className="text-sm font-medium text-[#103849] mt-1.5 text-infografia max-w-[150px]">Soporte al cliente, siempre</p>
        </div>
        <div className="h-full w-0.5 inline md:hidden lg:hidden bg-[#ecb87d]"/>

            <div className="h-44 w-0.5 hidden md:inline lg:inline bg-[#ecb87d]"/>

        <div className="flex-col lg:pt-0 md:py-5 flex pt-5 pb-6 lg:py-0 lg:mb-auto">
          <div className="w-14 h-14 bg-[#e5bb72] p-2.5 rounded-full mx-auto">
            <img src="/devolucion.svg" className="w-[36px] h-[36px]" alt="Imagen de devolición" 
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              loading="lazy"
            />
            
          </div>

          <p className="text-[#061922]  font-semibold uppercase mt-2 md:mt-5 lg:mt-5 tracking-tight">Transparencia</p>
          <p className="font-medium text-sm text-[#103849] text-center mt-1.5 text-infografia">Política de devolución<br /> sin complicaciones</p>
        </div>
    </div>
  )
}
