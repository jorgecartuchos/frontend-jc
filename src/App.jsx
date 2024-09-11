import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './layout/Layout';
import { Devoluciones, Inicio, Nosotros, Contactanos, VerProducto } from './paginas/';

import { InicioProvider } from './context/InicioProvider';

function App() {

  return (
    <BrowserRouter>
      <InicioProvider>
          <Routes>
              <Route path='/' element={<Layout />}>
              <Route index element={<Inicio />}/>
              <Route path='nosotros' element={<Nosotros />}/>
              <Route path='contactanos' element={<Contactanos />}/>
              <Route path='devoluciones' element={<Devoluciones />}/>

              <Route path='producto/:id/:name' element={<VerProducto />}/>

              </Route>
          </Routes>
      </InicioProvider>
    </BrowserRouter>
  )
}

export default App
