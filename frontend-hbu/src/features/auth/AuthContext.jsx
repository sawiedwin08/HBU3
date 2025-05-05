// import React, { createContext, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// // import axios from 'axios';
// import { API_URL } from '../../apiConfig';
// import { api, apiNoAuth, setAuthToken } from '../../Api';

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(localStorage.getItem('user') || null);
//     const [fullName, setFullname] = useState(localStorage.getItem('username') || null);
//     const [role, setRole] = useState(localStorage.getItem('role') || null);
//     const [token, setToken] = useState(localStorage.getItem('tokens') || null);

//     useEffect(() => {
//         // Si ya existe un token en localStorage al cargar el componente, establecerlo en los headers
//         if (token) {
//             setAuthToken(token);
//         }
//     }, [token]);

//     const login = async (credentials) => {
//         try {
//             const response = await apiNoAuth.post(`${API_URL}`, credentials);
//             if (response.status === 200 || response.status === 201) {
//                 console.log("Respuesta del servidor:", response.data);
                
//                 const { tokens, role, user, username } = response.data;
//                 console.log("Token:", tokens.access);
//                 console.log("Token refresh:", tokens.refresh);
    
//                 setAuthToken(tokens); 
    
//                 setUser(user);
//                 setFullname(username);
//                 setRole(role);
//                 setToken(tokens);
    
//                 // Guardar en localStorage
//                 localStorage.setItem('tokens', tokens.access);
//                 localStorage.setItem('role', role);
//                 localStorage.setItem('user', user);
//                 return true;
//             }else{
//                 return false;
//             }

//         } catch (error) {
//             console.error("Error al iniciar sesión:", error);
//             return false;
//         }
//     };

//     const logout = () => {
//         // Eliminar el token y los datos del usuario
//         setAuthToken(null);
//         setUser(null);
//         setRole(null);
//         setFullname(null);
//         setToken(null);

//         // Remover del localStorage
//         localStorage.removeItem('tokens');
//         localStorage.removeItem('role');
//         localStorage.removeItem('user');
//     };

//     return (
//         <AuthContext.Provider value={{ user, role, token, fullName, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// AuthProvider.propTypes = {
//     children: PropTypes.node.isRequired,
// };

// export default AuthProvider;

import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { API_URL } from "../../apiConfig";
import { apiNoAuth, setAuthToken } from "../../Api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [fullName, setFullname] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado

  useEffect(() => {
    const storedToken = localStorage.getItem("tokens");
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    const storedFullName = localStorage.getItem("username");

    if (storedToken) {
      setAuthToken(storedToken); // Configura Axios
      setUser(storedUser);
      setRole(storedRole);
      setToken(storedToken);
      setFullname(storedFullName);
    }
    setLoading(false); // Cambiar a falso después de cargar el estado inicial
  }, []);

  const login = async (credentials) => {
    try { 
      const response = await apiNoAuth.post(`${API_URL}`, credentials);
      if (response.status === 200 || response.status === 201) {
        const { tokens, role, user, username } = response.data;


        setAuthToken(tokens.access); // Configura Axios
        setUser(user);
        setRole(role);
        setToken(tokens);
        setFullname(username);

        localStorage.setItem("tokens", tokens.access);
        localStorage.setItem("role", role);
        localStorage.setItem("user", user);
        localStorage.setItem("username", username);
        localStorage.setItem("refresh", tokens.refresh);

        return true;
      }
      return false;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return false;
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setRole(null);
    setToken(null);

    localStorage.removeItem("tokens");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("refresh");
    localStorage.removeItem("fullName");
  };

  return (
    <AuthContext.Provider value={{ user, role, fullName, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
