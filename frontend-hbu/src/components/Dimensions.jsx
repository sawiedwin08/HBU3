import React, { useState, useContext, useEffect } from 'react';
import { API_URL } from '../apiConfig';
import {api} from '../Api';

const Dimensions = () => {
    const [dimensions, setDimensions] = useState([])
    const [selectDimension, setSelectDimension] = useState('')
    const [programs, setPrograms] = useState([])
    const [selectProgram, setSelectProgram] = useState('')
    const [subPrograms, setSubPrograms] = useState([])
    const [selectSubProgram, setSelectSubProgram] = useState('')

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

    useEffect(() => {
        getDimensions();
        getPrograms();
        getSubPrograms();
    }, []);

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

}

export default Dimensions