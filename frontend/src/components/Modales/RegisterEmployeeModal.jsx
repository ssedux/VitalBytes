import React, { useState } from 'react';
import Modal from './Modal.jsx';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaBirthdayCake, FaPhone, FaUserTie, FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterEmployeeModal = ({ isVisible, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    birth: '',
    phone: '',
    role: '',
    direction: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación básica
    if (!form.fullName || !form.email || !form.username || !form.password || !form.birth || !form.phone || !form.role || !form.direction) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (!/^\d{8}$/.test(form.phone.replace(/-/g, ''))) {
      setError('El teléfono debe tener 8 dígitos.');
      return;
    }
    setError('');
    try {
      const res = await axios.post('http://localhost:4000/api/registerEmployees', form);
      if (res.data.message && res.data.message.toLowerCase().includes('registrado')) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onSuccess && onSuccess();
          onClose();
        }, 1200);
      } else {
        setError(res.data.message || 'Error al registrar empleado.');
      }
    } catch (err) {
      setError('Error al registrar empleado.');
    }
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <h2>Registrar Empleado</h2>
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="input-group">
          <FaUser className="input-icon" />
          <input type="text" name="fullName" placeholder="Nombre completo" value={form.fullName} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <FaUser className="input-icon" />
          <input type="text" name="username" placeholder="Usuario" value={form.username} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
          <span className="eye-icon" onClick={() => setShowPassword(v => !v)} style={{ cursor: 'pointer', marginLeft: 8 }} tabIndex={-1}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="input-group">
          <FaBirthdayCake className="input-icon" />
          <input type="date" name="birth" placeholder="Fecha de nacimiento" value={form.birth} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <FaPhone className="input-icon" />
          <input type="tel" name="phone" placeholder="Teléfono (8 dígitos)" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <FaUserTie className="input-icon" />
          <input type="text" name="role" placeholder="Rol" value={form.role} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <FaUser className="input-icon" />
          <input type="text" name="direction" placeholder="Dirección" value={form.direction} onChange={handleChange} required />
        </div>
        {error && <div className="modal-error">{error}</div>}
        {success && <div className="modal-success">¡Empleado registrado exitosamente!</div>}
        <button type="submit" className="modal-btn">Registrar</button>
      </form>
    </Modal>
  );
};

export default RegisterEmployeeModal;
