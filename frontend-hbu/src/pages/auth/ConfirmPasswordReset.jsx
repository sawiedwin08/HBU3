import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../Api';  // Asegúrate de tener tu api configurada correctamente.

// Image
import ImageLogin from '../../assets/images/imagenLogin.png'


const ConfirmPasswordReset = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(null); // Estado para determinar si el token es válido
  const [error, setError] = useState('');

  useEffect(() => {
    // Hacer la solicitud al backend para validar el token
    const validateToken = async () => {
      try {
        const response = await api.get(`users/password-reset/${uidb64}/${token}/`);
        if (response.status === 200) {
          setIsValid(true);  // El token es válido
          navigate(`/auth/reset-password/${uidb64}/${token}`);
        } else {
          setIsValid(false); // El token no es válido
        }
      } catch (err) {
        setIsValid(false); // Si ocurre algún error, el token es inválido
        setError('Token inválido o expirado');
      }
    };

    validateToken();
  }, [uidb64, token, navigate]);

  if (isValid === null) {
    return <div>Verificando el enlace...</div>;
  }

  if (!isValid) {
    return (
      <div>
        <h2>El enlace es inválido o ha expirado</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Si el token es válido, redirigir a la página para establecer la nueva contraseña.
  return (

    <div className='flex flex-row bg-secondary-200 justify-center items-center'>
      <div className="lg:w-[45%]">
        <img
          src={ImageLogin}
          alt="Universidad Cooperativa de Colombia"
          className="object-cover w-full h-full"
        />
      </div>
      <div className='bg-secondary-200 mx-44 p-8 rounded-xl shadow-2xl w-auto lg:w-[55%]'>
        <h1 className='text-3xl uppercase font-bold tracking-[2px] mb-8 text-center'>Recuperar contraseña</h1>
        <h1 className='text-xl font-bold text-center mb-8'>Enlace verificado con éxito</h1>
        <h1 className='text-xl font-bold text-center mb-8'>Haz clic en el botón para restablecer tu contraseña.</h1>
        <div className='mt-4'>
            <button type='submit' onClick={() => navigate(`/auth/reset-password/${uidb64}/${token}`)}  className='bg-primary w-full py-2 px-4 text-white rounded-lg'>Restablecer contraseña</button>
        </div>
      </div>
    </div>




    // <div>
    //   <h2>Enlace verificado con éxito</h2>
    //   <p>Haz clic en el botón para restablecer tu contraseña.</p>
    //   <button onClick={() => navigate(`/auth/reset-password/${uidb64}/${token}`)}>
    //     Restablecer contraseña
    //   </button>
    // </div>
  );
};

export default ConfirmPasswordReset;
