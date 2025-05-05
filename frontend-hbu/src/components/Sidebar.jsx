import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../apiConfig';

import { AuthContext } from '../features/auth/AuthContext';
import { api } from '../Api';
import { HeaderContext } from './context/HeaderContext';

// Icons
import { RiBarChart2Line, RiCalendarEventFill, RiUserSettingsLine, RiLogoutCircleLine, RiArrowRightSLine, RiMenuFill, RiCloseLine, RiSettings3Line } from 'react-icons/ri'
import { TbReportAnalytics } from "react-icons/tb";

// Image
import LogoUCC from "../assets/images/logoUCC.png"

const Sidebar = () => {

    const { setHeaderInfo } = useContext(HeaderContext);
    const [showMenu, setshowMenu] = useState(false)
    const [showSubmenu, setshowSubmenu] = useState(false)
    const navigate = useNavigate();

    const { token, role } = useContext(AuthContext);

    const { logout } = useContext(AuthContext);

    // const handleLogout = () => {
    //     localStorage.removeItem('token'); // Eliminar el token del localStorage
    //     navigate('/auth'); // Redirigir a la página de inicio de sesión (ajusta la ruta según tu aplicación)
    // };
    const data = {
        "refresh": localStorage.getItem('refresh'),
    }

    const handleOptionClick = (title, description) => {
        setHeaderInfo({ title, description });
      };

    const handleLogout = async () => {
        // const token = localStorage.getItem('token'); // Obtener el token del localStorage
        if (token) {
            try {
                console.log('sadasdasdsad',data);
                const response = await api.post(API_URL+`logout/`,data);
                console.log(response.data);
                if (response.status === 200) {
                    logout();
                    navigate('/auth');
                } else {
                    console.error('Error al cerrar sesión:', response.statusText);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        } else {
            navigate('/auth');
        }
    };

    return (
        <>
        <div className={`xl:h-[100vh] border overflow-y-scroll fixed xl:static w-[80%] md:w-[30%] xl:w-auto h-full top-0 bg-secondary-100 px-1 py-8 flex flex-col 
        justify-between z-50 ${showMenu ? "left-0" : "-left-full"} transition-all`}>
            <div>
                <h1 className='text-center text-2xl font-extrabold mb-10'>
                    HBU<span className='text-primary text-4xl'>.</span>
                </h1>
                <ul className='font-medium mx-2'>
                    <li onClick={() => handleOptionClick('Dashboard', 'Bienvenido de nuevo, Administrador')}>
                        <Link to="/" className={`flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors ${window.location.pathname === '/' ? 'bg-gray-100' : ''}`}>
                            <RiBarChart2Line className='text-primary text-xl'/>Inicio
                        </Link>
                    </li>
                    <li onClick={() => handleOptionClick('Gestión de actividades', 'Gestiona tus actividades')}>
                        <Link to="/Activities" className={`flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors ${window.location.pathname === '/Activities' ? 'bg-gray-100' : ''}`}>
                            <RiCalendarEventFill className='text-primary text-xl'/>Actividades
                        </Link>
                    </li>
                    <li>
                        <Link to="/Activities" className={`flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors ${window.location.pathname === '/Activities' ? 'bg-gray-100' : ''}`}>
                            <RiCalendarEventFill className='text-primary text-xl'/>Mis actividades
                        </Link>
                    </li>
                    {role === 'Administrador' && (
                        <>
                    <li>
                        <button onClick={() => setshowSubmenu(!showSubmenu)} className='w-full flex items-center justify-between py-2 pl-3 pr-4 rounded-lg hover:bg-gray-100 transition-colors'>
                            <span className='flex items-center gap-4'>
                            <RiUserSettingsLine className='text-primary text-xl'/>Usuarios
                            </span>
                            <RiArrowRightSLine  className={`mt-1 ${showSubmenu && "rotate-90"} transition-all`}/>
                        </button>
                        <ul className={`my-1 ${!showSubmenu && "hidden" }`}>
                            <li onClick={() => handleOptionClick('Gestión de Usuarios', 'Administra los docentes y colaboradores')}>
                                <Link to="/Collaborators" className={`py-2 px-4 border-l rounded-lg border-gray-400 ml-8 block relative before:w-2 before:h-2 
                                before:absolute before:rounded-full before:-left-1 before:top-1/2 before:-translate-y-1/2 
                                before:border-2 before:border-secondary-200 transition-colors hover:bg-gray-100 ${window.location.pathname === '/Collaborators' ? 'bg-gray-100 before:bg-primary' : 'before:bg-gray-100'}`}>
                                    Bienestar
                                </Link>
                            </li>
                            <li onClick={() => handleOptionClick('Gestión de Usuarios', 'Administra los estudiantes')}>
                                <Link to="/Estudents" className={`py-2 px-4 border-l rounded-lg border-gray-400 ml-8 block relative before:w-2 before:h-2 
                                before:absolute before:rounded-full before:-left-1 before:top-1/2 before:-translate-y-1/2 
                                before:border-2 before:border-secondary-200 transition-colors hover:bg-gray-100 ${window.location.pathname === '/Estudents' ? 'bg-gray-100 before:bg-primary' : 'before:bg-gray-100'}`}>
                                    Estudiantes
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li onClick={() => handleOptionClick('Reportes y Estadísticas', 'Visualiza y analiza los datos del sistema')}>
                        <Link to="/reports" className={`flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors ${window.location.pathname === '/reports' ? 'bg-gray-100' : ''}`}>
                            <TbReportAnalytics className='text-primary text-xl'/>Reportes
                        </Link>
                    </li>
                    <li onClick={() => handleOptionClick('Ajustes', 'Configura tu cuenta y preferencias del sistema')}>
                        <Link to="/settings" className={`flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors ${window.location.pathname === '/settings' ? 'bg-gray-100' : ''}`}>
                            <RiSettings3Line  className='text-primary text-xl'/>Ajustes
                        </Link>
                    </li>
                    </>
                    )}
                </ul>
            </div>
            <div>
                <nav onClick={handleLogout}>
                <Link className='flex items-center gap-4 mb-4 mx-2 px-3 py-2 rounded-lg text-red-500 hover:text-red-500 font-medium hover:bg-red-100'>
                    <RiLogoutCircleLine className='text-red-500 text-xl'/>Cerrar sesión
                </Link>
                </nav>
                <div className='flex justify-center items-center mt-2'>
                    <img className='w-32 h-28' src={LogoUCC} alt="" />
                </div>
            </div>
        </div>
        <button onClick={() => setshowMenu(!showMenu)} className='fixed bottom-4 right-4 xl:hidden bg-primary p-3 rounded-full z-50'>
            { showMenu ? <RiCloseLine />: <RiMenuFill/>}
        </button>
        </>
    )
}

export default Sidebar