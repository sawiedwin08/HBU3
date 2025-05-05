// import axios from 'axios';
// import { API_URL } from './apiConfig';

// // Instancia de axios para solicitudes autenticadas (con token)
// const api = axios.create({
//     baseURL: API_URL,
// });

// // Instancia de axios para solicitudes no autenticadas (sin token)
// const apiNoAuth = axios.create({
//     baseURL: API_URL,
// });

// // Función para establecer o eliminar el token en el encabezado Authorization
// export const setAuthToken = (tokens) => {
//     if (tokens) {
//         // console.log(`Bearer ${token}`);
//         api.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;
//     } else {
//         delete api.defaults.headers.common['Authorization'];
//     }
// };

// // Exportar ambas instancias de axios para que puedas usarlas en otros archivos
// export { api, apiNoAuth };


import axios from 'axios';
import { API_URL } from './apiConfig';

// Instancia de axios para solicitudes autenticadas
const api = axios.create({
    baseURL: API_URL,
});

// Instancia de axios para solicitudes no autenticadas
const apiNoAuth = axios.create({
    baseURL: API_URL,
});

// Función para establecer o eliminar el token en el encabezado Authorization
export const setAuthToken = (tokens) => {
    if (tokens) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokens}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// Interceptor para manejar errores de Axios en la instancia autenticada
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Manejo de errores 401 (Token expirado)
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh'); // Asegúrate de guardar este token
                if (refreshToken) {
                    const response = await apiNoAuth.post('token/refresh/', { refresh: refreshToken });
                    const newAccessToken = response.data.access;

                    // Actualiza el token y reintenta la solicitud original
                    localStorage.setItem('tokens', newAccessToken);
                    setAuthToken(newAccessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error('Error al renovar el token:', refreshError);
                // Redirige al usuario al login si la renovación falla
                window.location.href = '/auth';
            }
        }
        return Promise.reject(error);
    }
);

// Exportar instancias
export { api, apiNoAuth };
