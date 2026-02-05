export const SetAlerta = ({message, status}) => {
    return (
    <>
        { status === "esperar" &&
            (<div 
                className="place-self-center text-[#ffefd3] text-xs text-center flex items-center font-medium contac-shadow"
                >{message}<div className="w-5 h-5 ml-3 flex justify-center items-center rounded-full border border-[#ffefd3] relative"
                    >
                        <div className="w-4 h-4 border-2 border-[#f0c986] border-t-transparent border-r-transparent border-b-transparent border-l-[#f0c986] rounded-full animate-spin"/>
                    </div>
                </div>)
        }

        { status === "WhatsApp" &&
            (<div 
                className="place-self-center text-xs text-center text-[#dbffe3] flex items-center font-medium"
                >{message}<div className="w-6 h-6 ml-3 flex justify-center items-center rounded-full border-2 border-[#56d872]">
                <img src="/chulo.svg" alt="" className="w-4 h-3"/>
                </div> 
            </div>)
        }
        
        { status === 200 &&
            (<div 
                className="place-self-center text-xs text-center flex items-center text-[#dbffe3] font-medium"
                >{message}<div className="w-6 h-6 ml-3 flex justify-center items-center rounded-full border-2 border-[#56d872]">
                <img src="/chulo.svg" alt="" className="w-4 h-3"/>
                </div> 
            </div>)
        }

        { status === 400 &&
            (<div 
                className="place-self-center text-[#ffde73] text-xs text-center flex items-center font-medium"
                >Ingresa un correo electrónico válido<div className="w-6 h-6 ml-3 flex justify-center items-center rounded-full border-2 border-[#ffc400]">
                <p className="font-semibold text-base text-[#ffc400]">!</p>
                </div> 
            </div>)
        }

        { status === 500 &&
            (<div 
                className="place-self-center text-[#ff7e27] text-xs text-center flex items-center font-medium"
                >No se pudo procesar. Intenta de nuevo.<div className="w-6 h-6 ml-3 flex justify-center items-center rounded-full border-2 border-[#ff7e27]">
                <p className="font-semibold text-base">!</p>

                </div> 
            </div>)
        }

        { status === 'Desconocido' && 
            (<div 
                className="place-self-center text-[#cf2e2e] text-xs text-center flex items-center font-medium"
                >Error desconocido. Intenta más tarde<div className="w-6 h-6 ml-3 flex justify-center items-center rounded-full border-2 border-[#cf2e2e]">
                <p className="font-semibold text-base]">!</p>

                </div> 
            </div>)
        }
    </>
  )
}