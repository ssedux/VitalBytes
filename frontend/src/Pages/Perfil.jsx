import React from 'react';
import perfilImage from '../assets/Perfil.png'; // Importa la imagen
import './style/Perfil.css'; // Asegúrate de que la ruta sea correcta

function Perfil() {
  return (
    <div className="perfil">
      <img src={perfilImage} alt="Perfil" className="perfil-image" />
      <div className="info-block">
        <div className="info-content">
          <div className="info-row">
            <span className="info-label">Nombre:</span>
            <span className="info-value">Juan Pérez</span>
          </div>
          <div className="info-row">
            <span className="info-label">Correo:</span>
            <span className="info-value">juan.perez@example.com</span>
          </div>
          <div className="info-row">
            <span className="info-label">Usuario:</span>
            <span className="info-value">juanperez123</span>
          </div>
          <div className="info-row">
            <span className="info-label">Fecha de nacimiento:</span>
            <span className="info-value">01/01/1990</span>
          </div>
          <div className="info-row">
            <span className="info-label">Teléfono:</span>
            <span className="info-value">+123456789</span>
          </div>
          <div className="button-row">
            <button className="logout-button">Cerrar Sesión</button>
            <button className="edit-button">Editar Usuario</button>
          </div>
        </div>
      </div>
      <div className="linea-vertical"></div>
    </div>
  );
}

export default Perfil;