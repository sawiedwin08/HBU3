// import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// // import QRCode from 'qrcode.react'
// import { QRCodeCanvas } from 'qrcode.react'
// import QRCodeComponent from './QRCode'

// // Datos de muestra para la actividad
// const actividadMuestra = {
//   id: 1,
//   name: "Taller de Liderazgo y Trabajo en Equipo",
//   description: "Desarrolla habilidades esenciales de liderazgo y aprende técnicas efectivas para el trabajo en equipo en este taller interactivo.",
//   dimension: "Desarrollo Personal",
//   program_dimension: "Liderazgo Estudiantil",
//   subprogram_dimension: "Talleres de Habilidades Blandas",
//   responsible: "Dra. Ana Martínez",
//   date: "2023-06-15",
//   start_hour: "14:00",
//   end_hour: "17:00",
//   count_hours: 3
// }

// // Datos de muestra para estudiantes
// const estudiantesMuestra = [
//   { id: 1, nombre: "Carlos Rodríguez", programa: "Ingeniería de Sistemas", semestre: 5, fecha_registro: "2023-06-10T09:30:00" },
//   { id: 2, nombre: "Laura Gómez", programa: "Psicología", semestre: 3, fecha_registro: "2023-06-11T14:45:00" },
//   { id: 3, nombre: "Juan Pérez", programa: "Administración de Empresas", semestre: 7, fecha_registro: "2023-06-12T11:15:00" },
// ]

// export default function DetalleActividad() {
//   const { id } = useParams()
//   const [actividad, setActividad] = useState(null)
//   const [estudiantes, setEstudiantes] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Simulamos una llamada a la API con un retraso
//         await new Promise(resolve => setTimeout(resolve, 1000))
//         setActividad(actividadMuestra)
//         setEstudiantes(estudiantesMuestra)
//       } catch (error) {
//         console.error('Error al cargar los datos de la actividad:', error)
//         setError('No se pudieron cargar los datos de la actividad. Por favor, intenta de nuevo más tarde.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [id])

//   const handleQRScan = () => {
//     const nuevosNombres = [
//       "María Sánchez", "Pedro López", "Ana Torres", "Diego Herrera", "Sofía Ramírez",
//       "Javier Morales", "Valentina Castro", "Andrés Ortiz", "Camila Vargas", "Gabriel Mendoza"
//     ]
//     const nuevosProgramas = [
//       "Medicina", "Derecho", "Ingeniería Civil", "Arquitectura", "Economía",
//       "Biología", "Química", "Física", "Matemáticas", "Comunicación Social"
//     ]
    
//     const nuevoEstudiante = {
//       id: estudiantes.length + 1,
//       nombre: nuevosNombres[Math.floor(Math.random() * nuevosNombres.length)],
//       programa: nuevosProgramas[Math.floor(Math.random() * nuevosProgramas.length)],
//       semestre: Math.floor(Math.random() * 10) + 1,
//       fecha_registro: new Date().toISOString()
//     }
//     setEstudiantes(prevEstudiantes => [...prevEstudiantes, nuevoEstudiante])
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-red-500 text-center">
//           <h2 className="text-2xl font-bold mb-2">Error</h2>
//           <p>{error}</p>
//         </div>
//       </div>
//     )
//   }

