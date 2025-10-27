import { useState, useEffect } from 'react';
import './MaterialesPage.css'

const IconoConfiguracion = () => <span>[⚙️]</span>;
const IconoPapelera = () => <span>[🗑️]</span>;

function MaterialesPage() {
  const [materiales, setMateriales] = useState([
    { id: 1, nombre: 'Harina 000', precio: 500, gramos: 1000 },
    { id: 2, nombre: 'Levadura Seca', precio: 800, gramos: 500 },
    { id: 3, nombre: 'Azúcar', precio: 1200, gramos: 2000 },
  ]);

  // Estado que guarda los datos que se están escribiendo en el formulario
  const [nuevoMaterial, setNuevoMaterial] = useState({
    nombre: '',
    precio: '',
    gramos: '',
  });

  // NUEVO ESTADO: Guarda el ID del material que se está editando. 
  // Si es null, estamos creando uno nuevo.
  const [materialAEditar, setMaterialAEditar] = useState(null);

  // EFECTO para rellenar el formulario cuando se selecciona un material para editar
  useEffect(() => {
    if (materialAEditar) {
      // Buscar el material por su ID
      const materialExistente = materiales.find(m => m.id === materialAEditar);
      if (materialExistente) {
        // Rellenar el formulario con los datos del material existente
        setNuevoMaterial({
          nombre: materialExistente.nombre,
          precio: materialExistente.precio,
          gramos: materialExistente.gramos,
        });
      }
    } else {
      // Si materialAEditar es null, limpiar el formulario (modo creación)
      setNuevoMaterial({ nombre: '', precio: '', gramos: '' });
    }
  }, [materialAEditar, materiales]); // Se ejecuta cuando cambian estos estados

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoMaterial({
      ...nuevoMaterial,
      [name]: value,
    });
  };

  // 1. Lógica para cargar el material al formulario al hacer clic en 'Editar'
  const handleCargarEdicion = (id) => {
    setMaterialAEditar(id); // Establece el ID en el estado de edición
  };

  // 2. Lógica para guardar o actualizar
  const handleGuardarOActualizar = (e) => {
    e.preventDefault();

    if (!nuevoMaterial.nombre || !nuevoMaterial.precio || !nuevoMaterial.gramos) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    
    // Preparar el objeto con los tipos correctos
    const datosMaterial = {
      nombre: nuevoMaterial.nombre,
      precio: parseFloat(nuevoMaterial.precio),
      gramos: parseInt(nuevoMaterial.gramos),
    };

    if (materialAEditar) {
      // --- MODO EDICIÓN (ACTUALIZAR) ---
      const listaActualizada = materiales.map(m => 
        m.id === materialAEditar 
          ? { ...m, ...datosMaterial } // Reemplaza los campos del material editado
          : m
      );
      setMateriales(listaActualizada);
      setMaterialAEditar(null); // Sale del modo edición
    } else {
      // --- MODO CREACIÓN (GUARDAR NUEVO) ---
      const materialConId = {
        ...datosMaterial,
        id: Date.now(), 
      };
      setMateriales([...materiales, materialConId]);
    }

    // Limpiar el formulario
    setNuevoMaterial({ nombre: '', precio: '', gramos: '' });
  };
  
  const handleEliminarMaterial = (idAEliminar) => {
    const listaActualizada = materiales.filter(material => material.id !== idAEliminar);
    setMateriales(listaActualizada);
    // Si eliminamos el material que se estaba editando, salimos del modo edición
    if (materialAEditar === idAEliminar) {
        setMaterialAEditar(null);
    }
  };
  
  const calcularPrecioPorGramo = (precio, gramos) => {
    if (gramos > 0) {
      return (precio / gramos).toFixed(2);
    }
    return '0.00';
  };
  
  // Implementación del orden alfabético
  const materialesOrdenados = [...materiales].sort((a, b) => 
    a.nombre.localeCompare(b.nombre)
  );

  return (
    <div className="materiales-container">
      <h2>Gestión de Materiales</h2>
      
      <div className="materiales-grid">
        
        {/* === COLUMNA IZQUIERDA: Formulario de Creación/Edición === */}
        <div className="columna-creacion">
          <p>
            {materialAEditar 
              ? `Editando: ${nuevoMaterial.nombre || 'Material Seleccionado'}` 
              : "Ingresa los detalles de un nuevo material."}
          </p>
          <form className="formulario-materiales" onSubmit={handleGuardarOActualizar}>
            <div className="input-group">
              <label htmlFor="nombre">Nombre del Material</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                placeholder="Harina, Levadura, Sal..." 
                value={nuevoMaterial.nombre}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="precio">Precio del Paquete</label>
              <input 
                type="number" 
                id="precio" 
                name="precio" 
                placeholder="Ej: 500" 
                value={nuevoMaterial.precio}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="gramos">Cantidad del Paquete (Gramos)</label>
              <input 
                type="number" 
                id="gramos" 
                name="gramos" 
                placeholder="Ej: 1000" 
                value={nuevoMaterial.gramos}
                onChange={handleInputChange}
              />
            </div>
            
            <button type="submit" className="boton-guardar">
              {materialAEditar ? 'Actualizar Material' : 'Guardar Material'}
            </button>
            
            {/* Botón para cancelar la edición */}
            {materialAEditar && (
                <button 
                    type="button" 
                    className="boton-cancelar"
                    onClick={() => setMaterialAEditar(null)}
                >
                    Cancelar Edición
                </button>
            )}
            
          </form>
        </div>
        
        {/* === COLUMNA DERECHA: Tabla de Inventario === */}
        <div className="columna-inventario">
          <h3>Inventario Actual</h3>
          <table className="tabla-materiales">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>GRAMOS</th>
                <th>Precio /grs</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Usamos la lista ORDENADA */}
              {materialesOrdenados.map(material => (
                <tr key={material.id}>
                  <td>{material.nombre}</td>
                  <td>$ {material.precio}</td>
                  <td>{material.gramos}</td>
                  <td>$ {calcularPrecioPorGramo(material.precio, material.gramos)}</td>
                  <td>
                    {/* Conectamos la función de edición al botón de configuración */}
                    <button 
                        className="btn-accion"
                        onClick={() => handleCargarEdicion(material.id)}
                    >
                        <IconoConfiguracion />
                    </button>
                    <button 
                      className="btn-accion"
                      onClick={() => handleEliminarMaterial(material.id)}
                    >
                      <IconoPapelera />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MaterialesPage