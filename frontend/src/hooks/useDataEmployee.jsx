import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useDataEmployee = () => {
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

  return {
    showRegister,
    setShowRegister,
    empleados,
    setEmpleados,
    empleadoEdit,
    setEmpleadoEdit,
    fetchEmployees,
    eliminarEmpleado,
    handleCloseModal,
    handleSuccess
  };
}

export default useDataEmployee;