//   if (!actividad) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-2">Actividad no encontrada</h2>
//           <p>No se encontró la actividad solicitada.</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-2">{actividad.name}</h2>
//           <p className="text-gray-600 mb-4">{actividad.description}</p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{actividad.dimension}</span>
//               <p className="text-sm text-gray-500 mb-2">
//                 <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
//                 {new Date(actividad.date).toLocaleDateString()}
//               </p>
//               <p className="text-sm text-gray-500 mb-2">
//                 <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//                 {actividad.start_hour} - {actividad.end_hour}
//               </p>
//               <p className="text-sm text-gray-500 mb-2">
//                 <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
//                 Responsable: {actividad.responsible}
//               </p>
//               <p className="text-sm text-gray-500 mb-2">Programa: {actividad.program_dimension}</p>
//               <p className="text-sm text-gray-500 mb-2">Subprograma: {actividad.subprogram_dimension}</p>
//               <p className="text-sm text-gray-500 mb-2">Duración: {actividad.count_hours} horas</p>
//             </div>
//             <div className="flex flex-col justify-center items-center">
//                 {/* <QRCodeCanvas value={`https://tu-dominio.com/registro/${actividad.id}`} size={200} /> */}
//               <QRCodeComponent activityId="2" />
//               {/* <QRCode value={`https://tu-dominio.com/registro/${actividad.id}`} size={200} /> */}
//               <p className="mt-2 text-sm text-gray-500">Escanea para registrarte</p>
//               <button onClick={handleQRScan} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                 Simular escaneo de QR
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="p-6">
//           <h3 className="text-xl font-bold mb-4 flex items-center">
//             <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
//             Estudiantes Registrados
//           </h3>
//           {estudiantes.length === 0 ? (
//             <p className="text-center text-gray-500 py-4">Aún no hay estudiantes registrados para esta actividad.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programa</th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semestre</th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Registro</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {estudiantes.map((estudiante) => (
//                     <tr key={estudiante.id}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{estudiante.nombre}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{estudiante.programa}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{estudiante.semestre}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(estudiante.fecha_registro).toLocaleString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// Importamos el componente de QR Code
import QRCodeComponent from './QRCode'

// URL base de la API
import { API_URL } from '../apiConfig'
import { api } from '../Api'
import ButtonExcel from './ButtonExcel'

// Icons
import { RiCalendarLine, RiTimer2Line, RiUser3Line } from 'react-icons/ri'
import { Edit, Trash2 } from 'lucide-react'
// const API_URL = 'https://tu-api.com/activities/'

