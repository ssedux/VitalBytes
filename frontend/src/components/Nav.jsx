import React, { useState } from 'react';
import './style/Nav.css';
import logo from '../assets/logovitalBytes.webp';
import Submenu1 from './submenu1.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import SubmenuLog from './submenulog.jsx';

const Nav = () => {
    const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
    const { isAuthenticated } = useAuth();

    const ToggleSubmenu = () => {
        setIsSubmenuVisible(!isSubmenuVisible);
    };

    //constante para nav
    const getActiveClass = (path) => {
        // Para la ruta inicial, '/' y '/Home' deben ser activos
        if ((window.location.pathname === '/' && path === '/Home') || window.location.pathname === path) {
            return 'active';
        }
        return '';
    };

    return (
        <div className="div">
            <nav>
                <div className="logo-titulo-row">
                    <img src={logo} className="logo" alt="Vital Bytes Logo" />
                    <h1 className="titulo">Vital Bytes</h1>
                </div>
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
                <div className="perfil-cart-row">
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
                    <div className="linea-vertical"></div>
                    <a href="/Cart" className={getActiveClass('/Cart') + ' cart-link'}>
                        <i className={
                            'fa-solid fa-cart-shopping cart-icon' +
                            (getActiveClass('/Cart') === 'active' ? ' active' : '')
                        }></i>
                    </a>
                </div>
                <div
                    className={`submenu ${isSubmenuVisible ? 'active' : ''}`}
                    id="submenu"
                >
                    {isAuthenticated ? <SubmenuLog /> : <Submenu1 />}
                </div>
            </nav>
        </div>
    );
};

export default Nav;