import React from 'react'
import PropTypes from 'prop-types'
import { API_URL } from '../apiConfig';
import {api} from '../Api';

// icons
import { RiCloseFill } from "react-icons/ri";

const DeleteActivityModal = ({ activity, onClose, onSave }) => {

    const [deletedActivity, setEditedActivity] = React.useState(activity || {});

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSave(deletedActivity);
        // onClose();

        try {
            console.log('deletedActivity:', deletedActivity);  
            const {data, status} = await api.delete(`${API_URL}activities/activities/${deletedActivity.id}/`);
            if (status === 200) {
                setEditedActivity(data);
                onClose();
            } else {
                console.error('Failed to update activity. Status:', status);
                // setErrorMessage('Error al actualizar la actividad');
            }
        } catch (error) {
            console.error('Error updating activity:', error);
            }
    };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300 flex justify-center items-center">
      <div className="bg-white w-[35%] rounded-lg flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <h4
          className="text-xl px-4 font-semibold text-slate-700 p-3">
          Eliminar actividad
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
            {/* {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}                         */}
            <div className="w-full min-w-[200px] text-center">
                <p>
                    ¿Está seguro que desea eliminar la actividad? 
                </p>
                <p className='font-semibold'>{deletedActivity.name}</p>
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
                    className="w-full mx-auto select-none rounded bg-slate-800 py-2 px-4 text-center text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:bg-green-600 hover:shadow-lg hover:shadow-slate-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="submit"
                    data-dialog-close="true">
                    Confirmar
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

DeleteActivityModal.propTypes = {
    activity: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

export default DeleteActivityModal