export default function DetalleActividad() {
  const { id } = useParams() // Obtenemos el ID de la URL
  const [actividad, setActividad] = useState(null)
  const [estudiantes, setEstudiantes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const dataStudent = estudiantes.map((student) => {
    return {
      name: student.student.name,
      last_name: student.student.last_name,
      academic_program: student.student.academic_program.name,
      semester: student.student.semester,
      type_document: student.student.type_document.code,
      document: student.student.identification,
      attendance_date: student.attendance_date
    }
  })

  // Efecto para cargar la actividad y estudiantes cuando se monta el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('sadasdasdasd',id);
      // Simulamos una llamada a la API
      const activityResponse = await api.get(`activities/activities/${id}`); // Llamamos a la API con el ID
      const activityData = activityResponse.data;
      console.log('sadasdasdasd',activityData);
      
      // Suponiendo que también obtienes los estudiantes relacionados con esta actividad
      const studentsResponse = await api.get(`dimension/attandence_activity/${id}/`);
      const studentsData = studentsResponse.data;
      console.log('estudiante data',studentsData);

      
      
      // Actualizamos el estado con los datos obtenidos
      setActividad(activityData);
      setEstudiantes(studentsData);
      } catch (error) {
      console.error('Error al cargar los datos de la actividad:', error);
      setError('No se pudieron cargar los datos de la actividad. Por favor, intenta de nuevo más tarde.');
      } finally {
      setLoading(false);
      }
    };

    fetchData(); // Llamamos a la función para cargar los datos
  }, [id]); // Dependemos del ID de la actividad

  const handleQRScan = () => {
    // Simulamos la adición de un estudiante
    const nuevosNombres = [
      "María Sánchez", "Pedro López", "Ana Torres", "Diego Herrera", "Sofía Ramírez",
      "Javier Morales", "Valentina Castro", "Andrés Ortiz", "Camila Vargas", "Gabriel Mendoza"
    ]
    const nuevosProgramas = [
      "Medicina", "Derecho", "Ingeniería Civil", "Arquitectura", "Economía",
      "Biología", "Química", "Física", "Matemáticas", "Comunicación Social"
    ]
    
    const nuevoEstudiante = {
      id: estudiantes.length + 1,
      nombre: nuevosNombres[Math.floor(Math.random() * nuevosNombres.length)],
      programa: nuevosProgramas[Math.floor(Math.random() * nuevosProgramas.length)],
      semestre: Math.floor(Math.random() * 10) + 1,
      fecha_registro: new Date().toISOString()
    }
    setEstudiantes(prevEstudiantes => [...prevEstudiantes, nuevoEstudiante])
  }

  // Si estamos cargando los datos
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Si hay un error al cargar los datos
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  // Si no se encuentra la actividad
  if (!actividad) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Actividad no encontrada</h2>
          <p>No se encontró la actividad solicitada.</p>
        </div>
      </div>
    )
  }

  // Renderizamos los detalles de la actividad
  return (
    <div className="container mx-auto p-2">
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
          <h2 className="text-2xl font-bold mb-2">{actividad.name}</h2>
          <p className="text-gray-600 mb-2 text-justify">{actividad.description}</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 mb-2 rounded">{actividad.dimension}</span>
              <div className='flex items-center mb-2 gap-3'>
                <RiCalendarLine className='text-gray-400' size={20}/>
                <div className=''>
                  <p className='text-sm text-gray-400'>Fecha</p>
                  <p className="font-medium text-gray-500 mb-2">{new Date(actividad.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className='flex items-center mb-2 gap-3'>
                <RiTimer2Line className='text-gray-400' size={20}/>
                <div className=''>
                  <p className='text-sm text-gray-400'>Horario</p>
                  <p className="font-medium text-gray-500 mb-2">{actividad.start_hour} - {actividad.end_hour}</p>
                </div>
              </div>
              <div className='flex items-center mb-2 gap-3'>
                <RiUser3Line className='text-gray-400' size={20}/>
                <div className=''>
                  <p className='text-sm text-gray-400'>Facilitador</p>
                  <p className="font-medium text-gray-500 mb-2">{actividad.responsible.name} {actividad.responsible.last_name}</p>
                </div>
              </div>
              <div className='flex items-center mb-2 gap-3'>
                <RiUser3Line className='text-gray-400' size={20}/>
                <div className=''>
                  <p className='text-sm text-gray-400'>Categoria</p>
                  <p className="font-medium text-gray-500">{actividad.program_dimension}</p>
                  <p className="font-medium text-gray-500 mb-2">{actividad.subprogram_dimension}</p>
                </div>
              </div>
              <div className='flex items-center mb-2 gap-3'>
                <RiUser3Line className='text-gray-400' size={20}/>
                <div className=''>
                  <p className='text-sm text-gray-400'>Dureción</p>
                  <p className="text-sm text-gray-500 mb-2">{actividad.count_hours} horas</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between items-center">
              <div className='flex ml-auto gap-2 w-full justify-end m-2 mb-3'>
                <button className='flex items-center gap-2 px-3 py-2 rounded-lg text-amber-600 border border-amber-700 bg-amber-50 hover:bg-amber-100'>
                <Edit size={18} />
                  Editar
                </button>
                <button className='flex items-center gap-2 px-3 rounded-lg text-red-600 border border-red-600 bg-red-50 hover:bg-red-100'>
                <Trash2 size={18} />
                  Eliminar
                </button>
              </div>
              <QRCodeComponent activityId={id}/>
              <p className="mt-2 text-md font-semibold text-gray-500">Escanea para registrarte</p>
              {/* <button onClick={handleQRScan} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Simular escaneo de QR
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className='flex bg-secondary-100 justify-between'>
          <h3 className="text-xl font-bold mb-4">Estudiantes Registrados</h3>
            <ButtonExcel data={dataStudent}/>
          </div>
          {estudiantes.length === 0 ? (
            <p className="text-center text-gray-500 py-4">Aún no hay estudiantes registrados para esta actividad.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programa</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semestre</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Registro</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {estudiantes.map((estudiante) => (
                    console.log('estudiante',estudiante.student.id),
                    <tr key={estudiante.student.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{estudiante.student.name} {estudiante.student.last_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{estudiante.student.academic_program.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{estudiante.student.semester}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(estudiante.attendance_date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
