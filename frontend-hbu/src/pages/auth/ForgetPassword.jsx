import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// Icons
import { RiMailLine } from "react-icons/ri";

// image
import ImageLogin from '../../assets/images/imagenLogin.png'
import { api } from '../../Api';

const ForgetPassword = () => {

  const [formData, setFormData] = useState({
    email: ''
  })

  // const history = useNavigate();

  const { email } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev, [e.target.name]: e.target.value 
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await api.post('users/request-reset-email/', formData);
      if (response.status === 200) {
        console.log(response.data);
        console.log('Correo enviado');
      } else {
        console.error('Error al enviar el correo:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }

  return (
    <div className='flex flex-row bg-secondary-200 items-center'>
      <div className="md:w-[45%] w-min h-screen">
        <img
          src={ImageLogin}
          alt="Universidad Cooperativa de Colombia"
          className="object-cover w-full h-full"
        />
      </div>
      <div className='bg-secondary-200 mx-44 p-8 rounded-xl w-auto lg:w-[55%]'>
        <h1 className='text-3xl uppercase font-bold tracking-[2px] mb-8 text-center'>Recuperar contraseña</h1>
        {/* <h1 className='text-xl font-bold text-center mb-8'>Iniciar sesión en su cuenta</h1> */}
        <form className='mb-2' onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2"/>
            <input 
              type="email" 
              className='py-2 pl-8 pr-4 w-full bg-secondary-100 outline-none rounded-lg'
              placeholder='Correo electrónico'
              name='email'
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mt-4'>
            <button type='submit' className='bg-primary w-full py-2 px-4 text-white rounded-lg'>Enviar instrucciones</button>
          </div>
        </form>
        <p className="mt-4 text-center">
          ¿Tienes una cuenta?
          <Link to="/auth" className="text-primary px-2 hover:underline">
            Iniciar sesión
          </Link>
        </p>
        <p className="mt-4 text-center">
          ¿No tienes una cuenta?
          <Link to="/auth/registro" className="text-primary px-2 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgetPassword