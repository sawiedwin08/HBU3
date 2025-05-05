import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../features/auth/AuthContext';
import { API_URL } from '../../apiConfig';
import {api} from '../../Api';
import { useNavigate } from 'react-router-dom'; 

import CreateActivity from '../../components/CreateActivity';
import EditActivity from '../../components/EditActivityModal';
import DeleteActivityModal from '../../components/DeleteActivityModal';
import DetalleActividad from '../../components/DetailsActivity';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import 'react-toastify/dist/ReactToastify.css';

//Icons
import { RiCalendarLine, RiDeleteBinLine, RiEdit2Line, RiEyeLine, RiSearch2Line, RiCalendarEventLine, RiTimer2Line, RiCloseFill, RiLogoutBoxFill, RiFilter2Line } from "react-icons/ri";

const Activities = () => {

  const [activities, setActivities] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('active'); // Estado para el filtro seleccionado

  // const [selectedViewActivity, setSelectedViewActivity] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedDeleteActivity, setSelectedDeleteActivity] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities()
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await api.get(API_URL+'activities/activities/');
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error)
    }
  };

  const handleDateChange = (dates) => {
    // console.log(dates);
    const [start, end] = dates;
    // console.log(start, end);
    setStartDate(start ? new Date(start.setHours(0, 0, 0, 0)) : null); // Fecha inicial con horas ajustadas a 00:00:00
  setEndDate(end ? new Date(end.setHours(23, 59, 59, 999)) : null);
  };

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible); // Cambia la visibilidad del calendario
  };

  const resetDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') {
      return activity.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filter === 'active') {
      return activity.state === true && 
         new Date(activity.date) > new Date() && 
         activity.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filter === 'expired') {
      return activity.state === true &&
          new Date(activity.date) < new Date() &&
          activity.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filter === 'disabled') {
      return activity.state === false && activity.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  const filteredActivitiesByDate = filteredActivities.filter(activity => {
    // Convertir la fecha de la actividad a un formato solo con el día (sin horas)
    const activityDate = new Date(activity.date).toISOString().split('T')[0]; // Convertir a formato 'YYYY-MM-DD'
    
    // Convertir las fechas seleccionadas a un formato 'YYYY-MM-DD'
    const startDateFormatted = startDate ? startDate.toISOString().split('T')[0] : null;
    const endDateFormatted = endDate ? endDate.toISOString().split('T')[0] : null;
  
    // Si se selecciona un rango de fechas
    if (startDate && endDate) {
      return activityDate >= startDateFormatted && activityDate <= endDateFormatted;
    }
    // Si solo se selecciona una fecha específica
    if (startDateFormatted) {
      return activityDate === startDateFormatted;
    }
    return true;
  });

  const handleViewClick = (activity) => {
    if (role === 'Administrador' || role === 'Usuario_Bienestar') {
      navigate(`/activity/${activity.id}`);
    }
  };

  const handleEditClick = (activity) => {
    setSelectedActivity(activity); // Abre el modal con el usuario seleccionado
  };

  const handleDeleteClick = (activity) => {
    setSelectedDeleteActivity(activity); // Abre el modal con el usuario seleccionado
  };

  const handleCloseModal = () => {
    fetchActivities();
    setSelectedActivity(null); // Cierra el modal
    setSelectedDeleteActivity(null); // Cierra el modal
  };

  const handleEditUser = (updatedActivity) => {
    // Actualizar la información del usuario en la lista
    setActivities((prevActivity) =>
      prevActivity.map((user) => (user.id === updatedActivity.id ? updatedActivity : user))
    );
  };

  return (
    <>
    {/* <h1 className="text-xl font-bold pb-3">Gestión de actividades</h1> */}
    {/* <div className="container mx-auto pt-3 mb-2 bg-secondary-200  h-auto"> */}
      <div className='flex flex-row justify-between'>

        <div className="relative md:w-1/2 border-2 mb-3">
            <RiSearch2Line className="absolute top-2/3 -translate-y-4 left-2"/>
            <input
              type="text"
              placeholder="Buscar actividades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 pl-8 pr-3 w-full bg-secondary-100 outline-none rounded-xl"
            />
        </div>
        <div className='flex flex-row gap-3'>
          <div className="flex justify-between mb-3">
            {(role === 'Administrador' || role == 'Usuario_Bienestar') && (
              <CreateActivity updateData={fetchActivities}/>  
            )}
          </div>
          <button onClick={toggleCalendar} className="flex items-center rounded-lg h-11 border-2 bg-secondary-100 pr-4 font-semibold text-slate-800 hover:bg-gray-100 focus:opacity-[0.85]">
          <RiFilter2Line className='m-2' size={18} />
            Filtrar por fecha
          </button>
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-full overflow-hidden justify-between pb-2">
        {(role === 'Administrador' || role == 'Usuario_Bienestar') && (
          <div className='w-full md:w-1/2'>
            <ul role="tablist" className="relative flex flex-row p-1 w-full rounded-lg bg-blue-gray-50 bg-slate-200 bg-opacity-60">
              <li role="tab"
                className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-secondary-200 cursor-pointer select-none text-blue-gray-900 ${filter === 'active' ? 'bg-white rounded-md shadow-md ' : ''}`}
                onClick={() => setFilter('active')}>
                <div className="z-20 text-inherit">
                  Activos
                </div>
              </li>
              <li role="tab"
                className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-secondary-200 cursor-pointer select-none text-blue-gray-900 ${filter === 'disabled' ? 'bg-white rounded-md shadow-md' : ''}`}
                onClick={() => setFilter('disabled')}>
                <div className="z-40 text-inherit">
                  Deshabilitados
                </div>
              </li>
              <li role="tab"
                className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-secondary-200 cursor-pointer select-none text-blue-gray-900 ${filter === 'expired' ? 'bg-white rounded-md shadow-md' : ''}`}
                onClick={() => setFilter('expired')}>
                <div className="z-40 text-inherit">
                  Vencidas
                </div>
              </li>
              <li role="tab"
                className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-secondary-200 cursor-pointer select-none text-blue-gray-900 ${filter === 'all' ? 'bg-white rounded-md shadow-md' : ''}`}
                onClick={() => setFilter('all')}>
                <div className="z-20 text-inherit">
                  Todas
                </div>
              </li>
            </ul>
          </div>
        )}
        </div>
    {/* </div> */}
    
    {/* <div className='container mx-auto py-2 bg-secondary-100 rounded-xl h-[70%] overflow-scroll border border-spacing-2 border-secondary-200'> */}
      {calendarVisible && (
          <div className="absolute top-16 right-0 bg-white shadow-lg p-4 z-10 rounded-lg">
          <span 
            onClick={toggleCalendar} // Aquí manejas el evento de cerrar la ventana o modal
            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 cursor-pointer">
            <RiCloseFill />
          </span>
        
          <div className="flex flex-row justify-between items-center">
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
          </div>
        
          <div className="mt-2 flex justify-between">
            <button onClick={resetDateFilter} className="bg-gray-300 px-4 py-2 rounded-lg">
              Restablecer
            </button>
            <button onClick={() => setStartDate(new Date())} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Hoy
            </button>
          </div>
        
          {/* Aquí puedes agregar un ícono para cerrar sesión */}
          <div className="absolute top-2 right-2 cursor-pointer" onClick={toggleCalendar}>
            <RiCloseFill size={18} className="text-gray-600" />
          </div>
        </div>
        )}


      <div className="space-y-3">
        {filteredActivitiesByDate.map((activity) => (
          <div key={activity.id} className="flex md:flex-row flex-col items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <RiCalendarLine className='text-primary bg-blue-100 p-2 rounded-md ' size={44}/>
            <div className='md:w-1/2 w-full flex flex-col justify-center items-start'>
              <button onClick={() => handleViewClick(activity)}><h3 className="text-left text-lg font-bold">{activity.name}</h3></button>
              <p className="text-md text-gray-500 truncate max-w-xs">
                {activity.description}
              </p>
            </div>
            <div>
              <h3 className="text-gray-500 pb-1 text-sm">Fecha</h3>
              <p className="flex font-semibold items-center gap-2 text-md">
                <RiCalendarEventLine className='text-gray-400' size={20}/>
                {activity.date}
              </p>
            </div>
            <div>
              <h3 className=" text-gray-500 pb-1 text-sm">Hora inicio</h3>
              <p className="flex font-semibold items-center gap-2 text-md">
                <RiTimer2Line />
                {activity.start_hour}
              </p>
            </div>
            <div>
              <h3 className="text-gray-500 pb-1 text-sm">Hora fin</h3>
              <p className="flex font-semibold items-center gap-2 text-md">
                <RiTimer2Line />
                {activity.end_hour}
              </p>
            </div>
            {(role === 'Administrador' || role == 'Usuario_Bienestar') && (
            <div className="flex space-x-2">
              <button
                onClick={() => handleViewClick(activity)}
                className="relative h-10 max-h-[40px] w-10 max-w-[480px] select-none rounded-full text-center hover:text-blue-500 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-dialog-target="dialog"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <RiEyeLine/>
                </span>
              </button>
              <button
                onClick={() => handleEditClick(activity)}
                className="relative h-10 max-h-[40px] w-10 max-w-[480px] select-none rounded-full text-center hover:text-orange-400 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-dialog-target="dialog"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <RiEdit2Line/>
                </span>
              </button>
              <button
                onClick={() => handleDeleteClick(activity)}
                className={`relative h-10 max-h-[40px] w-10 max-w-[480px] select-none rounded-full text-center text-red-500 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${activity.state ? 'visible' : 'hidden'}`}
                type="button"
                data-dialog-target="dialog"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <RiDeleteBinLine/>
                </span>
                {/* className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${user.is_active ? 'text-green-900 bg-green-500/20' : 'text-red-900 bg-red-500/20'}`}> */}

              </button>
            </div>
            )}
          </div>
        ))}
      </div>
    {/* </div> */}
    {/* {selectedViewActivity && (
      <DetalleActividad
        activity={selectedViewActivity}
        // onClose={handleCloseModal}
        // onSave={handleEditUser}
      />
    )} */}

    {selectedActivity && (
      <EditActivity
        activity={selectedActivity}
        onClose={handleCloseModal}
        onSave={handleEditUser}
      />
    )}

    {selectedDeleteActivity && (
      <DeleteActivityModal
        activity={selectedDeleteActivity}
        onClose={handleCloseModal}
        onSave={handleEditUser}
      />
    )}
    </>
  )
}

export default Activities
