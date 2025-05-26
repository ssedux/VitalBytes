import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegisterEmployeeModal from '../../components/Modales/RegisterEmployeeModal.jsx';
import '../style/Admin/employees.css'; 

const empleadosEjemplo = [
  {
    idEmp: 'E001',
    nombre: 'Pedro Alvarado',
    usuario: 'palvarado',
    correo: 'pedro@example.com',
    contraseña: '********',
    fechaNac: '1990-01-15',
    telefono: '555-1111',
    rol: 'Administrador',
    estatus: 'Activo'
  },
  {
    idEmp: 'E002',
    nombre: 'Sandra Rivera',
    usuario: 'srivera',
    correo: 'sandra@example.com',
    contraseña: '********',
    fechaNac: '1985-04-10',
    telefono: '555-2222',
    rol: 'Recepcionista',
    estatus: 'Inactivo'
  },
  {
    idEmp: 'E003',
    nombre: 'Luis Hernández',
    usuario: 'lhernandez',
    correo: 'luis@example.com',
    contraseña: '********',
    fechaNac: '1992-06-20',
    telefono: '555-3333',
    rol: 'Mecánico',
    estatus: 'Activo'
  },
  {
    idEmp: 'E004',
    nombre: 'Carla Gómez',
    usuario: 'cgomez',
    correo: 'carla@example.com',
    contraseña: '********',
    fechaNac: '1988-09-05',
    telefono: '555-4444',
    rol: 'Contadora',
    estatus: 'Activo'
  },
  {
    idEmp: 'E005',
    nombre: 'Jorge Martínez',
    usuario: 'jmartinez',
    correo: 'jorge@example.com',
    contraseña: '********',
    fechaNac: '1995-03-18',
    telefono: '555-5555',
    rol: 'Técnico',
    estatus: 'Inactivo'
  },
  {
    idEmp: 'E006',
    nombre: 'Ana López',
    usuario: 'alopez',
    correo: 'ana@example.com',
    contraseña: '********',
    fechaNac: '1991-11-23',
    telefono: '555-6666',
    rol: 'Recepcionista',
    estatus: 'Activo'
  },
  {
    idEmp: 'E007',
    nombre: 'Diego Torres',
    usuario: 'dtorres',
    correo: 'diego@example.com',
    contraseña: '********',
    fechaNac: '1993-08-12',
    telefono: '555-7777',
    rol: 'Supervisor',
    estatus: 'Activo'
  },
  {
    idEmp: 'E008',
    nombre: 'Lucía Ramos',
    usuario: 'lramos',
    correo: 'lucia@example.com',
    contraseña: '********',
    fechaNac: '1989-12-02',
    telefono: '555-8888',
    rol: 'Mecánica',
    estatus: 'Inactivo'
  },
  {
    idEmp: 'E009',
    nombre: 'Marco Peña',
    usuario: 'mpena',
    correo: 'marco@example.com',
    contraseña: '********',
    fechaNac: '1990-07-29',
    telefono: '555-9999',
    rol: 'Administrador',
    estatus: 'Activo'
  },
  {
    idEmp: 'E010',
    nombre: 'Valeria Castro',
    usuario: 'vcastro',
    correo: 'valeria@example.com',
    contraseña: '********',
    fechaNac: '1996-04-17',
    telefono: '555-0000',
    rol: 'Soporte',
    estatus: 'Activo'
  }
];


const Employees = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    setEmpleados(empleadosEjemplo);
  }, []);

  return (
    <div className="employees-container">
      
      <div className="header-container">
        <div className="header-info">
          <h1 className="txth1">Empleados</h1>
          <p className="txt">Administra aquí los empleados de la empresa.</p>
        </div>
        <button onClick={() => setShowRegister(true)} className="modal-btn">
          Registrar nuevo empleado
        </button>
      </div>

      {/* Modal */}
      <RegisterEmployeeModal
        isVisible={showRegister}
        onClose={() => setShowRegister(false)}
        onSuccess={() => setShowRegister(false)}
      />

      {/* Tabla */}
      <div className="tabla-contenedor">
        <table className="tabla">
          <thead>
            <tr>
              <th>IdEmp</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Contraseña</th>
              <th>FechaNac</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map(emp => (
              <tr key={emp.idEmp}>
                <td>{emp.idEmp}</td>
                <td>{emp.nombre}</td>
                <td>{emp.usuario}</td>
                <td>{emp.correo}</td>
                <td>{emp.contraseña}</td>
                <td>{emp.fechaNac}</td>
                <td>{emp.telefono}</td>
                <td>{emp.rol}</td>
                <td>{emp.estatus}</td>
                <td>
                  <button className="btn-editar">Editar</button>
                  <button className="btn-eliminar">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;