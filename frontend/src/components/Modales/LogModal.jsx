import React, { useState } from 'react';
import Modal from './Modal.jsx';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LogModal = ({ isVisible, onClose, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar el login
    };

    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="modal-form">
                <div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaLock className="input-icon" />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="modal-btn">Entrar</button>
            </form>
            <p className="modal-switch-text">
                ¿No tienes cuenta?{' '}
                <span className="modal-switch-link" onClick={onSwitchToRegister}>
                    Regístrate aquí
                </span>
            </p>
        </Modal>
    );
};

export default LogModal;
