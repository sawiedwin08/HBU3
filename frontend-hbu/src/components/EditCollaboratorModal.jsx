import React from 'react';
import PropTypes from 'prop-types';
import { api } from '../Api';
import { API_URL } from '../apiConfig';
import { toast } from 'react-toastify';

// Icons
import { RiCloseFill } from "react-icons/ri";

const EditCollaboratorModal = ({ user, onClose, onSave }) => {
    const [editedUser, setEditedUser] = React.useState(user || {});
    const [genders, setGenders] = React.useState([]);
    const [documentTypes, setDocumentTypes] = React.useState([]);
    const [dimensions, setDimensions] = React.useState([]);

    React.useEffect(() => {
        // Fetch genders from API or define them statically
        const fetchGenders = async () => {
            try {
                const { data } = await api.get(`${API_URL}users/genders/`);
                setGenders(data);
            } catch (error) {
                console.error('Error fetching genders:', error);
            }
        };

        const fetchDocumnetType = async () => {
            try {
                const { data } = await api.get(`${API_URL}users/document-types/`);
                setDocumentTypes(data);
            } catch (error) {
                console.error('Error fetching genders:', error);
            }
        };

        const fetchDimensions = async () => {
            try {
                const { data } = await api.get(`${API_URL}dimension/dimension/`);
                setDimensions(data);
            } catch (error) {
                console.error('Error fetching dimensions:', error);
            }
        };

        fetchGenders();
        fetchDocumnetType();
        fetchDimensions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSave(editedUser);
        onClose();

        try {
            console.log('editedUser', editedUser);
            const { data, status } = await api.put(`${API_URL}users/user/${editedUser.id}/`, editedUser);
            if (status === 200) {
                toast.success('Usuario actualizado correctamente');
                setEditedUser(data);
            } else {
                console.error('Failed to update user. Status:', status);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (!user) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300 flex justify-center items-center">
            <div className="bg-white w-[50%] rounded-lg flex flex-col gap-5">
                <div className="flex items-start justify-between">
                    <div className='px-4 pt-3'>
                        <h4 className="text-xl font-bold text-slate-700">
                            Editar usuario
                        </h4>
                        <p className="text-slate-400">
                            Modifica la información del usuario.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="relative h-8 max-h-[40px] w-8 max-w-[480px] m-1 select-none rounded-lg text-center text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <RiCloseFill />
                        </span>
                    </button>
                </div>
                <form className='mb-2 px-4 space-y-2' onSubmit={handleSubmit}>
                    <div className='flex gap-2'>
                        <div className="w-[50%]">
                            <label className="font-semibold block mb-1 text-sm text-slate-700">
                                Tipo de identificación
                            </label>
                            <select
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                name='gender'
                                onChange={handleChange}
                                value={editedUser.document_type}
                                required
                            >
                                <option value="" disabled>Seleccione un género</option>
                                {documentTypes.map((documnet) => (
                                    <option key={documnet.id} value={documnet.id}>{documnet.name}</option>
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
                                placeholder="Ingrese titulo"
                                name='identification'
                                onChange={handleChange}
                                value={editedUser.identification}
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
                                placeholder="Ingrese titulo"
                                name='name'
                                onChange={handleChange}
                                value={editedUser.name}
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
                                placeholder="Ingrese titulo"
                                name='last_name'
                                onChange={handleChange}
                                value={editedUser.last_name}
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
                                placeholder="Ingrese titulo"
                                name='email'
                                onChange={handleChange}
                                value={editedUser.email}
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
                                placeholder="Ingrese titulo"
                                disabled
                                name='username'
                                onChange={handleChange}
                                value={editedUser.username}
                                required
                            />
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <div className="w-[25%]">
                            <label className="font-semibold block mb-1 text-sm text-slate-700">
                                Genero
                            </label>
                            <select
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                name='gender'
                                onChange={handleChange}
                                value={editedUser.gender}
                                required
                            >
                                <option value="" disabled>Seleccione un género</option>
                                {genders.map((gender) => (
                                    <option key={gender.id} value={gender.id}>{gender.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="w-[50%]">
                            <label className="font-semibold block mb-1 text-sm text-slate-700">
                                Dimensión
                            </label>
                            <select
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                name='dimension'
                                onChange={handleChange}
                                value={editedUser.dimension}
                                required
                            >
                                <option value="" disabled>Seleccione una dimensión</option>
                                {dimensions.map((dimension) => (
                                    <option key={dimension.id} value={dimension.id}>{dimension.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="w-[25%]">
                            <label className="font-semibold block mb-1 text-sm text-center text-slate-700">
                                Estado
                            </label>
                            <input
                                type="checkbox"
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md outline-none"
                                name='is_active'
                                onChange={(e) => setEditedUser((prev) => ({ ...prev, is_active: e.target.checked }))}
                                checked={editedUser.is_active}
                            />
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="flex space-x-2 gap-2">
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
                    </div>
                </form>
            </div>
        </div>
    );
};

EditCollaboratorModal.propTypes = {
    user: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default EditCollaboratorModal;
