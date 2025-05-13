import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Nav from './components/Nav.jsx';
import Home from './Pages/Client/Home.jsx';
import Catalogo from './Pages/Client/Catalogo.jsx';
import Contacto from './Pages/Client/Contacto.jsx';
import Perfil from './Pages/Client/Perfil.jsx';
import Cart from './Pages/Client/Cart.jsx';
import Footer from './components/Footer';
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
        <Footer/>
      </Router>
    </>
  );
}

export default App;
