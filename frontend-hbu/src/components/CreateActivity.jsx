import React, { useState, useContext, useEffect } from 'react';
import { API_URL } from '../apiConfig';
import {api} from '../Api';
// import { AuthContext } from '../../features/auth/AuthContext';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

// Icons
import { RiCloseFill } from "react-icons/ri";
import { Plus } from 'lucide-react'
import { Navigate } from 'react-router-dom';

const CreateActivity = ({updateData}) => {
    const [isopen, setIsopen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [activities, setActivities] = useState([])
    const [dimensions, setDimensions] = useState([])
    const [selectDimension, setSelectDimension] = useState('')
    const [programs, setPrograms] = useState([])
    const [selectProgram, setSelectProgram] = useState('')
    const [subPrograms, setSubPrograms] = useState([])
    const [selectSubProgram, setSelectSubProgram] = useState('')
    const [usersCollaborators, setusersCollaborators] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const [formData, setFormData] = useState({});

    const [errors, setErrors] = useState([]);

    // obtener datos de un endpoint
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

    const getPrograms = async () => {
        try {
            const { data, status} = await api.get(`${API_URL}dimension/program_dimension/`);
            if (status === 200) {
                setPrograms(data)
            } else {
                console.error('Error en la respuesta. Estado:', status);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error.message);
        }
    };

    const getSubPrograms = async () => {
        try {
            const { data, status} = await api.get(`${API_URL}dimension/subprogram_dimension/`);
            if (status === 200) {
                setSubPrograms(data)
            } else {
                console.error('Error en la respuesta. Estado:', status);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error.message);
        }
    };

    const getUsersCollaborators = async () => {
        try {
            const { data, status} = await api.get(`${API_URL}users/create-collaborator/`);
            if (status === 200) {
                setusersCollaborators(data)
            } else {
                console.error('Error en la respuesta. Estado:', status);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error.message);
        }  
    };

    useEffect(() => {
        getDimensions();
        getPrograms();
        getSubPrograms();
        getUsersCollaborators();
    }, []);

    const handleChange = (e) => {
        
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await api.post(`${API_URL}activities/activities/`, formData);
            if (response.status === 201) {
                setActivities([...activities, response.data]);
                setIsopen(false);
                updateData(response.data);
                toast.success("Registro exitoso!");
                setFormData({});
            } else {
                setErrorMessage('Error al crear la actividad');
            }
        } catch (error) {
             // Si la solicitud falla, captura y maneja los errores
            console.error('Error en la solicitud:', error.message);
            console.error('Error en la solicitud:', error.response.data);
            const er = error.response.data;

            // Verifica si el error tiene un objeto 'response' y contiene datos de error
            if (er) {
                console.error('Errores de validación:', er);
                setErrors(er); // Actualiza el estado con los errores específicos
            } else {
                setErrorMessage('Error en la solicitud');
            }
        }
    };

    const { name, description, dimension, program_dimension, subprogram_dimension, responsible, date, start_hour, end_hour } = formData;
    
    const handleSelectProgram = (e) => {
        const programId = e.target.value;
        setSelectProgram(programId); // Actualiza selectProgram
        setFormData(prevFormData => ({
          ...prevFormData,
          program_dimension: programId,
          subprogram_dimension: '', // Resetear subprograma cuando cambia el programa
        }));
      };
      const handleSelectSubProgram = (e) => {
        const subprogramId = e.target.value;
        setSelectSubProgram(subprogramId); // Actualiza selectSubProgram
        setFormData(prevFormData => ({
          ...prevFormData,
          subprogram_dimension: subprogramId, // Actualizar el subprograma seleccionado
        }));
      };
    const handleSelectResponsible = (e) => {
        setFormData({
            ...formData,
            responsible: e.target.value
        });
    }
    const handleSelectDimension = (e) => {
        setSelectDimension(e.target.value);
        setFormData(prevFormData => ({
          ...prevFormData,
          dimension: e.target.value,
          program_dimension: '', // Resetea programa cuando cambia dimensión
          subprogram_dimension: '', // Resetea subprograma
        }));
      };
    const filtereDimensions = dimensions.filter(dimension => {
        return dimension.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    const filterePrograms = programs.filter(program => {
        return program.dimension === parseInt(selectDimension);
    });
    const filtereSubPrograms = subPrograms.filter(subProgram => {
        return subProgram.program_dimension === parseInt(selectProgram);
    });
    const filtereUserCollaborators = usersCollaborators.filter(userCollaborator => {
        return userCollaborator.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    );

  return (
    <>
        <button
            className="flex gap-2 items-center rounded-lg bg-primary py-2 pl-2 pr-3 font-semibold text-white focus:opacity-[0.85]"
            onClick={() => setIsopen(true)}
            type="button">
            <Plus size={18} />
            Agregar Actividad
        </button>
        {isopen &&(
            <div className='fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300 flex justify-center items-center'>
                <div className='bg-white w-[35%] rounded-lg flex flex-col gap-5'>
                    <div>
                    <div className="flex items-start justify-between">
                        <h4 className="text-xl px-4 mb-2 font-semibold text-slate-700 p-3">
                        Agregar nueva actividad
                        </h4>
                        <button
                            // data-ripple-dark="true"
                            // data-dialog-close="true"
                            onClick={() => setIsopen(false)}
                            className="relative h-8 max-h-[40px] w-8 max-w-[480px] m-1 select-none rounded-lg text-center text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                <RiCloseFill/>
                            </span>
                        </button>                
                    </div>
                
                    <form className='mb-2 py-2 px-4 space-y-2' onSubmit={handleSubmit}>
                        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}                        
                            <div className="w-full min-w-[200px]">
                                <label className="block mb-1 text-sm text-slate-700">
                                Titulo
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="Ingrese titulo"
                                    name='name'
                                    onChange={handleChange}
                                    value={name}
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-left">{errors.name[0]}</p>}
                            </div>
                            <div className="w-full min-w-[200px] mt-2">
                                <label className="block mb-1 text-sm text-slate-700">
                                    Descripción de la actividad
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="Ingrese descripción" 
                                    name='description'
                                    onChange={handleChange}
                                    value={description}
                                    required
                                />
                                {errors.description && <p className="text-red-500 text-left">{errors.description}</p>}
                            </div>

                            <div className="w-full min-w-[200px] mt-2">
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
                            </div>
                            <div className='flex gap-2 min-w-[200px]'>
                                <div className="w-full mt-2">
                                    <label className="block mb-1 text-sm text-slate-700">
                                        Programa
                                    </label>
                                    <select
                                        name='program-dimension'
                                        className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md'
                                        onChange={handleSelectProgram}
                                        value={program_dimension}
                                        required
                                        disabled={!selectDimension}
                                        >
                                            <option value="">Seleccione una opcion</option>
                                            {filterePrograms.map((program) => (
                                            <option key={program.id} value={program.id}>
                                                {program.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="w-full mt-2">
                                    <label className="block mb-1 text-sm text-slate-700">
                                        Sub-Programa
                                    </label>
                                    <select
                                        name='Sub-Programa'
                                        className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md'
                                        onChange={handleSelectSubProgram}
                                        value={subprogram_dimension}
                                        required
                                        disabled={!selectProgram}
                                        >
                                            <option value="" className='text-slate-400'>Seleccione una opcion</option>
                                            {filtereSubPrograms.map((subProgram) => (
                                            <option key={subProgram.id} value={subProgram.id}>
                                                {subProgram.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="w-full min-w-[200px] mt-2">
                                <label className="block mb-1 text-sm text-slate-700">
                                    Docente encargado
                                </label>
                                <select
                                    name='Docente'
                                    className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md'
                                    onChange={handleSelectResponsible}
                                    value={responsible}
                                    required
                                    >
                                        <option value="">Seleccione una opcion</option>
                                        {filtereUserCollaborators.map((userCollaborator) => (
                                        <option key={userCollaborator.id} value={userCollaborator.id}
                                        >{userCollaborator.name} {userCollaborator.last_name} </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full min-w-[200px] mt-2">
                                <label className="block mb-1 text-sm text-slate-700">
                                    Fecha
                                </label>
                                <input
                                    type="date"
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="Offline/Online"
                                    name='date'
                                    onChange={handleChange}
                                    value={date}
                                    required
                                />
                                {errors.date && <p className="text-red-500 text-left">{errors.date}</p>}
                            </div>
                            <div className='flex gap-2 min-w-[200px]'>
                                <div className="w-full mt-2">
                                    <label className="block mb-1 text-sm text-slate-700">
                                        Hora inicio
                                    </label>
                                    <input
                                        type="time"
                                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                        placeholder="Offline/Online"
                                        name='start_hour'
                                        onChange={handleChange}
                                        value={start_hour}
                                        required
                                    />
                                    {errors.start_hour && <p className="text-red-500 text-left">{errors.start_hour}</p>}
                                </div>

                                <div className="w-full mt-2">
                                    <label className="block mb-1 text-sm text-slate-700">
                                        Hora fin
                                    </label>
                                    <input
                                        type="time"
                                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                        placeholder="Offline/Online"
                                        name='end_hour'
                                        onChange={handleChange}
                                        value={end_hour}
                                        required
                                    />
                                    {errors.end_hour && <p className="text-red-500 text-left">{errors.end_hour}</p>}
                                </div>
                            </div>
                            
                        <div className="p-2 pt-0">
                            <div className="flex space-x-2">
                                <button
                                    className="w-full mx-auto select-none rounded border border-red-600 py-2 px-4 text-center text-sm font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-600/20 active:bg-red-700 active:text-white active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    data-dialog-close="true"
                                    onClick={() => setIsopen(false)}>
                                    Cancelar
                                </button>
                    
                                <button
                                    className="w-full mx-auto select-none rounded bg-primary py-2 px-4 text-center text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:shadow-slate-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="submit"
                                    data-dialog-close="true">
                                    Guardar
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
  )
}

CreateActivity.propTypes = {
    updateData: PropTypes.func.isRequired,
};

export default CreateActivity