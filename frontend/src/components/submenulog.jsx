import React from 'react';
import './style/submenu.css';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import LogoutConfirmModal from './LogoutConfirmModal.jsx';

const SubmenuLog = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = React.useState(false);
    const handleLogout = (e) => {
        e.preventDefault();
        setShowLogoutModal(true);
    };
    const confirmLogout = () => {
        logout();
        navigate('/');
    };
    const cancelLogout = () => setShowLogoutModal(false);
    return (
    <>
    <div className="bloque">
        <a href="/Perfil"><div className="userinfo">
        <i className="fa-solid fa-circle-user user-pic"></i>
        <h2>Mi perfil</h2>
        </div> </a>
        <hr />
    <a href="#" className="submenu-link" onClick={handleLogout}>
        <i className="fa-solid fa-right-from-bracket"></i>
        <p>Cerrar sesion</p>
        <i className="fa-solid fa-chevron-right arrow-right"></i>
    </a>
</div>
<LogoutConfirmModal isOpen={showLogoutModal} onConfirm={confirmLogout} onCancel={cancelLogout} />
</>
  );
};

export default SubmenuLog;