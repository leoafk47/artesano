import './Navbar.css'

function Navbar({ paginaActiva, setPaginaActiva, esExpandida }) {
  
  const handleNavegacion = (e, pagina) => {
    e.preventDefault(); 
    setPaginaActiva(pagina); // Cambia la página activa

    // Lógica de visibilidad de imagen basada en la página
    if (pagina === 'Inicio') {
      // Si la función setMostrarImagen estuviera aquí, la pondríamos. 
      // Pero App.jsx ya lo resuelve: setPaginaActiva('Inicio') hace que mostrarImagen=true.
    }
  };
  
  const navbarClase = esExpandida ? 'navbar navbar-centrada' : 'navbar';

  return (
    <nav className={navbarClase}>
      <div className="navbar-logo">
        <strong>SiteLogo</strong> 
      </div>
      <ul className="navbar-links">
        <li>
          <a 
            href="#" 
            onClick={(e) => handleNavegacion(e, 'Inicio')} 
            className={paginaActiva === 'Inicio' ? 'enlace-activo' : ''}
          >
            Inicio
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={(e) => handleNavegacion(e, 'Recetas')} 
            className={paginaActiva === 'Recetas' ? 'enlace-activo' : ''}
          >
            Recetas
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={(e) => handleNavegacion(e, 'Materiales')} 
            className={paginaActiva === 'Materiales' ? 'enlace-activo' : ''}
          >
            Materiales
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={(e) => handleNavegacion(e, 'Historial')} 
            className={paginaActiva === 'Historial' ? 'enlace-activo' : ''}
          >
            Historial
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={(e) => handleNavegacion(e, 'Clientes')} 
            className={paginaActiva === 'Clientes' ? 'enlace-activo' : ''}
          >
            Clientes
          </a>
        </li>
      </ul>
      <button className="navbar-button">
        Tienda
      </button>
    </nav>
  )
}

export default Navbar