import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import Modal from './Modal.jsx'; // se reutiliza correctamente

const EditUserModal = ({ isVisible, onClose, userToEdit, onUserUpdated }) => {
  const [form, setForm] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    birth: '',
    phone: ''
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userToEdit) {
      setForm({
        fullname: userToEdit.fullname || '',
        username: userToEdit.username || '',
        email: userToEdit.email || '',
        password: '',
        birth: userToEdit.birth ? new Date(userToEdit.birth).toISOString().split('T')[0] : '',
        phone: userToEdit.phone || ''
      });
      setError('');
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullname || !form.username || !form.email || !form.birth || !form.phone) {
      setError('Todos los campos excepto contraseña son obligatorios.');
      return;
    }

    try {
      const updateData = { ...form };
      if (!updateData.password) delete updateData.password;

      const res = await fetch(`http://localhost:4000/api/client/${userToEdit._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });

      const data = await res.json();

      if (res.ok) {
        swal("¡Éxito!", "Usuario actualizado exitosamente.", "success");
        onUserUpdated();
        onClose();
      } else {
        setError(data.message || 'Error al actualizar usuario.');
      }
    } catch (err) {
      setError('Error al actualizar usuario.');
    }
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit} noValidate>
        <input type="text" name="fullname" placeholder="Nombre completo" value={form.fullname} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Usuario" value={form.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Dejar vacío para no cambiar contraseña"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <button type="button" onClick={() => setShowPassword(v => !v)} style={{ marginBottom: '10px' }}>
          {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        </button>
        <input type="date" name="birth" value={form.birth} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} required />
        {error && <p className="error">{error}</p>}
        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Guardar cambios</button>
          <button type="button" onClick={onClose} style={{ marginLeft: 10 }}>Cancelar</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;
