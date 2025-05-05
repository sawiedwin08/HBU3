import React from 'react'
import { Link } from 'react-router-dom';
// Icons
import { RiUserLine } from "react-icons/ri";
// image
import ImageLogin from '../../assets/images/imagenLogin.png'

import { useLocation } from 'react-router-dom';

const RegisterStepSecond = () => {
  const location = useLocation();
  const { email } = location.state || {};

  return (
    <div className='flex flex-row items-center bg-secondary-200 w-screen'>
      <div className="md:w-[45%] w-min h-screen">
        <img
          src={ImageLogin}
          alt="Universidad Cooperativa de Colombia"
          className="object-cover w-full h-full"
        />
      </div>
      <div className='flex-auto bg-secondary-200 lg:mx-28 p-4 rounded-xl w-auto lg:w-[55%]'>
        {/* <h1 className='text-2xl uppercase font-bold tracking-[2px] mb-8 text-center'>Crear cuenta en HBU</h1> */}
        <h1 className='text-xl font-bold text-center mb-8'>Activación de correo electronico</h1>
        <p className="mt-8 mb-4 text-center">
          Hemos enviado un correo de activación a tu correo {email}
        </p>
        {/* <form className='mb-2'>
          <div className="relative mb-4">
            <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2"/>
            <input type="text" className='py-2 pl-8 pr-4 w-full bg-secondary-100 outline-none rounded-lg'
            placeholder='Ingrese el código de Verificación' />
          </div>
          <div className='mt-4 lg:flex gap-4 lg:justify-center'>
            <button type='submit' className='bg-primary w-full py-2 px-4 text-white rounded-lg'>
              <Link to="/auth/registro/datos">
                Confirmar
              </Link>
            </button>
            <button type='submit' className='bg-primary py-2 px-4 w-full text-white rounded-lg'>Reenviar código</button>
          </div>
        </form> */}
        <div className='flex justify-center'>
          <button type='submit' className='bg-primary w-52 py-2 px-4 text-white rounded-lg'>
            <Link to="/auth">
              Iniciar sesión
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegisterStepSecond