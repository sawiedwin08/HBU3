import React, { useState } from 'react';
import { CircleLoader } from 'react-spinners';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';

// Icon
import { Download } from 'lucide-react'

const ButtonExcel = ({ data }) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        setLoading(true);
        const libro = XLSX.utils.book_new();
        const hoja = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(libro, hoja, 'Usuarios');
        console.log(data);

        setTimeout(() => {
            XLSX.writeFile(libro, 'Export_Data.xlsx');
            setLoading(false);
            }, 1000);
            };

    return (
        <>
        {!loading ? (
            <button className='flex gap-2 items-center bg-secondary-100 border-2 border-gray-300 rounded-md m-2 p-2 w-40 font-semibold hover:bg-gray-200' onClick={handleDownload}>
                <Download size={20}/>
                Exportar Excel
            </button>
            ) : (
                <button className='bg-secondary-100 rounded-md m-2 p-1 w-36 flex flex-row justify-center items-center gap-2' disabled>
                <CircleLoader color='#000000' size={20} />
                <span className='font-semibold'>Generando ...</span>
            </button>
            )}
        </>
    );
};
ButtonExcel.propTypes = {
    data: PropTypes.array.isRequired,
};

export default ButtonExcel;