import React from 'react';
import './style/Submenu.css';

const SubmenuLog = () => {
    return (
    <div className="submenu" id="submenuLog">
    <div className="bloque">
        <div href="/Perfil"className="userinfo">
        <i class="fa-solid fa-circle-user user-pic"></i>
        <h2>Mi perfil</h2>
        </div> 
        <hr />
   
    <a href="" class="submenu-link">
        <i class="fa-solid fa-right-from-bracket"></i>
        <p>Cerrar sesion</p>
        <i class="fa-solid fa-chevron-right arrow-right"></i>
    </a>
    </div>
    
</div>
  );
};

export default SubmenuLog;