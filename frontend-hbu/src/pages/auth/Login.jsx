import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../features/auth/AuthContext';

// Icons
import { RiUserFill, RiLockFill, RiEyeFill, RiEyeOffFill } from "react-icons/ri";

// Image
import ImageLogin from '../../assets/images/imagenLogin.png';

const Login = () => {
  const [showPassword, setPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   const response = await fetch(API_URL, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ username, password }),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     localStorage.setItem('token', data.token);
    //     console.log(localStorage)
    //     navigate('/');
    //   } else {
    //     setErrorMessage('Usuario o contraseña incorrecta. Compruébalos');
    //   }
    // } catch (error) {
    //   console.log('Error:', error);
    //   setErrorMessage('Error en el servidor');
    // }

    e.preventDefault();
    try {
      const success = await login({ username, password });

      if (success) {
        navigate('/'); // Redirige si el inicio de sesión es exitoso
      } else {
        setErrorMessage('Usuario o contraseña incorrecta. Compruébalos');
      }
    } catch (error) {
      console.log('Error:', error);
      setErrorMessage('Error en el servidor');
    }

  };

  return (
    <div className='flex flex-row bg-secondary-200'>
      <div className="md:w-[45%] w-min h-screen">
        <img
          src={ImageLogin}
          alt="Universidad Cooperativa de Colombia"
          className="object-cover w-full h-full"
        />
      </div>
      <div className='flex items-center'>
        <div className='bg-secondary-200 md:mx-44 p-8 rounded-xl w-auto lg:w-[55%]'>
          <h1 className='text-3xl uppercase font-bold tracking-[2px] mb-8 text-center'>Bienvenido de nuevo</h1>
          <h1 className='text-xl font-bold text-center mb-8'>Iniciar sesión en su cuenta</h1>
          <form className='mb-2' onSubmit={handleSubmit}>
          {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
            <div className="relative mb-4">
              <RiUserFill className="absolute top-1/2 -translate-y-1/2 left-2"/>
              <input
                type="text"
                className='py-2 pl-8 pr-4 w-full bg-secondary-100 outline-none rounded-lg'
                placeholder='Usuario'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <RiLockFill className="absolute top-1/2 -translate-y-1/2 left-2 right"/>
              <input
                type={showPassword ? "text" : "password"}
                className='py-2 pl-8 pr-8 w-full bg-secondary-100 outline-none rounded-lg'
                placeholder='Contraseña'
                value={password}
                onChange={(e) => setPasswordValue(e.target.value)}
                required
              />
              {showPassword ? (
                <RiEyeFill onClick={() => setPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"/>
              ) : (
                <RiEyeOffFill onClick={() => setPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"/>
              )}
            </div>
            <div className='mt-4'>
              <button type='submit' className='bg-primary w-full py-2 px-4 text-white rounded-lg'>Iniciar sesión</button>
            </div>
          </form>
          <div className='text-right pr-1'>
            <Link to="/auth/recuperar-contrasena" className='hover:text-primary transition-colors'>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <p className="mt-8 text-center">
            ¿No tienes una cuenta?
            <Link to="/auth/registro" className="text-primary px-2 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;