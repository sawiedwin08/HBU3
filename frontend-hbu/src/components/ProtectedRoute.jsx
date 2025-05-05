// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../features/auth/AuthContext';
// import PropTypes from 'prop-types';

// const ProtectedRoute = ({ children }) => {
//     const { token } = useContext(AuthContext);
//     console.log(token,"sadasdasdasdsad");

//     if (!token) {
//         // Si no hay un token, redirige al login
//         return <Navigate to="/auth" replace />;
//     }

//     // Si hay un token, permite el acceso a la ruta
//     return children;
// };
// ProtectedRoute.propTypes = {
//     children: PropTypes.node.isRequired,
// };

// export default ProtectedRoute;

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../features/auth/AuthContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const { token, loading } = useContext(AuthContext);

    if (loading) {
        // Muestra un indicador de carga mientras se verifica el estado
        return <div>Cargando...</div>;
    }

    if (!token) {
        // Si no hay token, redirige al login
        return <Navigate to="/auth" replace />;
    }

    // Si hay un token, renderiza el contenido protegido
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
