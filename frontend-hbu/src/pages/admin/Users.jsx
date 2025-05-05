import { useState, useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'

import CreateCollaborator from '../../components/CreateCollaborator';
import EditCollaboratorModal from '../../components/EditCollaboratorModal';
import ButtonExcel from '../../components/ButtonExcel';
// Icons
import { RiEdit2Line, RiSearch2Line } from "react-icons/ri";
import { MoreHorizontal } from 'lucide-react'
import { API_URL } from '../../apiConfig';
import {api} from '../../Api';

const Users = () => {

  const [users, setUsers] = useState([]);
  const columns = {}
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  columns.columns = ['Nombre', 'Usuario', 'Estado', 'Dimensión', 'Acciones']

  // const history = useNavigate();

  useEffect(() => {
      fetchUsers()
  }, [])

  const fetchUsers = async () => {
      try {
        const {data, status} = await api.get(`${API_URL}users/create-collaborator/`);
        if (status === 200) {
          setUsers(data)
        } else {
            console.error('Failed to fetch users. Status:', status)
        }
      } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data : error.message)
      }
  }
 
  const filteredUsers = users.filter(user => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleEditClick = (user) => {
    console.log(user);
    setSelectedUser(user); // Abre el modal con el usuario seleccionado
  };

  const handleCloseModal = () => {
    setSelectedUser(null); // Cierra el modal
  };

  const handleEditUser = (updatedUser) => {
    // Actualizar la información del usuario en la lista
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };


  return (
    <>
    {/* <h3 className="text-xl pb-3 font-bold text-slate-800">Lista de colaboradores</h3> */}
    <div className="relative flex flex-col w-full h-aoto text-slate-700 bg-secondary-100 border rounded-lg">
      <div className="relative mx-4 my-2 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
        <div className="flex items-center justify-between bg-secondary-100">
          <div className="relative w-1/2">
            <RiSearch2Line className="absolute top-1/2 -translate-y-1/2 left-2"/>
            <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 pl-8 pr-4 w-full bg-secondary-200 border outline-none rounded-xl"
            />
          </div>
          <div className='flex flex-row items-center'>
            <div className=" shrink-0 sm:flex-row">
              <CreateCollaborator updateData={fetchUsers}/>
            </div>
            <div className='flex bg-secondary-00 justify-end'>
              <ButtonExcel data={users}/>
            </div>
          </div>
        </div>
      
      </div>
      <div className="overflow-scroll">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              {columns.columns.map((column) => (
                <th key={column.id}
                  className="px-4 py-3 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p
                    className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                    {column}
                  </p>
                </th>
              ))}
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
                    {user.username}
                  </p>
                  {/* <p
                    className="text-sm text-slate-500">
                    {user.dimension}
                  </p> */}
                </div>
              </td>
              <td className="px-4 py-2 border-b border-slate-200">
                <div className="w-max">
                  <div
                    className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${user.is_active ? 'text-green-900 bg-green-500/20' : 'text-red-900 bg-red-500/20'}`}>
                    <span className="">{user.is_active ? 'Activo' : 'Inactivo'}</span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 border-b border-slate-200">
                <p className="text-sm text-slate-500 truncate max-w-xs">
                  {user.dimension.name}
                </p>
              </td>
              <td className="flex items-center px-4 py-2 border-b border-slate-200">
                <button
                  onClick={() => handleEditClick(user)}
                  className="relative h-10 max-h-[40px] w-10 max-w-[480px] select-none rounded-lg text-center text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  data-dialog-target="dialog"
                  >
                  <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <MoreHorizontal size={16}/>
                  </span>
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <EditCollaboratorModal
          user={selectedUser}
          onClose={handleCloseModal}
          onSave={handleEditUser}
        />
      )}
      <div className="flex items-center justify-between p-3">
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
      </div>
    </div>
    </>
  )
}

export default Users