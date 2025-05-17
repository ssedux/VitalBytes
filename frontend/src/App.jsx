import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import Nav from './components/Nav.jsx';
import NavAdmin from './components/NavAdmin.jsx';
import Home from './Pages/Client/Home.jsx';
import Catalogo from './Pages/Client/Catalogo.jsx';
import Contacto from './Pages/Client/Contacto.jsx';
import Perfil from './Pages/Perfil.jsx';
import Cart from './Pages/Client/Cart.jsx';
import Administracion from './Pages/Admin/Administracion.jsx';
import Users from './Pages/Admin/Users.jsx';
import Employees from './Pages/Admin/Employees.jsx';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isAdminView, setIsAdminView] = useState(false);

  const toggleView = () => {
    setIsAdminView(!isAdminView);
  };

  return (
    <>
      <Router>
        {isAdminView ? <NavAdmin /> : <Nav />}
        <button onClick={toggleView} className="toggle-view-button">
          Cambiar a {isAdminView ? 'Vista Cliente' : 'Vista Admin'}
        </button>
        <Routes>
          {isAdminView ? (
            // Rutas para administrador
            <>
              <Route path="/Admin/Home" element={<Administracion />} />
              <Route path="/Admin/Users" element={<Users />} />
              <Route path="/Admin/Employees" element={<Employees />} />
              <Route path="/Admin/Administracion" element={<Administracion />} />
            </>
          ) : (
            // Rutas para cliente
            <>
              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Catalogo" element={<Catalogo />} />
              <Route path="/Contacto" element={<Contacto />} />
              <Route path="/Perfil" element={<Perfil />} />
              <Route path="/Cart" element={<Cart />} />
            </>
          )}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
