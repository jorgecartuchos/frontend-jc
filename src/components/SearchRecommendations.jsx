"use client";

import { SpinCircle } from "./SpinCircle";
import { useInicio } from "../hooks/useInicio";
import { RecommendationsLi } from "./RecommendationsLi";

export const SearchRecommendations = () => {

  const { handleNavigation, handleKeyDown, busqueda, isSugerenciasVisible, sugerencias, isLoadingAnimation} = useInicio();

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
            <span key={index} style={{ color: '#f0c986', fontWeight: 'bold' }}>
              {part}
            </span>
          ) : (
          part
        )
        );
      };   

  return (
    <ul
        className="absolute shadow-sm custom-scrollbar width-modal shadow-border-bottom left-1/2 -translate-x-1/2 max-h-[460px] backdrop-blur bg-[#103849]/90 recomendations-margin py-3 overflow-y-auto rounded-lg text-center">
        
        {busqueda.length > 0 && sugerencias.length === 0 && !isLoadingAnimation && 
            <div className="py-5 mb-2 px-2 transition-all bg-[#061922] text-[#a7bbc4] border-b border-[#f0c986] rounded-xl text-sm cursor-default mx-3">
                <li>Ningún producto relacionado con tu búsqueda</li>
                <li className="font-semibold text-[#cebfa5]">{`"${busqueda}"`}</li>
            </div>
        }

        { isLoadingAnimation && busqueda.length > 0 && 
            <div className="py-5 mb-2 px-2 transition-all bg-[#061922] text-[#a7bbc4] border-b border-[#f0c986] rounded-xl text-sm cursor-default mx-3">
                <SpinCircle /> 
            </div>
        }

        { !isLoadingAnimation && isSugerenciasVisible && sugerencias.length > 0 &&
            sugerencias.map((product) => (
                <li 
                  key={product.id} 
                  className="p-2 hover:bg-[#0a2936] focus:outline-double focus:outline-[#997246] text-[#b38755] rounded-md text-left text-sm cursor-pointer mx-3 py-3 my-0.5 focus-within:bg-[#0a2936]"
                  onClick={() => handleNavigation(product.id, product.nombre, product.categoria)}
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, product)}
                  >
                  <span>{getHighlightedText(product.nombre, busqueda)}</span> 
                </li>
              ))
        }

        { (
            (sugerencias.length === 0) ||
            (sugerencias.length > 0 && isLoadingAnimation)
          ) && <RecommendationsLi />
        }
      
    </ul>
  )
}