import React, { useEffect, useState } from 'react';
import '../style/Admin/users.css';
import swal from 'sweetalert';
import EditUserModal from '../../components/Modales/EditUserModal';

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  const cargarUsuarios = () => {
    fetch('http://localhost:4000/api/client')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Error al cargar usuarios:', err));
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter(user =>
    Object.values(user).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  const handleEliminar = (id) => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este usuario.",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:4000/api/client/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(() => {
            swal("Usuario eliminado", { icon: "success" });
            setUsuarios(prev => prev.filter(user => user._id !== id));
          })
          .catch(err => {
            console.error(err);
            swal("Error al eliminar usuario", { icon: "error" });
          });
      }
    });
  };

  const handleEditar = (id) => {
    const usuario = usuarios.find(u => u._id === id);
    setUsuarioEditar(usuario);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setUsuarioEditar(null);
  };

  const actualizarLista = () => {
    cargarUsuarios();
  };

  return (
    <div className="users-container">
      <p className="titulo">Usuarios</p>
      <p className="descripcion">Administra aquí los clientes registrados en la plataforma.</p>
      <input
        type="text"
        placeholder="🔍 Buscar"
        className="buscador"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
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
              <th>Telefono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((user) => (
              <tr key={user._id}>
                <td>{user.fullname}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>********</td>
                <td>{new Date(user.birth).toLocaleDateString()}</td>
                <td>{user.phone}</td>
                <td>
                  <button className="btn-editar" onClick={() => handleEditar(user._id)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => handleEliminar(user._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditUserModal
        isVisible={modalVisible}
        onClose={cerrarModal}
        userToEdit={usuarioEditar}
        onUserUpdated={actualizarLista}
      />
    </div>
  );
};

export default Users;
