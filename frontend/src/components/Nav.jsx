import React, { useState } from 'react';
import './style/Nav.css';
import logo from '../assets/logovitalBytes.webp';
import Submenu1 from './submenu1.jsx';
 

const Nav = () => {
    const [isSubmenuVisible, SetIsSubmenuVisible] = useState(false);
    const ToggleSubmenu = () => {
        SetIsSubmenuVisible(!isSubmenuVisible);
    };
    return (
        <div className="div">
            <nav>
                <img src={logo} className="logo" alt="Vital Bytes Logo" />
                <h1 className="titulo">Vital Bytes</h1>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/Home">Inicio</a>
                    </li>
                    <li>
                        <a href="/Catalogo">Catalogo</a>
                    </li>
                    <li>
                        <a href="/Contacto">Contacto</a>
                    </li>
                </ul>
                <div className="MiPerfil" onClick={ToggleSubmenu}>
                    <i className="fa-solid fa-circle-user user-pic"></i>
                    <a href="#">Mi perfil</a>
                    <i className={`fa-solid fa-chevron-right arrow-right ${isSubmenuVisible ? ' active' : ''}`}id="arrow-right"></i>
                </div>
                <div className={`submenu ${isSubmenuVisible ? ' active' : ''}`} id="submenu">
                    <Submenu1 />
                </div>
                <div className="linea-vertical"></div>
                <i href="/Cart" class="fa-solid fa-cart-shopping cart-icon"></i>
            </nav>
        </div>
    );
};

export default Nav;