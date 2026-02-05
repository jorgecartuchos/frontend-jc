
import { useInicio } from "../hooks/useInicio";

export const RecommendationsLi = () => {

  const { activeButton, classColor, handleListToners} = useInicio();

  return (
    <>
        <li
        className={`py-3.5 px-2 duration-300 hover:bg-[#0a2936] text-[#c99f6e] hover:text-[#f0c986] hover:font-medium rounded-md text-sm cursor-pointer mx-3 ${classColor && activeButton === 'Todos' ? 'bg-[#0a2936]' : ''}`}
        onClick={handleListToners}
        >Explorar productos</li>
        <li
        className={`py-3.5 px-2 duration-300 hover:bg-[#0a2936] text-[#c99f6e] hover:text-[#f0c986] hover:font-medium rounded-md text-sm uppercase cursor-pointer mx-3 ${classColor && activeButton === 'HP' ? 'bg-[#0a2936]' : ''}`}
        onClick={handleListToners}
        >HP</li>
        <li
        className={`py-3.5 px-2 duration-300 hover:bg-[#0a2936] text-[#c99f6e] hover:text-[#f0c986] hover:font-medium rounded-md text-sm uppercase cursor-pointer mx-3 ${classColor && activeButton === 'Lexmark' ? 'bg-[#0a2936]' : ''}`}
        onClick={handleListToners}
        >Lexmark</li>
        <li
        className={`py-3.5 px-2 duration-300 hover:bg-[#0a2936] text-[#c99f6e] hover:text-[#f0c986] hover:font-medium rounded-md text-sm uppercase cursor-pointer mx-3 ${classColor && activeButton === 'Samsung' ? 'bg-[#0a2936]' : ''}`}
            onClick={handleListToners}
        >Samsung</li>
        <li
        className={`py-3.5 px-2 duration-300 hover:bg-[#0a2936] text-[#c99f6e] hover:text-[#f0c986] hover:font-medium rounded-md text-sm uppercase cursor-pointer mx-3 ${classColor && activeButton === 'Kyocera' ? 'bg-[#0a2936]' : ''}`}
        onClick={handleListToners}
        >Kyocera</li>
    </>
  )
}
