import React from 'react';
import './style/Nav.css';
import logo from '../assets/logovitalBytes.webp'; 
import SubmenuLog from './submenulog.jsx';
import Submenu1 from './submenu1.jsx';


const Nav = () => {
    return (
    <div className="div">
        <nav>
            <img src={logo} className="logo" alt="Vital Bytes Logo" />
            <h1 className="titulo">Vital Bytes</h1>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/Inicio">
                            Inicio
                        </a>
                    </li>
                    <li>
                        <a href="/Catalogo">
                            Catalogo
                        </a>
                    </li>
                    <li>
                        <a href="/Contacto">
                            Contacto
                        </a>
                    </li>
                </ul>
                <div className="MiPerfil" onClick="toggleSubmenu()">
                <i class="fa-solid fa-circle-user user-pic"></i>
                <a  htmlFor="">Mi perfil</a>
                <i class="fa-solid fa-chevron-right arrow-right"></i>
                </div>
                <div className="linea-vertical"></div>
                <i class="fa-solid fa-cart-shopping cart-icon"></i>
             <Submenu1 />
             
                
        </nav>
        </div>
    );
};

export default Nav;