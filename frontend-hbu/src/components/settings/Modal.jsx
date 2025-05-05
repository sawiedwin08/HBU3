// import React from 'react'

// const Modal = () => {
//   return (
//     {isopen &&(
//         // <EditActivity setIsopen={setIsopen} />
//         <div className='fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300 flex justify-center items-center'>
//             {/* className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" */}
//             <div className='bg-white w-[65%] rounded-lg flex flex-col gap-5'>
//                 <div>
//                 <div className="flex items-start justify-between">
//                     <h4
//                     className="text-xl px-4 mb-2 font-semibold text-slate-700 p-3">
//                     Agregar usuario bienestar
//                     </h4>
//                     {/* <p className="mb-2 mt-1 text-slate-400">
//                     Ingrese los datos de la actividad.
//                     </p> */}
//                     <button
//                         // data-ripple-dark="true"
//                         // data-dialog-close="true"
//                         onClick={() => setIsopen(false, setFormData({
//                             code: '',
//                             name: '',
//                         }))}
//                         className="relative h-8 max-h-[40px] w-8 max-w-[480px] m-1 select-none rounded-lg text-center text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//                         type="button">
//                         <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
//                             <RiCloseFill/>
//                         </span>
//                     </button>                
//                 </div>

//                 </div>
//             </div>
//         </div>
//         )}
//   )
// }

// export default Modal
import React, { useState } from 'react'
import { RiCloseFill } from 'react-icons/ri';
import FormData from './FormData';

import PropTypes from 'prop-types';

const Modal = ({ onClose, endpoint, updateData }) => {
    const [isopen, setIsopen] = useState(true);

    return (
        isopen && (
            <div className='fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300 flex justify-center items-center'>
                <div className='bg-white w-auto rounded-lg flex flex-col gap-5'>
                    <div>
                        <div className="flex items-start justify-between">
                            <h4 className="text-xl px-4 font-semibold text-slate-700 p-3">
                                Agregar
                            </h4>
                            <button
                                onClick={() => {
                                    setIsopen(false);
                                    onClose();
                                }}
                                className="relative h-8 max-h-[40px] w-8 max-w-[480px] m-1 select-none rounded-lg text-center text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    <RiCloseFill />
                                </span>
                            </button>
                        </div>
                        <FormData onClose={onClose} endpoint={endpoint} updateData={updateData}/>
                    </div>
                </div>
            </div>
        )
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    endpoint: PropTypes.string.isRequired,
    updateData: PropTypes.func.isRequired,
};

export default Modal;