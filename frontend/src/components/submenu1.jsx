
    import React from 'react';
import './style/Submenu.css';

const Submenu1 = () => {
    return (
    <div className="submenu" id="submenu1">
    <div className="bloque">
        <a href="" class="submenu-link">
            <i class="fa-solid fa-right-to-bracket"></i>
            <p>Iniciar sesion</p>
            <i class="fa-solid fa-chevron-right arrow-right"></i>
        </a>
        <hr />
        <a href="" class="submenu-link">
            <i class="fa-regular fa-address-card"></i>
            <p>Registrarse</p>
            <i class="fa-solid fa-chevron-right arrow-right"></i>
        </a>
    </div>
</div>
  );
};

export default Submenu1;