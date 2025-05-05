import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {api} from '../Api';
import { API_URL } from '../apiConfig';
import { toast } from 'react-toastify'; 

// Icons
import { RiCloseFill } from "react-icons/ri";

const EditActivity = ({ activity, onClose, onSave }) => {

    const [editedActivity, setEditedActivity] = React.useState(activity || {});
    const [errorMessage, setErrorMessage] = useState('');

    const [dimensions, setDimensions] = useState([])
    const [selectDimension, setSelectDimension] = useState('')
    const [programs, setPrograms] = useState([])
    const [selectProgram, setSelectProgram] = useState('')
    const [subPrograms, setSubPrograms] = useState([])
    const [selectSubProgram, setSelectSubProgram] = useState('')
    const [usersCollaborators, setusersCollaborators] = useState([])
    const [searchTerm, setSearchTerm] = useState('')



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

    const handleSelectProgram = (e) => {
        const programId = e.target.value;
        setSelectProgram(programId); // Actualiza selectProgram
        setEditedActivity(prevFormData => ({
          ...prevFormData,
          program_dimension: programId,
          subprogram_dimension: '', // Resetear subprograma cuando cambia el programa
        }));
      };
      const handleSelectSubProgram = (e) => {
        const subprogramId = e.target.value;
        setSelectSubProgram(subprogramId); // Actualiza selectSubProgram
        setEditedActivity(prevFormData => ({
          ...prevFormData,
          subprogram_dimension: subprogramId, // Actualizar el subprograma seleccionado
        }));
      };
    const handleSelectDimension = (e) => {
        setSelectDimension(e.target.value);
        setEditedActivity(prevFormData => ({
          ...prevFormData,
          dimension: e.target.value,
          program_dimension: '', // Resetea programa cuando cambia dimensión
          subprogram_dimension: '', // Resetea subprograma
        }));
    };
    const handleSelectResponsible = (e) => {
        console.log(e.target.value);
        setEditedActivity({
        ...editedActivity,
        responsible: e.target.value
    });
    }

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
        return userCollaborator.role === 'Usuario_Bienestar';
    }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedActivity((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSave(editedActivity);
        // onClose();

        try {  
            const {data, status} = await api.put(`${API_URL}activities/activities/${editedActivity.id}/`, editedActivity);
            if (status === 200) {
                setEditedActivity(data);
                toast.success('Actividad actualizada correctamente');
                onClose();
            } else {
                console.error('Failed to update activity. Status:', status);
                setErrorMessage('Error al actualizar la actividad');
            }
        } catch (error) {
            console.error('Error updating activity:', error);
            }
    };

    if (!activity) return null;


  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300 flex justify-center items-center">
      <div className="bg-white w-[35%] rounded-lg flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <h4
          className="text-xl px-4 font-medium text-slate-700 pt-3">
          Editar actividad
          </h4>
          {/* <p className="mb-2 mt-1 text-slate-400">
          Ingrese los datos de la actividad.
          </p> */}
          <button
              // data-ripple-dark="true"
              // data-dialog-close="true"
              onClick={onClose}
              className="relative h-8 max-h-[40px] w-8 max-w-[480px] m-1 select-none rounded-lg text-center text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button">
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <RiCloseFill/>
              </span>
          </button>                
        </div>
        {/* <h2 className="text-lg font-semibold">Editar Usuario</h2> */}
        <form className='mb-3 px-4 space-y-2' onSubmit={handleSubmit}>
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
                    value={editedActivity.name}
                    required
                />
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
                    value={editedActivity.description}
                    required
                />
            </div>

            <div className="w-full min-w-[200px] mt-2">
                <label className="block mb-1 text-sm text-slate-700">
                    Seleccione dimension
                </label>
                <select
                    name='dimension'
                    className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md'
                    onChange={handleSelectDimension}
                    value={editedActivity.dimension}
                    required
                    >
                    <option value="">Seleccione una dimensión</option>
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
                        value={editedActivity.program_dimension}
                        required
                        disabled={!selectDimension}
                        >
                            <option value="">Seleccione un programa</option>
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
                        value={editedActivity.subprogram_dimension}
                        required
                        disabled={!selectProgram}
                        >
                            <option value="">Seleccione un subprograma</option>
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
                    value={editedActivity.responsible}
                    required
                    >
                    <option value="">{editedActivity.responsible.name} {editedActivity.responsible.last_name}</option>
                    {usersCollaborators.map((userCollaborator) => (
                        <option key={userCollaborator.id} value={userCollaborator.id}
                        >{userCollaborator.name} {userCollaborator.last_name} </option>
                    ))}
                    {/* <option value="" disabled>Seleccione una dimensión</option>
                    {usersCollaborators.map((dimension) => (
                        <option key={dimension.id} value={dimension.id}>{dimension.name}</option>
                    ))} */}
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
                    value={editedActivity.date}
                    required
                />
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
                        value={editedActivity.start_hour}
                        required
                    />
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
                        value={editedActivity.end_hour}
                        required
                    />
                </div>
            </div>
            
        <div className="p-2 pt-0">
            <div className="flex space-x-2">
                <button
                    className="w-full mx-auto select-none rounded border border-red-600 py-2 px-4 text-center text-sm font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-600/20 active:bg-red-700 active:text-white active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-dialog-close="true"
                    onClick={onClose}>
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
  )
}

EditActivity.propTypes = {
    activity: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

export default EditActivity