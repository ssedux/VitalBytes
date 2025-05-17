import React, { useState } from 'react';
import Modal from './Modal.jsx';
import { FaUser, FaUserCircle, FaEnvelope, FaLock, FaBirthdayCake, FaPhone } from 'react-icons/fa';

const RegisterModal = ({ isVisible, onClose, onSwitchToLogin }) => {
    const [form, setForm] = useState({
        nombre: '',
        usuario: '',
        correo: '',
        password: '',
        nacimiento: '',
        telefono: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'telefono') {
            // Solo permitir números y máximo 8 dígitos (sin contar el guion)
            let raw = value.replace(/[^0-9]/g, '');
            if (raw.length > 8) raw = raw.slice(0, 8);
            // Insertar guion después del cuarto número si hay más de 4
            if (raw.length > 4) {
                raw = raw.slice(0, 4) + '-' + raw.slice(4);
            }
            setForm({ ...form, [name]: raw });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar el registro
    };

    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit} className="modal-form">
                <div className="input-group">
                    <FaUser className="input-icon" />
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaUserCircle className="input-icon" />
                    <input
                        type="text"
                        name="usuario"
                        placeholder="Usuario"
                        value={form.usuario}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input
                        type="email"
                        name="correo"
                        placeholder="Correo Electrónico"
                        value={form.correo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaLock className="input-icon" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaBirthdayCake className="input-icon" />
                    <input
                        type="date"
                        name="nacimiento"
                        placeholder="Fecha de Nacimiento"
                        value={form.nacimiento}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaPhone className="input-icon" />
                    <input
                        type="tel"
                        name="telefono"
                        placeholder="Teléfono"
                        value={form.telefono}
                        onChange={handleChange}
                        maxLength={9} // 8 dígitos + 1 guion
                        required
                    />
                </div>
                <button type="submit" className="modal-btn">Registrarse</button>
            </form>
            <p className="modal-switch-text">
                ¿Ya tienes cuenta?{' '}
                <span className="modal-switch-link" onClick={onSwitchToLogin}>
                    Inicia sesión aquí
                </span>
            </p>
        </Modal>
    );
};

export default RegisterModal;