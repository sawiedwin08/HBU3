import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { apiNoAuth } from '../../Api'
import { API_URL } from '../../apiConfig'

import { toast } from 'react-toastify';

const FormData = ({onClose, endpoint, updateData }) => {

  const [formData, setFormData] = useState({
    code: '',
    name: '',
  })

  // const [isopen, setIsopen] = useState(true)
  const { code, name } = formData
  
  const handleSubmit = async (e) => {
    e.preventDefault()


    try{
      const response = await apiNoAuth.post(API_URL+endpoint, formData)
      if (response.status === 201) {
        toast.success('Registro creado con éxito')
        onClose()
        // setIsopen(false)
        setFormData({
          code: '',
          name: '',
        })
        updateData(response.data)
      } else {
        console.error('Failed ', response.status)
      }
    } catch (error) {
      console.error('Error ', error)
    }

    console.log(endpoint)
    console.log('Submit')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
  }

  return (
    <form className='mb-2 py-2 px-4 space-y-2' onSubmit={handleSubmit}>
      {/* {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>} */}
      <div className=' gap-2'>
          <div className="w-auto">
              <label className="block mb-1 text-sm text-slate-700">
                  Código
              </label>
              <input
                  type="text"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                  placeholder="Ingrese código"
                  name='code'
                  onChange={handleChange}
                  value={code}
                  max={2}
                  required
              />
          </div>
      </div>

      <div className='gap-2'>
          <div className="w-auto">
              <label className="block mb-1 text-sm text-slate-700">
                  Nombre
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
      </div>
          
      <div className="p-2">
          <div className="flex space-x-2 gap-2">
              <button
                  className="w-full mx-auto select-none rounded border border-red-600 py-2 px-4 text-center text-sm font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-600/20 active:bg-red-700 active:text-white active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  data-dialog-close="true"
                  onClick={() => onClose(false, setFormData({
                      code: '',
                      name: '',
                  }))}
                  >
                  Cancelar
              </button>
  
              <button
                  className="w-full mx-auto select-none rounded bg-primary py-2 px-4 text-center text-sm font-semibold text-white shadow-md transition-all hover:shadow-slate-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="submit"
                  data-dialog-close="true">
                  Guardar
              </button>
          </div>
      </div>
  </form>
  )
}

FormData.propTypes = {
  endpoint: PropTypes.string.isRequired,
  updateData: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default FormData