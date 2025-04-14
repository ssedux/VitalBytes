import React, { useState } from 'react';
import './style/Submenu.css';
import Modal from './Modales/logModal.jsx';
import RegisterModal from './Modales/RegisterModal.jsx';

const Submenu1 = () => {
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

    const openLoginModal = () => {
        setIsLoginModalVisible(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalVisible(false);
    };

    const openRegisterModal = () => {
        setIsRegisterModalVisible(true);
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

            <Modal isVisible={isLoginModalVisible} onClose={closeLoginModal}>
                <h2>Iniciar Sesión</h2>
                <p>Aquí puedes agregar el formulario de inicio de sesión.</p>
            </Modal>

            <RegisterModal isVisible={isRegisterModalVisible} onClose={closeRegisterModal} />
        </div>
    );
};

export default Submenu1;