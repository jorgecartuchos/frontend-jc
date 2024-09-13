export const SetAlerta = ({message, status}) => {
    return (
    <>
        { status === "esperar" &&
            (<div 
                className="font-montserrat place-self-center text-[#525252] text-xs text-center flex items-center mt-5 ml-7 font-medium"
                >{message}<div className="w-5 h-5 ml-3 flex justify-center items-center rounded-full border border-[#b3b3b3] relative"
                    >
                        <div className="w-4 h-4 border-2 border-[#000000] border-t-transparent border-r-transparent border-b-transparent border-l-[#000000] rounded-full animate-spin"/>
                    </div>
                </div>)
        }

        { status === "WhatsApp" &&
            (<div 
                className="font-montserrat place-self-center text-xs text-center flex ml-7 items-center mt-3  font-medium"
                >{message}<div className="w-6 h-6 ml-3 flex justify-center items-center rounded-full border-2 border-[#56d872]">
                <img src="/chulo.png" alt="" className="w-4 h-3"/>
                </div> 
            </div>)
        }
        
        { status === 200 &&
            (<div 
                className="font-montserrat place-self-center text-xs text-center flex items-center mt-3  font-medium"
                >{message}<div className="w-6 h-6 ml-3 flex justify-center items-center rounded-full border-2 border-[#56d872]">
                <img src="/chulo.png" alt="" className="w-4 h-3"/>
                </div> 
            </div>)
        }

        { status === 400 &&
            (<div 
                className="font-montserrat place-self-center text-[#525252] text-xs text-center flex items-center font-medium"
                >Ingresa un correo electrónico válido<div className="w-6 h-6 ml-3 flex justify-center items-center rounded-full border-2 border-[#ffc400]">
                <p className="font-semibold text-base text-[#ffc400]">!</p>
                </div> 
            </div>)
        }

        { status === 500 &&
            (<div 
                className="font-montserrat place-self-center text-[#525252] text-xs text-center flex items-center mt-3 ml-8 font-medium"
                >No se pudo procesar. Intenta de nuevo.<div className="w-6 h-6 ml-3 flex justify-center items-center rounded-full border-2 border-[#ff7e27]">
                <p className="font-semibold text-base text-[#ff7e27]">!</p>

                </div> 
            </div>)
        }

        { status === 'Desconocido' && 
            (<div 
                className="font-montserrat place-self-center text-[#525252] text-xs text-center flex items-center mt-3 ml-9 font-medium"
                >Error desconocido. Intenta más tarde<div className="w-6 h-6 ml-3 flex justify-center items-center rounded-full border-2 border-[#cf2e2e]">
                <p className="font-semibold text-base text-[#cf2e2e]">!</p>

                </div> 
            </div>)
        }


    </>
  )
}
