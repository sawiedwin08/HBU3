import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../apiConfig';
import { toast } from 'react-toastify';
import { AuthContext } from '../features/auth/AuthContext';
import {api} from '../Api';
import PropTypes from 'prop-types';

// Icons
import { RiCloseFill, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Plus } from 'lucide-react'

const CreateCollaborator = ({ updateData}) => {
    const [isopen, setIsopen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setPassword] = useState(false);
    const [showConfirPassword, setConfirmPassword] = useState(false);
    const { token, role } = useContext(AuthContext);
    const [genders, setGenders] = useState([]);
    const [selectedGender, setSelectedGender] = useState('');
    const [dimensions, setDimensions] = useState([])
    const [selectedDimension, setSelectedDimension] = useState('');
    const [documentsType, setDocumentsType] = useState([]);
    const [selectedDocumentType, setSelectedDocumentType] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        email: '',
        type_document:'',
        username: '',
        identification: '',
        gender: '',
        // phone_number: '',
        password: '',
        dimension: '',
        re_password: ''
    });

    const {
        name,
        last_name,
        email,
        // username,
        type_document,
        identification,
        gender,
        // phone_number,
        password,
        dimension,
        re_password
    } = formData;

    useEffect(() => {
        getGenders();
        getDocumentsType();
        getDimensions();
      }, []);

    const getGenders = async () => {
        try {
            const { data, status} = await api.get(`${API_URL}users/genders/`);
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
            const { data, status} = await api.get(`${API_URL}users/document-types/`);
            if (status === 200) {
              setDocumentsType(data)
            } else {
                console.error('Error en la respuesta. Estado:', status);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error.message);
        }
    };

    const getDimensions = async () => {
        try {
            const { data, status} = await api.get(`${API_URL}dimension/dimension/`);
            if (status === 200) {
                setDimensions(data)
            } else {
                console.error('Error en la respuesta. Estado:', status);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'gender') {
            setSelectedGender(value);
            console.log(value)
        }
        if (name === 'type_document') {
        setSelectedDocumentType(value);
        console.log(value)
        }
        if (name === 'dimension') {
            setSelectedDimension(value);
            console.log(value)
        }
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validación de contraseñas
        if (password !== re_password) {
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
        //   phone_number,
          password,
          role: "Usuario_Bienestar",
          dimension: selectedDimension
      };
    
        try {
            const response = await api.post(`${API_URL}users/create-collaborator/`, newUser);
            if (response.status === 201) {
                toast.success('Usuario creado correctamente');
                setIsopen(false);
                updateData(response.data);
                setFormData({
                    name: '',
                    last_name: '',
                    email: '',
                    type_document:'',
                    username: '',
                    numero_documento: '',
                    gender: '',
                    // phone_number: '',
                    password: '',
                    re_password: '',
                    dimension: ''
                });
                errorMessage('');
            } else {
                toast.error('Error al crear el usuario');
            }

    
        } catch (error) {
            // console.log(newUser);

          // Manejo de errores del backend
          if (error.response) {
            const errorData = error.response.data;
    
            // Comprobar si hay errores específicos
            if (errorData) {
              const messages = Object.values(errorData).flat();
              messages.forEach((msg) => setErrorMessage(msg));
            //   console.log(messages);
              // setErrorMessage(messages.join('\n'));
            } else {
              toast.error('Error en el registro: Inténtalo de nuevo más tarde');
            }
          } else {
            toast.error('Error en el registro: Inténtalo de nuevo más tarde');
          }
          // console.error('Error:', error);
        }
      };

    return (
        <>
        <button
            className="flex items-center gap-2 rounded-lg bg-primary py-2 pl-3 pr-3 font-semibold text-white focus:opacity-[0.85]"
            onClick={() => setIsopen(true)}
            type="button">
            <Plus size={18}/>
            Agregar Usuario
        </button>
        {isopen &&(
            // <EditActivity setIsopen={setIsopen} />
            <div className='fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300 flex justify-center items-center'>
                {/* className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" */}
                <div className='bg-white w-[50%] rounded-lg flex flex-col gap-5'>
                    <div>
                    <div className="flex items-start justify-between">
                        <div className='px-4 py-3'>
                            <h4 className="text-xl font-bold text-slate-700">
                                Añadir nuevo usuario
                            </h4>
                            <p className="text-slate-400">
                            Completa el formulario para crear un nuevo docente.
                            </p>
                        </div>
                        <button
                            // data-ripple-dark="true"
                            // data-dialog-close="true"
                            onClick={() => setIsopen(false, setFormData({
                                names: '',
                                last_names: '',
                                type_document: '',
                                identification: '',
                                email: '',
                                gender: '',
                                password: '',
                                confirmPassword: '',
                                phone_number: '',
                            }))}
                            className="relative h-8 max-h-[40px] w-8 max-w-[480px] m-1 select-none rounded-lg text-center text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                <RiCloseFill/>
                            </span>
                        </button>                
                    </div>
                
                    <form className='mb-2 py-2 px-4 space-y-2' onSubmit={handleSubmit}>
                        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
                        <div className='flex gap-2'>
                            <div className="w-[50%]">
                                <label className="font-semibold block mb-1 text-sm text-slate-700">
                                    Tipo de documento de identificacion
                                </label>
                                <select
                                    name='type_document'
                                    className={`w-full bg-transparent ${type_document != '' ? 'text-slate-700' : 'text-slate-400'}   text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md`}
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

                            <div className="w-[50%]">
                                <label className="font-semibold block mb-1 text-sm text-slate-700">
                                    Numero de identificación
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="Ingrese numero de identificación"
                                    name='identification'
                                    onChange={handleChange}
                                    value={identification}
                                    required
                                />
                            </div>
                        </div>

                        <div className='flex gap-2'>
                            <div className="w-[50%]">
                                <label className="font-semibold block mb-1 text-sm text-slate-700">
                                    Nombres
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="Ingrese nombre"
                                    name='name'
                                    onChange={handleChange}
                                    value={name}
                                    required
                                />
                            </div>

                            <div className="w-[50%]">
                                <label className="font-semibold block mb-1 text-sm text-slate-700">
                                    Apellidos
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="Ingrese apellidos"
                                    name='last_name'
                                    onChange={handleChange}
                                    value={last_name}
                                    required
                                />
                            </div>
                        </div>

                        <div className='flex gap-2'>
                            <div className="w-[50%]">
                                <label className="font-semibold block mb-1 text-sm text-slate-700">
                                    Correo Institucional
                                </label>
                                <input
                                    type="email"
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="Ingrese correo institucional"
                                    name='email'
                                    onChange={handleChange}
                                    value={email}
                                    required
                                />
                            </div>

                            <div className="w-[50%]">
                                <label className="font-semibold block mb-1 text-sm text-slate-700">
                                    Usuario
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md outline-none cursor-not-allowed"
                                    placeholder="Ingrese usuario"
                                    disabled
                                    name='username'
                                    onChange={handleChange}
                                    value={email.split('@')[0]}
                                    required
                                />
                            </div>
                        </div>

                        <div className='flex gap-2'>
                            <div className="w-[50%]">
                                <label className="font-semibold block mb-1 text-sm text-slate-700">
                                    Genero
                                </label>
                                <select
                                    name='gender'
                                    className={`w-full bg-transparent ${gender != '' ? 'text-slate-700' : 'text-slate-400'}   text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md`}
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

                            <div className="w-[50%]">
                                <label className="font-semibold block mb-1 text-sm text-slate-700">
                                    Dimensión
                                </label>
                                <select
                                    name='dimension'
                                    className={`w-full bg-transparent ${dimension != '' ? 'text-slate-700' : 'text-slate-400'}   text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md`}
                                    onChange={handleChange}
                                    value={dimension}
                                    required
                                    >
                                    <option value="">Seleccione una dimensión</option>
                                    {dimensions.map((dimension ) => (
                                        <option key={dimension.id} value={dimension.id}>
                                            {dimension.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* <div className="w-full min-w-[200px] mt-2">
                                <label className="block mb-1 text-sm text-slate-700">
                                    Seleccione dimension
                                </label>
                                <select
                                    name='dimension'
                                    className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md'
                                    onChange={handleSelectDimension}
                                    value={dimension}
                                    required
                                    >
                                        <option value="">Seleccione una opcion</option>
                                        {filtereDimensions.map((dimen) => (
                                        <option key={dimen.id} value={dimen.id}>
                                            {dimen.name}
                                        </option>
                                    ))}
                                </select>
                            </div> */}
                        </div>

                        <div className='flex gap-2'>
                            <div className="w-[50%]">
                                <label className="font-semibold block mb-1 text-sm text-slate-700">
                                    Contraseña
                                </label>
                                <div className="relative mb-4 ">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                        placeholder="Ingrese contraseña"
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
                            </div>

                            <div className="w-[50%]">
                                <label className="font-semibold block mb-1 text-sm text-slate-700">
                                    Confirmar contraseña
                                </label>
                                <div className="relative mb-4 ">
                                    <input
                                        type={showConfirPassword ? "text" : "password"}
                                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                        placeholder="Ingrese nuevamente la contraseña"
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
                        </div>

                            
                        <div className="p-2">
                            <div className="flex space-x-2 gap-2">
                                <button
                                    className="w-full mx-auto select-none rounded border border-red-600 py-2 px-4 text-center text-sm font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-600/20 active:bg-red-700 active:text-white active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    data-dialog-close="true"
                                    onClick={() => setIsopen(false, setFormData({
                                        name: '',
                                        last_name: '',
                                        email: '',
                                        type_document:'',
                                        username: '',
                                        gender: '',
                                        phone_number: '',
                                        identification: '',
                                    }))}>
                                    Cancelar
                                </button>
                    
                                <button
                                    className="w-full mx-auto select-none rounded bg-primary py-2 px-4 text-center text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:shadow-slate-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="submit"
                                    data-dialog-close="true">
                                    Guardar usuario
                                </button>
                            </div>
                            {/* <p className="flex justify-center mt-4 font-sans text-sm text-slate-500">
                            Looking for more details? Contact
                            <a href="#admin"
                                className="ml-1 text-sm font-bold leading-normal text-slate-500">
                                Admin.
                            </a>
                            </p> */}
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

CreateCollaborator.propTypes = {
    updateData: PropTypes.func.isRequired,
};

export default CreateCollaborator;