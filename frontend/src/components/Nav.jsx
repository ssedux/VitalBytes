import React from 'react';
import './style/Nav.css';
import logo from '../assets/logovitalBytes.webp'; 


const Nav = () => {
    return (
    <div className="div">
        <nav>
            <img src={logo} className="logo" alt="Vital Bytes Logo" />
            <h1 className="text-2xl font-bold text-gray-800">Vital Bytes</h1>
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
                <div className="MiPerfil">
                <i class="fa-solid fa-circle-user user-pic"></i>
                <label htmlFor="">Mi perfil</label>
                <i class="fa-solid fa-chevron-right"></i>
                </div>
                <div className="linea-vertical"></div>
                <i class="fa-solid fa-cart-shopping"></i>
        </nav>
        </div>
    );
};

export default Nav;