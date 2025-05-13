import React, { useState } from 'react';
import perfilImage from '../../assets/Perfil.png'; // Importa la imagen
import './../style/Client/Perfil.css'; // Asegúrate de que la ruta sea correcta
import Pedido from '../../components/Pedido'; // Importa el componente Pedido

function Perfil() {
  const [activeView, setActiveView] = useState('perfil'); // Estado para controlar la vista activa

  const pedidosPendientes = [
    { fecha: '2025-04-01', total: 120.5, cantidad: 3 },
    { fecha: '2025-04-10', total: 45.0, cantidad: 1 },
  ];

  const pedidosEntregados = [
    { fecha: '2025-03-15', total: 89.99, cantidad: 2 },
    { fecha: '2025-03-20', total: 150.75, cantidad: 4 },
  ];

  return (
    <div className="perfil">
      <img src={perfilImage} alt="Perfil" className="perfil-image" />

      {/* Contenedor principal debajo de la imagen */}
      <div className="main-content">
        {/* Sidebar */}
        <div className="sidebar">
          <button
            className={`sidebar-button ${activeView === 'perfil' ? 'active' : ''}`}
            onClick={() => setActiveView('perfil')}
          >
            Mi Perfil
          </button>
          <button
            className={`sidebar-button ${activeView === 'pendientes' ? 'active' : ''}`}
            onClick={() => setActiveView('pendientes')}
          >
            Pedidos Pendientes
          </button>
          <button
            className={`sidebar-button ${activeView === 'entregados' ? 'active' : ''}`}
            onClick={() => setActiveView('entregados')}
          >
            Pedidos Entregados
          </button>
        </div>

        {/* Contenido dinámico */}
        <div className="content">
          {activeView === 'perfil' && (
            <div className="info-block">
              <div className="info-content">
                <div className="info-row">
                  <span className="info-label">Nombre:</span>
                  <input className="info-value" placeholder="Nombre"  />
                </div>
                <div className="info-row">
                  <span className="info-label">Correo:</span>
                  <input className="info-value" placeholder="Correo electrónico"  />
                </div>
                <div className="info-row">
                  <span className="info-label">Usuario:</span>
                  <input className="info-value" placeholder="Usuario"  />
                </div>
                <div className="info-row">
                  <span className="info-label">Fecha de nacimiento:</span>
                  <input className="info-value" type="date" placeholder=""  />
                </div>
                <div className="info-row">
                  <span className="info-label">Teléfono:</span>
                  <input 
                    className="info-value" 
                    type="tel" 
                    placeholder="Teléfono" 
                    maxLength="9" 
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                      if (value.length > 4) {
                        value = value.slice(0, 4) + '-' + value.slice(4, 8); // Add dash after 4 characters
                      }
                      e.target.value = value;
                    }}
                  />
                </div>
                <div className="button-row">
                  <button className="logout-button">Cerrar Sesión</button>
                  <button className="edit-button">Editar Usuario</button>
                </div>
              </div>
            </div>
          )}

          {activeView === 'pendientes' && (
            <div className="pedidos">
              <h2>Pedidos Pendientes</h2>
              {pedidosPendientes.map((pedido, index) => (
                <Pedido
                  key={index}
                  fecha={pedido.fecha}
                  total={pedido.total}
                  cantidad={pedido.cantidad}
                />
              ))}
            </div>
          )}

          {activeView === 'entregados' && (
            <div className="pedidos">
              <h2>Pedidos Entregados</h2>
              {pedidosEntregados.map((pedido, index) => (
                <Pedido
                  key={index}
                  fecha={pedido.fecha}
                  total={pedido.total}
                  cantidad={pedido.cantidad}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;