import React, { useState } from 'react';
import './style/Nav.css';
import logo from '../assets/logovitalBytes.webp';

const NavAdmin = () => {
    const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
    const [isAdminView, setIsAdminView] = useState(true);

    const ToggleSubmenu = () => {
        setIsSubmenuVisible(!isSubmenuVisible);
    };

    const getActiveClass = (path) => {
        return window.location.pathname === path ? 'active' : '';
    };

    const handleAdminLinkClick = (event) => {
        event.preventDefault(); // Evita la navegación automática
        const targetPath = event.currentTarget.getAttribute('href');
        window.history.pushState({}, '', targetPath); // Cambia la URL manualmente
        window.dispatchEvent(new PopStateEvent('popstate')); // Fuerza la actualización de las rutas
    };

    return (
        <div className="div">
            <nav>
                <img src={logo} className="logo" alt="Vital Bytes Logo" />
                <h1 className="titulo">Admin Panel</h1>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/Admin/Home" className={getActiveClass('/Admin/Home')} onClick={handleAdminLinkClick}>Inicio</a>
                    </li>
                    <li>
                        <a href="/Admin/Administracion" className={getActiveClass('/Admin/Administracion')} onClick={handleAdminLinkClick}>Administración</a>
                    </li>
                    <li>
                        <a href="/Admin/Users" className={getActiveClass('/Admin/Users')} onClick={handleAdminLinkClick}>Usuarios</a>
                    </li>
                    <li>
                        <a href="/Admin/Employees" className={getActiveClass('/Admin/Employees')} onClick={handleAdminLinkClick}>Empleados</a>
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
                    <ul>
                        <li><a href="/Admin/Perfil">Perfil</a></li>
                        <li><a href="/logout">Cerrar sesión</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavAdmin;