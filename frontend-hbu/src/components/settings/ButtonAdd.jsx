import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal'; // Asegúrate de que la ruta sea correcta

export const ButtonAdd = ({endpoint, updateData}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="flex select-none items-center gap-3 rounded-lg bg-primary py-2 px-4 text-center align-middle font-semibold text-white shadow-gray-900/10 transition-all hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={handleOpenModal}
      >
        + Agregar
      </button>
      {isModalOpen && <Modal onClose={handleCloseModal} endpoint={endpoint} updateData={updateData}/>}
    </>
  );
};

ButtonAdd.propTypes = {
  endpoint: PropTypes.string.isRequired,
  updateData: PropTypes.func.isRequired,
};
