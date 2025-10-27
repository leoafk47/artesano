import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MaterialesPage from './components/MaterialesPage'; 
import fondoDePanes from './assets/Panes-bg.jpg'; 

function App() {
  const [paginaActiva, setPaginaActiva] = useState('Inicio');

  const mostrarImagen = paginaActiva === 'Inicio';
  const columnaDerechaClase = mostrarImagen ? 'columna-derecha' : 'columna-derecha-expandida';

  return (
    <div className="app-container">
      
      {mostrarImagen && (
        <div 
          className="columna-izquierda"
          style={{ backgroundImage: `url(${fondoDePanes})` }}
        >
        </div>
      )}
      
      <div className={columnaDerechaClase}>
        
        <Navbar 
          paginaActiva={paginaActiva} 
          setPaginaActiva={setPaginaActiva} 
          esExpandida={!mostrarImagen} 
        />

        <div className="contenido-principal">
          {/* Lógica para mostrar el componente de la página activa */}
          {paginaActiva === 'Materiales' && <MaterialesPage />}
          
          {paginaActiva === 'Inicio' && (
            <div>
              <h2>¡Bienvenido al Artesano!</h2>
              <p>Tu sistema de gestión de panadería.</p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default App;