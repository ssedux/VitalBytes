import React, { useState } from 'react';
import Modal from './Modal';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';

const VerifyEmailModal = ({ isVisible, onClose, onSuccess, email, password }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const res = await axios.post('http://localhost:4000/api/registerClient/verifyCodeEmail', {
        verificationCode: code
      }, { withCredentials: true });
      if (res.data.message && res.data.message.toLowerCase().includes('exitosamente')) {
        setSuccess(true);
        setTimeout(async () => {
          setSuccess(false);
          // Login automático tras verificación exitosa
          if (email && password) {
            await login(email, password);
          }
          onSuccess && onSuccess();
          onClose();
        }, 1500);
      } else {
        setError(res.data.message || 'Código incorrecto.');
      }
    } catch (err) {
      setError('Error al verificar el código.');
    }
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <h2>Verifica tu correo</h2>
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Código de verificación"
            value={code}
            onChange={e => setCode(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">¡Correo verificado exitosamente!</div>}
        <button type="submit" className="modal-button">Verificar</button>
      </form>
    </Modal>
  );
};

export default VerifyEmailModal;
