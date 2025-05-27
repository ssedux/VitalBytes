import React, { useEffect, useState } from 'react';
import '../style/Admin/users.css';

const usuariosEjemplo = [
  {
    idCliente: '001',
    nombre: 'Juan Pérez',
    usuario: 'jperez',
    correo: 'juan@example.com',
    contraseña: '********',
    fechaNac: '1990-05-20',
    telefono: '555-1234'
  },
  {
    idCliente: '002',
    nombre: 'María López',
    usuario: 'mlopez',
    correo: 'maria@example.com',
    contraseña: '********',
    fechaNac: '1985-11-15',
    telefono: '555-5678'
  },
  {
    idCliente: '003',
    nombre: 'Carlos Ruiz',
    usuario: 'cruiz',
    correo: 'carlos@example.com',
    contraseña: '********',
    fechaNac: '1992-02-10',
    telefono: '555-9012'
  },
  {
    idCliente: '004',
    nombre: 'Ana Torres',
    usuario: 'atorres',
    correo: 'ana@example.com',
    contraseña: '********',
    fechaNac: '1991-08-07',
    telefono: '555-3456'
  },
  {
    idCliente: '005',
    nombre: 'Luis Gómez',
    usuario: 'lgomez',
    correo: 'luis@example.com',
    contraseña: '********',
    fechaNac: '1988-03-12',
    telefono: '555-7890'
  },
  {
    idCliente: '006',
    nombre: 'Laura Sánchez',
    usuario: 'lsanchez',
    correo: 'laura@example.com',
    contraseña: '********',
    fechaNac: '1993-10-25',
    telefono: '555-4567'
  },
  {
    idCliente: '007',
    nombre: 'Diego Fernández',
    usuario: 'dfernandez',
    correo: 'diego@example.com',
    contraseña: '********',
    fechaNac: '1989-04-30',
    telefono: '555-6789'
  },
  {
    idCliente: '008',
    nombre: 'Camila Herrera',
    usuario: 'cherrera',
    correo: 'camila@example.com',
    contraseña: '********',
    fechaNac: '1995-07-14',
    telefono: '555-2345'
  },
  {
    idCliente: '009',
    nombre: 'Andrés Castro',
    usuario: 'acastro',
    correo: 'andres@example.com',
    contraseña: '********',
    fechaNac: '1994-09-19',
    telefono: '555-1122'
  },
  {
    idCliente: '010',
    nombre: 'Valentina Ríos',
    usuario: 'vrios',
    correo: 'valentina@example.com',
    contraseña: '********',
    fechaNac: '1996-01-03',
    telefono: '555-3344'
  }
];

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    setUsuarios(usuariosEjemplo);
  }, []);

  const usuariosFiltrados = usuarios.filter(user =>
    Object.values(user).some(value =>
      value.toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  const handleEliminar = (id) => {
    const confirmacion = window.confirm("¿Estás seguro que deseas eliminar este usuario?");
    if (confirmacion) {
      setUsuarios(prevUsuarios => prevUsuarios.filter(user => user.idCliente !== id));
    }
  };

  const handleEditar = (id) => {
    alert(`Editar usuario con ID: ${id}`);
    // Aquí puedes abrir un modal o navegar a otra vista con los datos del usuario a editar
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
              <th>IdCliente</th>
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
              <tr key={user.idCliente}>
                <td>{user.idCliente}</td>
                <td>{user.nombre}</td>
                <td>{user.usuario}</td>
                <td>{user.correo}</td>
                <td>{user.contraseña}</td>
                <td>{user.fechaNac}</td>
                <td>{user.telefono}</td>
                <td>
                  <button className="btn-editar" onClick={() => handleEditar(user.idCliente)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => handleEliminar(user.idCliente)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
