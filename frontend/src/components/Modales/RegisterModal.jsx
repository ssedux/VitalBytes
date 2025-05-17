import React from 'react';
import Modal from './Modal.jsx';

const RegisterModal = ({ isVisible, onClose }) => {
    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <h2>Registrarse</h2>
            <p>Aquí puedes agregar el formulario de registro.</p>
        </Modal>
    );
};

export default RegisterModal;