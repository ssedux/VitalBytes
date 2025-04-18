import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Nav from './components/Nav.jsx';
import Home from './Pages/Home.jsx';
import Catalogo from './Pages/Catalogo.jsx';
import Contacto from './Pages/Contacto.jsx';
import Perfil from './Pages/Perfil.jsx';
import Cart from './Pages/Cart.jsx';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} /> {/* Ruta predeterminada */}
          <Route path="/Home" element={<Home />} />
          <Route path="/Catalogo" element={<Catalogo />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
