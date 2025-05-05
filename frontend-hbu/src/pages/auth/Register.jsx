import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../apiConfig';

// Icons
import { RiUserLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiMailLine } from "react-icons/ri";

// Image
import ImageLogin from '../../assets/images/imagenLogin.png';
import {api, apiNoAuth}  from '../../Api';

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [academicPrograma, setAcademicProgram] = useState([]);
  const [genders, setGenders] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [documentsType, setDocumentsType] = useState([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [selectAcademicPrograma, setSelectAcademicPrograma] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    username: '',
    type_document: '',  // Valor predeterminado
    identification: '',
    gender: '',  // Valor predeterminado
    academic_program: '',  // Valor predeterminado
    semester: '',
    password: '',
    re_password: ''
  });

  const [errors, setErrors] = useState([]);

  const [showPassword, setPassword] = useState(false);
  const [showConfirPassword, setConfirmPassword] = useState(false);
  const Navigate = useNavigate();
  const {
    name,
    last_name,
    email,
    type_document,
    identification,
    gender,
    academic_program,
    semester,
    password,
    re_password
  } = formData;

  useEffect(() => {
    getAcademicPrograms();
    getGenders();
    getDocumentsType();
  }, []);

  const getAcademicPrograms = async () => {
    try {
        const { data, status} = await apiNoAuth.get(`${API_URL}users/academic-programs/`);
        if (status === 200) {
          setAcademicProgram(data)
        } else {
            console.error('Error en la respuesta. Estado:', status);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error.message);
    }
  };
  const getGenders = async () => {
    try {
        const { data, status} = await apiNoAuth.get(`${API_URL}users/genders/`);
        if (status === 200) {
          setGenders(data)
        } else {
            console.error('Error en la respuesta. Estado:', status);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error.message);
    }
  };
  const getDocumentsType = async () => {
    try {
        const { data, status} = await apiNoAuth.get(`${API_URL}users/document-types/`);
        if (status === 200) {
          setDocumentsType(data)
        } else {
            console.error('Error en la respuesta. Estado:', status);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error.message);
    }
  };

  const filteredAcademicProgram = academicPrograma.filter(academicProgram =>
    academicProgram.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejar el cambio en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
        
    if (name === 'academic_program') {
      setSelectAcademicPrograma(value);
      console.log(value)
    }
    if (name === 'gender') {
      setSelectedGender(value);
      console.log(value)
    }
    if (name === 'type_document') {
      setSelectedDocumentType(value);
      console.log(value)
    }
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de contraseñas
    if (password !== re_password) {
      // alert('Las contraseñas no coinciden');
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    // Crear el objeto de datos a enviar
    const newUser = {
      email,
      name,
      last_name,
      username: email.split('@')[0],
      type_document: selectedDocumentType,
      identification,
      gender: selectedGender,
      password,
      role: "Estudiante",
      academic_program : selectAcademicPrograma,
      semester,
  };

    // try {
    //   // Hacer la solicitud POST al backend para registrar el usuario
    //   console.log(newUser);
    //   const res = await axios.post(API_URL+'users/create-student/', newUser);
      
    //   toast.success('Registro exitoso. Verifica tu correo para activar la cuenta.');
      
    //   // Redirigir a la página de verificación o login
    //   history('/auth/registro/verificacion');
    // } catch (err) {
    //   // Manejo de errores del backend
    //   toast.error('Error en el registro: ' + (err.response?.data?.message || 'Inténtalo de nuevo más tarde'));
    // }

    try {
      console.log(newUser)
      const {data, status} = await apiNoAuth.post(`${API_URL}users/create-student/`, newUser);
      if (status === 201) {
        Navigate('/auth/registro/verificacion', { state: { email } });
      } else {
          console.error('Error en la respuesta. Estado:', status);
      }
    } catch (error) {
      // Manejo de errores del backend
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        setErrors(errorData);

        // Comprobar si hay errores específicos
        // if (errorData) {
        //   // const messages = Object.values(errorData).flat();
        //   // messages.forEach((msg) => setErrorMessage(msg));
        //   // console.log(messages);
        //   // setErrorMessage(messages.join('\n'));
        // } else {
        //   setErrorMessage('Error en el registro: ' + (error.message || 'Inténtalo de nuevo más tarde'));
        //   console.log('Error en el registro: ' + (error.message || 'Inténtalo de nuevo más tarde'));
        // }
      } else {
        setErrorMessage('Error en el registro: Inténtalo de nuevo más tarde');
        console.log('Error en el registro: Inténtalo de nuevo más tarde');
      }
      // console.error('Error:', error);
    }
  };

  return (
    <div className='flex flex-row items-center bg-secondary-200 w-screen'>
      <div className="md:w-[45%] w-min h-screen">
        <img src={ImageLogin} alt="Universidad Cooperativa de Colombia" 
        className="object-cover w-full h-full" />
      </div>
      <div className='flex-auto bg-secondary-200 lg:mx-28 p-4 rounded-xl w-auto lg:w-[55%]'>
        <h1 className='text-2xl uppercase font-bold tracking-[2px] mb-4 text-center'>Crear cuenta en HBU</h1>
        <h1 className='text-xl font-bold text-center mb-4'>Diligencie sus datos</h1>
        <form className='md:m-6 m-2' onSubmit={handleSubmit}>
        {/* {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}   */}
          {/* Nombres */}
          <div className='flex flex-col mb-4'>
          {errors.name && <p className="text-red-500 text-left">{errors.name}</p>}
          {errors.last_name && <p className="text-red-500 text-left">{errors.last_name}</p>}
          {errors.type_document && <p className="text-red-500 text-left">{errors.type_document}</p>}
          {errors.identification && <p className="text-red-500 text-left">{errors.identification}</p>}
          {errors.gender && <p className="text-red-500 text-left">{errors.gender}</p>}
          {errors.academic_program && <p className="text-red-500 text-left">{errors.academic_program}</p>}
          {errors.semester && <p className="text-red-500 text-left">{errors.semester}</p>}
          {errors.email && <p className="text-red-500 text-left">{errors.email}</p>}
          {errors.username && <p className="text-red-500 text-left">{errors.username}</p>}
          {errors.password && <p className="text-red-500 text-left">{errors.password}</p>}
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}  
          </div>
          <div className='flex flex-row space-x-4'>
            <div className="relative mb-4 w-1/2">
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2"/>
              <input 
                type="text"
                className='py-2 pl-8 pr-4 w-full bg-secondary-100 outline-none rounded-lg'
                placeholder='Nombres'
                name='name'
                onChange={handleChange}
                value={name}
                required
              />
            </div>

            {/* Apellidos */}
            <div className="relative mb-4 w-1/2">
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2"/>

              <input 
                type="text"
                className='py-2 pl-8 pr-4 w-full bg-secondary-100 outline-none rounded-lg'
                placeholder='Apellidos'
                name='last_name'
                onChange={handleChange}
                value={last_name}
                required
              />
            </div>
          </div>

          {/* Tipo de Cédula */}
          <div className='flex flex-row space-x-4'>
            <div className="relative mb-4 w-1/2">
              <select 
                name='type_document'
                // className='py-2 pl-2 pr-4 w-full bg-secondary-100 outline-none rounded-lg'
                className={`py-2 pl-2 pr-4 w-full ${type_document != '' ? 'text-black' : 'text-slate-400'} bg-secondary-100 outline-none rounded-lg`}
                onChange={handleChange}
                value={type_document}
                required
              >
                <option value="">Seleccione tipo de documento</option>
                {documentsType.map((documentType ) => (
                    <option key={documentType.id} value={documentType.id}>
                        {documentType.name}
                    </option>
                ))}
              </select>
            </div>

            {/* Número de Documento */}
            <div className="relative mb-4 w-1/2">
              <input 
                type="number"
                className='py-2 pl-8 pr-2 w-full bg-secondary-100 outline-none rounded-lg'
                placeholder='Número de Documento'
                name='identification'
                onChange={handleChange}
                value={identification}
                required
              />
            </div>
          </div>
          

          {/* Género */}
          <div className="relative mb-4">
            <select 
              name='gender'
                className={`py-2 pl-2 pr-4 w-full ${gender != '' ? 'text-black' : 'text-slate-400'} bg-secondary-100 outline-none rounded-lg`}
              // className='py-2 pl-2 pr-4 w-full bg-secondary-100 outline-none rounded-lg'
              onChange={handleChange}
              value={gender}
              required
            >
              <option value="">Seleccione un genero</option>
                {genders.map((gender ) => (
                    <option key={gender.id} value={gender.id}>
                        {gender.name}
                    </option>
                ))}
            </select>
          </div>

          <div className='flex flex-row space-x-4'>
            {/* Programa Académico */}
            <div className="relative mb-4 w-1/2">
              <select 
                name='academic_program'
                className={`py-2 pl-2 pr-4 w-full ${academic_program ? 'text-black' : 'text-slate-400'} bg-secondary-100 outline-none rounded-lg`}
                onChange={handleChange}
                value={academic_program}
                required
              >
                <option value="">Seleccione programa academico</option>
                {filteredAcademicProgram.map((AcademicProgram) => (
                    <option key={AcademicProgram.id} value={AcademicProgram.id}>
                        {AcademicProgram.name}
                    </option>
                ))}
              </select>
            </div>

            {/* Semestre */}
            <div className="relative mb-4 w-1/2">
              <input 
                type="number"
                className='py-2 pl-8 pr-2 w-full bg-secondary-100 outline-none rounded-lg'
                placeholder='Semestre'
                name='semester'
                onChange={handleChange}
                value={semester}
                required
              />
            </div>
          </div>

          <div className='flex flex-row space-x-4'>
            {/* Email */}
            <div className="relative mb-4 w-3/4">
              <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2"/>
              <input 
                type="email"
                className='py-2 pl-8 pr-4 w-full bg-secondary-100 outline-none rounded-lg'
                placeholder='Correo Electrónico Institucional'
                name='email'
                onChange={handleChange}
                value={email}
                required
              />
            </div>

            {/* Usuario */}

            <div className="relative mb-4">
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2"/>
                <input
                  type="text"
                  className="py-2 pl-8 pr-4 w-full text-gray-400 rounded-lg bg-secondary-100 outline-none cursor-not-allowed"
                  placeholder='Usuario'
                  disabled
                  name='username'
                  onChange={handleChange}
                  value={email.split('@')[0]}
                  required
                />
            </div>
          </div>

          {/* Contraseña */}
          <div className='flex flex-row space-x-4'>
            <div className="relative mb-4 w-1/2">
              <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2"/>
              <input 
                type={showPassword ? "text" : "password"} 
                className='py-2 pl-8 pr-8 w-full bg-secondary-100 outline-none rounded-lg'
                placeholder='Contraseña'
                name='password'
                onChange={handleChange}
                value={password}
                required
              />
              {showPassword ? (
                <RiEyeLine onClick={() => setPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"/>
              ) : (
                <RiEyeOffLine onClick={() => setPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"/>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div className="relative mb-4 w-1/2">
              <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2"/>
              <input 
                type={showConfirPassword ? "text" : "password"} 
                className='py-2 pl-8 pr-8 w-full bg-secondary-100 outline-none rounded-lg'
                placeholder='Confirmar Contraseña'
                name='re_password'
                onChange={handleChange}
                value={re_password}
                required
              />
              {showConfirPassword ? (
                <RiEyeLine onClick={() => setConfirmPassword(!showConfirPassword)} className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"/>
              ) : (
                <RiEyeOffLine onClick={() => setConfirmPassword(!showConfirPassword)} className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"/>
              )}
            </div>
          </div>

          {/* Botón para enviar */}
          <div className='mt-2'>
            <button type='submit' className='bg-primary w-full py-2 px-4 text-white rounded-lg'>
              Validar cuenta
            </button>
          </div>
        </form>

        {/* Link a iniciar sesión */}
        <p className="mt-8 text-center">
          ¿Tienes una cuenta?
          <Link to="/auth" className="text-primary px-2 hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
