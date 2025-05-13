import React, { useState } from 'react';
import './style/Nav.css';
import logo from '../assets/logovitalBytes.webp';
import Submenulog from './submenulog.jsx';

const Nav = () => {
    const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);

    const ToggleSubmenu = () => {
        setIsSubmenuVisible(!isSubmenuVisible);
    };

    //constante para nav
    const getActiveClass = (path) => {
        return window.location.pathname === path ? 'active' : '';
    };

    return (
        <div className="div">
            <nav>
                <img src={logo} className="logo" alt="Vital Bytes Logo" />
                <h1 className="titulo">Vital Bytes</h1>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/Home" className={getActiveClass('/Home')}>Inicio</a>
                    </li>
                    <li>
                        <a href="/Catalogo" className={getActiveClass('/Catalogo')}>Catalogo</a>
                    </li>
                    <li>
                        <a href="/Contacto" className={getActiveClass('/Contacto')}>Contacto</a>
                    </li>
                </ul>
                <div className="MiPerfil" onClick={ToggleSubmenu}>
                    <i className="fa-solid fa-circle-user user-pic"></i>
                    <a href="#">Mi perfil</a>
                    <i
                        className={`fa-solid fa-chevron-right arrow-right ${
                            isSubmenuVisible ? 'active' : ''
                        }`}
                        id="arrow-right"
                    ></i>
                </div>
                <div
                    className={`submenu ${isSubmenuVisible ? 'active' : ''}`}
                    id="submenu"
                >
                    <Submenulog />
                </div>
                <div className="linea-vertical"></div>
                <a href="/Cart">
                    <i className="fa-solid fa-cart-shopping cart-icon"></i>
                </a>
            </nav>
        </div>
    );
};

export default Nav;