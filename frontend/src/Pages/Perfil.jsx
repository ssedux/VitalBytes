import React, { useState, useEffect } from 'react';
import perfilImage from '../assets/Perfil.png';
import './style/Perfil.css';
import Pedido from '../components/Pedido';
import axios from 'axios';
// Si tienes AuthContext, descomenta la siguiente línea:
// import { useAuth } from '../context/AuthContext';

function Perfil() {
  const [activeView, setActiveView] = useState('perfil');
  const [orders, setOrders] = useState([]);
  // const { user } = useAuth(); // Si tienes contexto de usuario

  useEffect(() => {
    axios.get('http://localhost:3000/api/orders')
      .then(res => {
        // Si tienes user._id, filtra aquí:
        // setOrders(res.data.filter(order => order.client_id._id === user._id));
        setOrders(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const pedidosPendientes = orders.filter(o => o.state === 'Pendiente');
  const pedidosEntregados = orders.filter(o => o.state === 'Finalizado');

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
              {pedidosPendientes.length === 0 && <p>No hay pedidos pendientes.</p>}
              {pedidosPendientes.map((pedido, index) => (
                <Pedido
                  key={pedido._id || index}
                  fecha={new Date(pedido.order_date).toLocaleDateString()}
                  total={pedido.total_price}
                  cantidad={pedido.items.reduce((acc, item) => acc + item.quantity, 0)}
                />
              ))}
            </div>
          )}

          {activeView === 'entregados' && (
            <div className="pedidos">
              <h2>Pedidos Entregados</h2>
              {pedidosEntregados.length === 0 && <p>No hay pedidos entregados.</p>}
              {pedidosEntregados.map((pedido, index) => (
                <Pedido
                  key={pedido._id || index}
                  fecha={new Date(pedido.order_date).toLocaleDateString()}
                  total={pedido.total_price}
                  cantidad={pedido.items.reduce((acc, item) => acc + item.quantity, 0)}
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