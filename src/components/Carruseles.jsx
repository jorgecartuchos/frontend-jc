"use client";

import { useInicio } from "../hooks/useInicio";
import { ListadoMarca } from "./ListadoMarca";

const Carruseles = () => {

  const { productos, activeButton } = useInicio();

  const marcas = ['HP', 'Lexmark', 'Samsung', 'Kyocera'];

  const listados = marcas.map(marca => {
    const filterProducts = productos.filter(product => product.marca === marca);
    return { marca, component: <ListadoMarca data={filterProducts} /> }
  });

  return (
    <>
      {listados
        .filter(({ marca }) => activeButton === '' || marca === activeButton)
        .map(({ component, marca }) => (
          <div key={marca} className="flex-col flex items-center relative mb-4 border-2 border-[#AD8E6B] card-wrapper !py-0 place-self-center rounded-2xl">
            {component}
          </div>
        ))
      }
      {listados
        .filter(({ marca }) => activeButton !== '' && marca !== activeButton)
        .map(({ component, marca }) => (
          <div key={marca} className="flex-col flex items-center relative mt-4 border border-transparent card-wrapper place-self-center !py-0">
            {component}
          </div>
        ))
      }
    </>
  )
}

export default Carruseles;