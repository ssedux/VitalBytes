import React, { useState } from 'react';
import './style/Submenu.css';
import LogModal from './Modales/logModal.jsx';
import RegisterModal from './Modales/RegisterModal.jsx';

const Submenu1 = () => {
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

    const openLoginModal = () => {
        setIsLoginModalVisible(true);
        setIsRegisterModalVisible(false);
    };

    const closeLoginModal = () => {
        setIsLoginModalVisible(false);
    };

    const openRegisterModal = () => {
        setIsRegisterModalVisible(true);
        setIsLoginModalVisible(false);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalVisible(false);
    };

    return (
        <div className="bloque">
            <a href="#" className="submenu-link" onClick={openLoginModal}>
                <i className="fa-solid fa-right-to-bracket"></i>
                <p>Iniciar sesión</p>
                <i className="fa-solid fa-chevron-right arrow-right"></i>
            </a>
            <hr />
            <a href="#" className="submenu-link" onClick={openRegisterModal}>
                <i className="fa-regular fa-address-card"></i>
                <p>Registrarse</p>
                <i className="fa-solid fa-chevron-right arrow-right"></i>
            </a>

            <LogModal
                isVisible={isLoginModalVisible}
                onClose={closeLoginModal}
                onSwitchToRegister={openRegisterModal}
            />
            <RegisterModal
                isVisible={isRegisterModalVisible}
                onClose={closeRegisterModal}
                onSwitchToLogin={openLoginModal}
            />
        </div>
    );
};

export default Submenu1;