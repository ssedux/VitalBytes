import React, { createContext, useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(null); // 'admin' | 'client' | null
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.userType) {
        setUserType(data.userType);
        setIsAuthenticated(true);
        return data.userType;
      } else {
        setUserType(null);
        setIsAuthenticated(false);
        return null;
      }
    } catch (err) {
      setUserType(null);
      setIsAuthenticated(false);
      return null;
    }
  };

  const register = async (userData) => {
    try {
      console.log('Registering user:', userData); // Log data being sent
      const res = await fetch('http://localhost:4000/api/registerClient', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      console.log('Register response:', data); // Log backend response
      if (res.ok) {
        setUserType('client');
        setIsAuthenticated(true);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Register error:', err); // Log fetch error
      return false;
    }
  };

  const logout = async () => {
    await fetch('http://localhost:4000/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUserType(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ userType, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// En el componente de login (donde está el input de password):
// Reemplaza el input de password por esto:
// <div className="input-group">
//   <input
//     type={showPassword ? "text" : "password"}
//     name="password"
//     placeholder="Contraseña"
//     value={password}
//     onChange={handleChange}
//     required
//   />
//   <span
//     className="eye-icon"
//     onClick={() => setShowPassword((v) => !v)}
//     style={{ cursor: 'pointer', marginLeft: 8 }}
//   >
//     {showPassword ? <FaEyeSlash /> : <FaEye />}
//   </span>
// </div>
