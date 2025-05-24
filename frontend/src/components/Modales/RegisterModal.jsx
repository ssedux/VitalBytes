import React, { useState } from 'react';
import Modal from './Modal.jsx';
import { FaUser, FaUserCircle, FaEnvelope, FaLock, FaBirthdayCake, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import VerifyEmailModal from './VerifyEmailModal.jsx';

const RegisterModal = ({ isVisible, onClose, onSwitchToLogin }) => {
    const [form, setForm] = useState({
        nombre: '',
        usuario: '',
        correo: '',
        password: '',
        confirmPassword: '', // Nuevo campo
        nacimiento: '',
        telefono: ''
    });
    const { register } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [pendingRegister, setPendingRegister] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validación de campos
        if (!form.nombre || !form.usuario || !form.correo || !form.password || !form.confirmPassword || !form.nacimiento || !form.telefono) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        // Validar que las contraseñas coincidan
        if (form.password !== form.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        // Validar formato de correo
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.correo)) {
            setError('Correo electrónico inválido.');
            return;
        }
        // Validar formato de fecha
        if (!/^\d{4}-\d{2}-\d{2}$/.test(form.nacimiento)) {
            setError('Fecha de nacimiento inválida.');
            return;
        }
        // Validar teléfono (8 dígitos)
        if (!/^\d{8}$/.test(form.telefono.replace(/-/g, ''))) {
            setError('El teléfono debe tener 8 dígitos.');
            return;
        }
        setError('');
        const userData = {
            fullname: form.nombre,
            username: form.usuario,
            email: form.correo,
            password: form.password,
            birth: form.nacimiento,
            phone: form.telefono.replace(/-/g, ''),
        };
        const ok = await register(userData);
        if (ok) {
            setSuccess(true);
            setError('');
            setPendingRegister(userData.email);
            // Espera un momento para mostrar el mensaje de éxito antes de mostrar el modal de verificación
            setTimeout(() => {
                setShowVerifyModal(true);
            }, 1200); // 1.2 segundos
        } else {
            setError('Error al registrar. Intenta con otro correo.');
        }
    };

    return (
        <>
        <Modal isVisible={isVisible} onClose={onClose} customClass="register-modal-custom">
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
                        autoComplete="email"
                    />
                </div>
                <div className="input-group">
                    <FaLock className="input-icon" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <span
                        className="eye-icon"
                        onClick={() => setShowPassword((v) => !v)}
                        style={{ cursor: 'pointer', marginLeft: 8 }}
                        tabIndex={-1}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div className="input-group">
                    <FaLock className="input-icon" />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirmar Contraseña"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <span
                        className="eye-icon"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        style={{ cursor: 'pointer', marginLeft: 8 }}
                        tabIndex={-1}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
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
                {error && <div className="modal-error">{error}</div>}
                {success && <div className="modal-success">¡Registro exitoso!</div>}
                <button type="submit" className="modal-btn">Registrarse</button>
            </form>
            <p className="modal-switch-text">
                ¿Ya tienes cuenta?{' '}
                <span className="modal-switch-link" onClick={onSwitchToLogin}>
                    Inicia sesión aquí
                </span>
            </p>
        </Modal>
        <VerifyEmailModal
            isVisible={showVerifyModal}
            onClose={() => setShowVerifyModal(false)}
            onSuccess={() => {
                setShowVerifyModal(false);
                setPendingRegister(null);
                onClose();
            }}
            email={form.correo}
            password={form.password}
        />
        </>
    );
};

export default RegisterModal;