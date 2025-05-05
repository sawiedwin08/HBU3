import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonExcel from '../../components/ButtonExcel';
import { API_URL } from '../../apiConfig';
import { api } from '../../Api';

// Icons
import { RiEdit2Line, RiSearch2Line } from "react-icons/ri";

const UsersEstudents = () => {

  const [users, setUser] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const history = useNavigate();

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data, status } = await api.get(`${API_URL}users/create-student/`)
      if (status === 200) {
        // const data = await response.json()
        console.log(data.user)
        setUser(data)
      } else {
        console.error('Failed to fetch users')
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const filteredUsers = users.filter(user => {
    if (user.role === 'Estudiante') {
      console.log(user);
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });


  return (
    <>
      {/* <h3 className="text-lg font-bold text-slate-800 pb-3">Lista de estudiantes</h3> */}
      <div className="relative flex flex-col w-full h-aoto text-slate-700 bg-secondary-100 border rounded-lg">
        <div className="relative mx-4 my-3 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
          <div className="flex items-center justify-between bg-secondary-100">
            {/* <div> */}
            <div className="relative w-1/2">
              <RiSearch2Line className="absolute top-1/2 -translate-y-1/2 left-2" />
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-2 pl-8 pr-4 w-full bg-secondary-200 border outline-none rounded-xl"
              />
            </div>
            <div className='flex bg-secondary-100 justify-end'>
              <ButtonExcel data={users} />
            </div>
            {/* <p className="text-slate-500">Review each person before edit</p> */}
            {/* </div> */}
            {/* <div className="flex flex-col mb-3 shrink-0 sm:flex-row"> */}
            {/* <button
              className="rounded bg-secondary-100 border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button">
              View All
            </button> */}
            {/* <div className='mt-2'> */}
            {/* <button type='submit' className='bg-primary w-full py-2 px-4 text-white rounded-lg'>
                Validar cuenta
              </button> */}
            {/* </div> */}
            {/* <button
              className="flex items-center rounded-lg bg-slate-800 py-2 px-4 text-base font-semibold text-white focus:opacity-[0.85]"
              type="button">
              Agregar usuario
            </button> */}
            {/* </div> */}
          </div>

        </div>
        <div className="overflow-scroll">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th
                  className="px-4 py-3 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p
                    className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                    Nombre
                  </p>
                </th>
                <th
                  className="px-4 py-3 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p
                    className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                    Rol
                  </p>
                </th>
                <th
                  className="px-4 py-3 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p
                    className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                    Estado
                  </p>
                </th>
                <th
                  className="px-4 py-3 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p
                    className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                    Horas acumuladas
                  </p>
                </th>
                {/* <th
                className="px-4 py-3 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                <p
                  className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                  Actiones
                </p>
              </th> */}
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                        alt="John Michael" className="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-slate-700">
                          {user.name} {user.last_name}
                        </p>
                        <p
                          className="text-sm text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-slate-700">
                        {user.role}
                      </p>
                      <p
                        className="text-sm text-slate-500">
                        Organization
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    <div className="w-max">
                      <div
                        className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${user.is_active ? 'text-green-900 bg-green-500/20' : 'text-red-900 bg-red-500/20'}`}>

                        <span className="">{user.is_active == true ? 'Activo' : 'inactivo'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-14 py-2 border-b border-slate-200">
                    <p className="text-sm font-bold text-slate-500">
                      {/* {user.accumulated_hours} */}
                      {Math.floor(user.accumulated_hours)}
                    </p>
                  </td>
                  {/* <td className="flex items-center px-4 py-2 border-b border-slate-200">
                <button
                  className="relative h-10 max-h-[40px] w-10 max-w-[480px] select-none rounded-lg text-center text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  data-dialog-target="dialog"
                  >
                  <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <RiEdit2Line/>
                  </span>
                </button>
              </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className="flex items-center justify-between p-3">
        <p className="block text-sm text-slate-500">
          Pagina 1 de 10
        </p>
        <div className="flex gap-1">
          <button
            className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            Anterior
          </button>
          <button
            className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            Siguiente
          </button>
        </div>
      </div> */}
      </div>

      {/* <div data-dialog-backdrop="dialog" data-dialog-backdrop-close="true" className="absolute left-0 top-0 inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
        <div data-dialog="dialog"
          className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-slate-700 shadow-md">
          <div className="flex flex-col p-6">
            <h4
              className="text-2xl mb-1 font-semibold text-slate-700">
              Edit Member Details
            </h4>
            <p className="mb-3 mt-1 text-slate-400">
              Enter or reset each information for the member access.
            </p>
          
          <div className="w-full max-w-sm min-w-[200px] mt-4">
            <label className="block mb-1 text-sm text-slate-700">
              Member Name
            </label>
            <input
                type="text"
                className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                placeholder="Enter your text" />
            </div>
            <div className="w-full max-w-sm min-w-[200px] mt-4">
            <label className="block mb-1 text-sm text-slate-700">
                Member Email
            </label>
            <input
                type="text"
                className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                placeholder="Enter the email" />
            </div>
            <div className="w-full max-w-sm min-w-[200px] mt-4">
                <label className="block mb-1 text-sm text-slate-700">
                    Job
                </label>
                <input
                    type="text"
                    className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                    placeholder="Enter the job" />
            </div>
            <div className="w-full max-w-sm min-w-[200px] mt-4">
                <label className="block mb-1 text-sm text-slate-700">
                    Active Status
                </label>
                <input
                    type="text"
                    className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                    placeholder="Offline/Online" />
            </div>
            
          </div>
          <div className="p-6 pt-0">
            <div className="flex space-x-2">
                <button
                    className="w-full mx-auto select-none rounded border border-red-600 py-2 px-4 text-center text-sm font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-600/20 active:bg-red-700 active:text-white active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-dialog-close="true">
                    Cancel
                </button>
    
                <button
                    className="w-full mx-auto select-none rounded bg-slate-800 py-2 px-4 text-center text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-dialog-close="true">
                    Save
                </button>
            </div>
            <p className="flex justify-center mt-4 font-sans text-sm text-slate-500">
              Looking for more details? Contact
              <a href="#admin"
                className="ml-1 text-sm font-bold leading-normal text-slate-500">
                Admin.
              </a>
            </p>
          </div>
        </div>
      </div>   */}
    </>
  )
}

export default UsersEstudents