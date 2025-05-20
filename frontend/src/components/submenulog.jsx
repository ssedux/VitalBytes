import React from 'react';
import './style/Submenu.css';
import { useAuth } from '../context/AuthContext.jsx';

const SubmenuLog = () => {
    const { logout } = useAuth();
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };
    return (
 
    <div className="bloque">
        <a href="/Perfil"><div className="userinfo">
        <i className="fa-solid fa-circle-user user-pic"></i>
        <h2>Mi perfil</h2>
        </div> </a>
        <hr />
   
    <a href="#" className="submenu-link" onClick={handleLogout}>
        <i className="fa-solid fa-right-from-bracket"></i>
        <p>Cerrar sesion</p>
        <i className="fa-solid fa-chevron-right arrow-right"></i>
    </a>
    
</div>
  );
};

export default SubmenuLog;