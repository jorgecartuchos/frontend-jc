import { useInicio } from "../hooks/useInicio";
import { ListadoMarca } from "./ListadoMarca";

const Carruseles = () => {

    const { productos, activeButton } = useInicio();

    const marcas = ['HP', 'Lexmark', 'Samsung', 'Kyocera'];

  const listados = marcas.map( marca => {
    const filterProducts = productos.filter(product => product.marca === marca);
    return {marca, component: <ListadoMarca data={filterProducts}/>}
  });
  return (
    <>
    {listados
            .filter(({ marca }) => activeButton === '' || marca === activeButton)
            .map(({ component, marca }) => (
              <div key={marca}>
                {component}
              </div>
            ))
        }
        {listados
          .filter(({ marca }) => activeButton !== '' && marca !== activeButton)
          .map(({ component, marca }) => (
            <div key={marca}>
              {component}
            </div>
          ))
        }
    </>
  )
}

export default Carruseles;