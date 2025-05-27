import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import RegisterEmployeeModal from '../../components/Modales/RegisterEmployeeModal.jsx';
import '../style/Admin/employees.css';

const Employees = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [empleadoEdit, setEmpleadoEdit] = useState(null);

  // Función para obtener empleados
  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/employee');
      console.log("Empleados obtenidos:", res.data);
      setEmpleados(res.data);
    } catch (err) {
      console.error("Error al obtener empleados:", err);
    }
  };

  // Función para eliminar empleado con confirmación
  const eliminarEmpleado = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción eliminará al empleado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/api/employee/${id}`);
        Swal.fire('¡Eliminado!', 'El empleado ha sido eliminado.', 'success');
        fetchEmployees();
      } catch (err) {
        console.error("Error al eliminar empleado:", err);
        Swal.fire('Error', 'No se pudo eliminar el empleado.', 'error');
      }
    }
  };

  // Cierra el modal y limpia estado
  const handleCloseModal = () => {
    console.log("Modal cerrado");
    setShowRegister(false);
    setEmpleadoEdit(null);
  };

  // Actualiza la lista y cierra modal tras éxito (crear o actualizar)
  const handleSuccess = () => {
    console.log("handleSuccess llamado: recargando lista y cerrando modal");
    fetchEmployees();
    handleCloseModal();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="employees-container">
      <div className="header-container">
        <div className="header-info">
          <h1 className="txth1">Empleados</h1>
          <p className="txt">Administra aquí los empleados de la empresa.</p>
        </div>
        <button
          onClick={() => {
            setEmpleadoEdit(null);
            setShowRegister(true);
          }}
          className="modal-btn"
        >
          Registrar nuevo empleado
        </button>
      </div>

      <RegisterEmployeeModal
        isVisible={showRegister}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        employeeToEdit={empleadoEdit}
      />

      <div className="tabla-contenedor">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Contraseña</th>
              <th>FechaNac</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map(emp => (
              <tr key={emp._id}>
                <td>{emp.fullName}</td>
                <td>{emp.username}</td>
                <td>{emp.email}</td>
                <td>********</td>
                <td>{emp.birth}</td>
                <td>{emp.phone}</td>
                <td>{emp.role}</td>
                <td>{emp.direction}</td>
                <td>
                  <button
                    className="btn-editar"
                    onClick={() => {
                      setEmpleadoEdit(emp);
                      setShowRegister(true);
                    }}
                  >
                    Editar
                  </button>
                  <button className="btn-eliminar" onClick={() => eliminarEmpleado(emp._id)}>Eliminar</button>
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
