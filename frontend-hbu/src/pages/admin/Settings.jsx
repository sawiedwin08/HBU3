import React, { useEffect, useState } from 'react'
import TableData from '../../components/settings/TableData'
import { api, apiNoAuth } from '../../Api'
import { API_URL } from '../../apiConfig'

// Icon
import { User, Palette, Shield, Wrench, HelpCircle } from 'lucide-react'

const Settings = () => {

  const [gender, setGender] = useState([])
  const [programs, setPrograms] = useState([])
  const [typeDocument, setTypeDocument] = useState([])

  const [dimensions, setDimensions] = useState([])
  const [dimensionPrograms, setDimensionPrograms] = useState([])
  const [dimensionSubPrograms, setDimensionSubPrograms] = useState([])

  const [activeTab, setActiveTab] = useState("perfil")

  const endpointGender = 'users/genders/'
  const endpointPrograms = 'users/academic-programs/'
  const endpointTypeDocument = 'users/document-types/'

  const endpointDimensions = 'dimension/dimension/'
  const endpointDimensionPrograms = 'dimension/program_dimension/'
  const endpointDimensionSubPrograms = 'dimension/subprogram_dimension/'

  const headersGenders = [
    'Codigo',
    'Nombre',
  ]

  const headersPrograms = [
    'Codigo',
    'Nombre',
  ]

  const headersTypeDocument = [
    'Codigo',
    'Nombre',
  ]

  useEffect(() => {
    getGender(),
      getPrograms(),
      getTypeDocuments(),
      getDimensions(),
      getDimensionPrograms(),
      getDimensionSubPrograms()
  }, [])

  const getGender = async () => {
    const { data, status } = await apiNoAuth.get(API_URL + endpointGender);
    if (status === 200) {
      setGender(data)
      console.log('Success ', data)
    } else {
      console.error('Failed ', status)
    }
  }

  const getPrograms = async () => {
    const { data, status } = await apiNoAuth.get(API_URL + endpointPrograms);
    if (status === 200) {
      setPrograms(data)
      console.log('Success ', data)
    } else {
      console.error('Failed ', status)
    }
  }

  const getTypeDocuments = async () => {
    const { data, status } = await apiNoAuth.get(API_URL + endpointTypeDocument);
    if (status === 200) {
      setTypeDocument(data)
      console.log('Success ', data)
    } else {
      console.error('Failed ', status)
    }
  }

  const getDimensions = async () => {
    const { data, status } = await api.get(API_URL + endpointDimensions);
    if (status === 200) {
      setDimensions(data)
      console.log('Success ', data)
    } else {
      console.error('Failed ', status)
    }
  }

  const getDimensionPrograms = async () => {
    const { data, status } = await api.get(API_URL + endpointDimensionPrograms);
    if (status === 200) {
      setDimensionPrograms(data)
      console.log('Success ', data)
    } else {
      console.error('Failed ', status)
    }
  }

  const getDimensionSubPrograms = async () => {
    const { data, status } = await api.get(API_URL + endpointDimensionSubPrograms);
    if (status === 200) {
      setDimensionSubPrograms(data)
      console.log('Success ', data)
    } else {
      console.error('Failed ', status)
    }
  }

  return (
    <>
      <div className='flex flex-col md:flex-row gap-6'>
        {/* Sidebar de navegación */}
        <div className="w-full md:w-64 h-full space-y-4 rounded-md border">
          <div className="bg-white rounded-lg">
            <ul className="text-gray-700 font-medium">
              <li className={`flex p-2 cursor-pointer items-center px-3 gap-3 hover:bg-secondary-200 ${activeTab === "profile" ? "bg-secondary-200" : ""}`} onClick={() => setActiveTab("profile")}>
                <User size={18} />
                Perfil
              </li>
              <li className={`flex p-2 cursor-pointer items-center px-3 gap-3 hover:bg-secondary-200 ${activeTab === "appearance" ? "bg-secondary-200" : ""}`} onClick={() => setActiveTab("appearance")}>
                <Palette size={18} />
                Apariencia
              </li>
              <li className={`flex p-2 cursor-pointer items-center px-3 gap-3 hover:bg-secondary-200 ${activeTab === "security" ? "bg-secondary-200" : ""}`} onClick={() => setActiveTab("security")}>
                <Shield size={18} />
                Seguridad
              </li>
              <li className={`flex p-2 cursor-pointer items-center px-3 gap-3 hover:bg-secondary-200 ${activeTab === "settings" ? "bg-secondary-200" : ""}`} onClick={() => setActiveTab("settings")}>
                <Wrench size={18} />
                Configuraciones
              </li>
              <li className={`flex p-2 cursor-pointer items-center px-3 gap-3 hover:bg-secondary-200 ${activeTab === "help" ? "bg-secondary-200" : ""}`} onClick={() => setActiveTab("help")}>
                <HelpCircle size={18} />
                Ayuda
              </li>
            </ul>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-4">
          {activeTab === "profile" && (
            <div className="">
              <div>
                <h2 className="text-xl font-bold">Información de perfil</h2>
                <p>Actualiza tu información personal y de contacto</p>
              </div>
              <div className="flex py-3 flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col items-center">
                <div className="relative w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-40 h-40 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                </div>
                  {/* <img src="https://via.placeholder.com/150" alt="Perfil" className="rounded-full mb-4" /> */}
                  <div className="flex flex-col mt-4 space-y-2 w-full">
                    <button className="w-full text-white py-2 rounded-md border hover:bg-secondary-200 transition duration-200">
                      <span className="text-sm font-semibold text-gray-700">Cambiar foto de perfil</span>
                    </button>
                    <button className='w-full text-white py-2 rounded-md border hover:bg-red-200 transition duration-200'>
                      <span className="text-sm font-semibold text-red-500">Eliminar foto</span>
                    </button>
                  </div>
                </div>
                <div className="md:w-2/3 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Nombre</label>
                      <input type="text" className="border rounded-md p-2 w-full" placeholder="Nombre" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Apellidos</label>
                      <input type="text" className="border rounded-md p-2 w-full" placeholder="Apellido" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Correo Electrónico</label>
                      <input type="email" className="border rounded-md p-2 w-full" placeholder="Correo Electrónico" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Teléfono</label>
                      <input type="tel" className="border rounded-md p-2 w-full" placeholder="Teléfono" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Usuario</label>
                      <input type="text" className="border rounded-md p-2 w-full" placeholder="Usuario" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Rol</label>
                      <input type="text" className="border rounded-md p-2 w-full" placeholder="Rol" />
                    </div>


                  </div>

                </div>
              </div>
            </div>
          )}
          {activeTab === "appearance" && (
            <div className="">
              <h2 className="text-xl font-bold">Apariencia</h2>
              <p>Contenido de apariencia</p>
            </div>
          )}
          {activeTab === "security" && (
            <div className="">
              <h2 className="text-xl font-bold">Seguridad de la cuenta</h2>
              <p>Gestiona la seguridad de tu cuenta</p>
              <div className="flex flex-col gap-6 mt-4">
                <h3 className="text-lg font-medium">Cambiar contraseña</h3>
                <div className="md:w-full space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Contraseña actual</label>
                  <input type="password" className="border rounded-md p-2 w-full" placeholder="Contraseña actual" />
                </div>
                <div className="md:w-full space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Nueva contraseña</label>
                  <input type="password" className="border rounded-md p-2 w-full" placeholder="Nueva contraseña" />
                </div>
                <div className='md:w-full space-y-2'>
                  <label className="text-sm font-semibold text-gray-700">Confirmar nueva contraseña</label>
                  <input type="password" className="border rounded-md p-2 w-full" placeholder="Confirmar nueva contraseña" />
                </div>
                <button className="w-1/3 text-white py-2 bg-primary rounded-md border hover:bg-secondary-200 transition duration-200">
                  <span className="text-sm font-semibold">Actualizar contraseña</span>
                </button>
              </div>
            </div>
          )}
          {activeTab === "settings" && (
            <div className="">
              <h2 className="text-xl font-bold">Configuración del sistema</h2>
              <p>Ajustes generales del sistema</p>
              <div className="flex flex-col gap-6 mt-4 pb-2 border-b">
                <div>
                  <h3 className="text-lg font-medium">Configuración de generos</h3>
                  <p>Gestiona los generos disponibles en el sistema</p>
                  <TableData
                    title="Generos"
                    headers={headersGenders}
                    data={gender}
                    endpoint={endpointGender}
                    updateData={getGender}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Configuración de programas académicos</h3>
                  <p>Gestiona los programas académicos disponibles en el sistema</p>
                  <TableData
                    title="Programas Academicos"
                    headers={headersPrograms}
                    data={programs}
                    endpoint={endpointPrograms}
                    updateData={getPrograms}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Configuración de tipos de documento</h3>
                  <p>Gestiona los tipos de documento disponibles en el sistema</p>
                  <TableData
                    title="Tipo de Documento"
                    headers={headersTypeDocument}
                    data={typeDocument}
                    endpoint={endpointTypeDocument}
                    updateData={getTypeDocuments}
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === "help" && (
            <div className="">
              <h2 className="text-xl font-bold">Acerca de</h2>
              <p>Información sobre el sistema</p>
              <div className="flex items-center gap-4 py-3">
                <div className="relative inline-flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-100 rounded-md dark:bg-gray-600">
                    <span className="font-medium text-4xl text-gray-600 dark:text-gray-300">ED</span>
                </div>
                {/* <img src="/placeholder.svg?height=80&width=80" alt="Logo" className="h-20 w-20" /> */}
                <div>
                  <h3 className="text-xl font-bold">Sistema de Gestión de Actividades</h3>
                  <p className="text-gray-500">Versión 1.2.0 (Build 2024.11.05)</p>
                </div>
              </div>
              <p className="text-sm py-3 text-gray-500">© 2025 Universidad Cooperativa de Colombia. Todos los derechos reservados.</p>
              <div className="flex gap-2">
                <button className="text-white px-3 py-2 rounded-md border hover:bg-secondary-200 transition duration-200">
                  <span className="text-sm font-semibold text-gray-700">Términos de servicio</span>
                </button>
                <button className="text-white px-3 py-2 rounded-md border hover:bg-secondary-200 transition duration-200">
                  <span className="text-sm font-semibold text-gray-700">Política de privacidad</span>
                </button>
                <button className="text-white px-3 py-2 rounded-md border hover:bg-secondary-200 transition duration-200">
                  <span className="text-sm font-semibold text-gray-700">Licencias</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <h1 className='font-bold text-2xl'>Configuraciones del sistema</h1>
      <div className='flex flex-col mt-3 h-[90%] bg-secondary-200 rounded-xl border border-spacing-2 border-slate-800'>
        <div className='flex md:flex-row flex-col h-[60%] justify-center gap-6 p-4'>
          <TableData 
            title="Generos" 
            headers={headersGenders} 
            data={gender} 
            endpoint={endpointGender}
            updateData={getGender}
          />
          <TableData 
            title="Programas Academicos" 
            headers={headersPrograms} 
            data={programs} 
            endpoint={endpointPrograms}
            updateData={getPrograms}
          />
          <TableData 
            title="Tipo de Documento" 
            headers={headersTypeDocument} 
            data={typeDocument} 
            endpoint={endpointTypeDocument}
            updateData={getTypeDocuments}
          />
        </div> */}

      {/* <div className='flex md:flex-row flex-col justify-center h-[50%]  gap-6 p-2'>
          <TableData 
            title="Dimensiones" 
            headers={['Nombre', 'Descripción']} 
            data={dimensions} 
            endpoint={endpointDimensions}
            updateData={getDimensions}
          />
          <TableData 
            title="Programas" 
            headers={['Nombre', 'Descripción']} 
            data={dimensionPrograms} 
            endpoint={endpointDimensionPrograms}
            updateData={getDimensionPrograms}
          />
          <TableData 
            title="Subprogramas" 
            headers={['Nombre', 'Descripción']} 
            data={dimensionSubPrograms} 
            endpoint={endpointDimensionSubPrograms}
            updateData={getDimensionSubPrograms}
          />
        </div> */}
      {/* </div> */}
    </>
  )
}

export default Settings