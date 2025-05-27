import React, { useEffect, useState } from 'react';
import Modal from './Modal.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBirthdayCake,
  FaPhone,
  FaUserTie,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';

const RegisterEmployeeModal = ({ isVisible, onClose, onSuccess, employeeToEdit }) => {
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

  useEffect(() => {
    if (employeeToEdit) {
      const formattedDate = employeeToEdit.birth
        ? new Date(employeeToEdit.birth).toISOString().split('T')[0]
        : '';

      setForm({
        fullName: employeeToEdit.fullName || '',
        email: employeeToEdit.email || '',
        username: employeeToEdit.username || '',
        password: '',
        birth: formattedDate,
        phone: employeeToEdit.phone || '',
        role: employeeToEdit.role || '',
        direction: employeeToEdit.direction || '',
      });
    } else {
      setForm({
        fullName: '',
        email: '',
        username: '',
        password: '',
        birth: '',
        phone: '',
        role: '',
        direction: ''
      });
    }
    setError('');
  }, [employeeToEdit, isVisible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.fullName || !form.email || !form.username ||
      (!employeeToEdit && !form.password) ||
      !form.birth || !form.phone || !form.role || !form.direction
    ) {
      setError('Todos los campos son obligatorios (excepto contraseña al editar).');
      return;
    }

    if (!/^\d{8}$/.test(form.phone.replace(/-/g, ''))) {
      setError('El teléfono debe tener 8 dígitos.');
      return;
    }

    setError('');

    try {
      if (employeeToEdit) {
        const dataToUpdate = { ...form };
        if (!dataToUpdate.password) delete dataToUpdate.password;

        const res = await axios.put(
          `http://localhost:4000/api/employee/${employeeToEdit._id}`,
          dataToUpdate
        );

        if (res.data.message) {
          if (res.data.message.toLowerCase().includes('updated')) {
            await Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Empleado actualizado exitosamente.',
              confirmButtonText: 'OK',
            });
            console.log("Llamando a onSuccess para actualizar");
            onSuccess && onSuccess();
          } else {
            setError(res.data.message || 'Error al actualizar empleado.');
          }
        } else {
          setError('Respuesta inesperada del servidor.');
        }
      } else {
        const res = await axios.post('http://localhost:4000/api/registerEmployees', form);

        if (res.data.message?.toLowerCase().includes('registrado')) {
          await Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Nuevo empleado añadido exitosamente.',
            confirmButtonText: 'OK',
          });
          onSuccess && onSuccess();
        } else {
          setError(res.data.message || 'Error al registrar empleado.');
        }
      }
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(employeeToEdit ? 'Error al actualizar empleado.' : 'Error al registrar empleado.');
      }
    }
  };

  if (!isVisible) return null;

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <h2>{employeeToEdit ? 'Actualizar Empleado' : 'Registrar Empleado'}</h2>
      <form onSubmit={handleSubmit} className="modal-form" noValidate>
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
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder={employeeToEdit ? "Dejar vacío para no cambiar contraseña" : "Contraseña"}
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <span className="eye-icon" onClick={() => setShowPassword(v => !v)} style={{ cursor: 'pointer', marginLeft: 8 }} tabIndex={-1}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="input-group">
          <FaBirthdayCake className="input-icon" />
          <input type="date" name="birth" value={form.birth} onChange={handleChange} required />
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

        <button type="submit" className="modal-btn">{employeeToEdit ? 'Actualizar' : 'Registrar'}</button>
      </form>
    </Modal>
  );
};

export default RegisterEmployeeModal;
