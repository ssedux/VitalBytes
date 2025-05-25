import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegisterEmployeeModal from '../../components/Modales/RegisterEmployeeModal.jsx';

const Employees = () => {
    const [showRegister, setShowRegister] = useState(false);
    return (
        <div>
            <h1>Empleados</h1>
            <button onClick={() => setShowRegister(true)} className="modal-btn">Registrar nuevo empleado</button>
            <RegisterEmployeeModal
                isVisible={showRegister}
                onClose={() => setShowRegister(false)}
                onSuccess={() => setShowRegister(false)}
            />
            <p>Administra aquí los empleados de la empresa.</p>
        </div>
    );
};

export default Employees;