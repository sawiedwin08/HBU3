import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../Api';

// image
import ImageLogin from '../../assets/images/imagenLogin.png'

// Icons
import { RiLockFill, RiEyeOffLine, RiEyeLine } from "react-icons/ri";

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showConfirPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await api.patch('users/password-reset-complete/', {
        password,
        token,
        uidb64
      });
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      setError('Hubo un error al restablecer la contraseña');
    }
  };

  return (

    <div className='flex flex-row bg-secondary-200 justify-center items-center'>
      <div className="md:w-[45%] w-min h-screen">
        <img
          src={ImageLogin}
          alt="Universidad Cooperativa de Colombia"
          className="object-cover w-full h-full"
        />
      </div>
      <div className='bg-secondary-200 mx-44 p-8 rounded-xl shadow-2xl w-auto lg:w-[55%]'>
        <h1 className='text-3xl uppercase font-bold tracking-[2px] mb-8 text-center'>Restablecer contraseña</h1>
        {/* <h1 className='text-xl font-bold text-center mb-8'>Iniciar sesión en su cuenta</h1> */}
        {success ? (
        <div>
        <h1 className='text-xl font-bold text-center mb-8'>Contraseña restablecida exitosamente</h1>
        <p className="mt-4 text-center">Ahora puedes 
            <Link to="/auth" className="text-primary px-2 hover:underline">
                Iniciar sesión
            </Link>
            con tu nueva contraseña.</p>
        </div>
        ) : (
        <form className='mb-2' onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <RiLockFill className="absolute top-1/2 -translate-y-1/2 left-2"/>
            <input 
              type={showPassword ? "text" : "password"} 
              className='py-2 pl-8 pr-4 w-full bg-secondary-100 outline-none rounded-lg'
              placeholder='Nueva contraseña'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showPassword ? (
                <RiEyeLine onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"/>
              ) : (
                <RiEyeOffLine onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"/>
              )}
          </div>
          <div className="relative mb-4">
            <RiLockFill className="absolute top-1/2 -translate-y-1/2 left-2"/>
            <input 
              type={showConfirPassword ? "text" : "password"}
              className='py-2 pl-8 pr-4 w-full bg-secondary-100 outline-none rounded-lg'
              placeholder='Confirmar contraseña'
              name='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {showConfirPassword ? (
              <RiEyeLine onClick={() => setShowConfirmPassword(!showConfirPassword)} className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"/>
            ) : (
              <RiEyeOffLine onClick={() => setShowConfirmPassword(!showConfirPassword)} className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"/>
            )}
          </div>
          <div className='mt-4'>
            <button type='submit' className='bg-primary w-full py-2 px-4 text-white rounded-lg'>Restablecer contraseña</button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
