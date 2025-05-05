import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line, Bar } from 'react-chartjs-2';
import CardCount from '../../components/CardCount';
import CardReport from '../../components/CardReport';
import 'chart.js/auto';
import { api, apiNoAuth } from '../../Api';
import { API_URL } from '../../apiConfig';
import { AuthContext } from '../../features/auth/AuthContext';
import ButtonExcel from '../../components/ButtonExcel';

// Icon
import { Users, Calendar } from 'lucide-react';

const Report = () => {
  const [activities, setActivities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [usersCollaborators, setUsersCollaborators] = useState([]);
  const [usersEstudents, setUsersEstudents] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCollaborator, setSelectedCollaborator] = useState('');
  const [genders, setGenders] = useState([]);
  const [academicProgram, setAcademicProgram] = useState([]);
  const [dimensions, setDimensions] = useState([]);
  // const history = useNavigate();

  const { role } = useContext(AuthContext);

  const filterActivitiesByDateAndCollaborator = (activities, startDate, endDate, selectedCollaborator) => {
    let filtered = activities;
    // console.log('filtered',filtered);

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = filtered.filter(activity => {
        const activityDate = new Date(activity.date);
        return activityDate >= start && activityDate <= end;
      });
    }

    if (selectedCollaborator) {
      filtered = filtered.filter(activity =>
        activity.responsible && parseInt(activity.responsible.id) === parseInt(selectedCollaborator)
      );
    }

    return filtered;
  };

  const processData = (activities) => {
    const filteredActivities = filterActivitiesByDateAndCollaborator(
      activities,
      startDate,
      endDate,
      selectedCollaborator
    );
    // setFiltered(filteredActivities);


    const monthCounts = {};
    filteredActivities.forEach(activity => {
      const date = new Date(activity.date);
      const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });

    const monthOrder = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const sortedMonths = Object.keys(monthCounts).sort((a, b) => {
      const [monthA, yearA] = a.split(' ');
      const [monthB, yearB] = b.split(' ');
      if (yearA !== yearB) {
        return parseInt(yearA) - parseInt(yearB); // Orden por año
      }
      return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB); // Orden por mes
    });

    return {
      labels: sortedMonths,
      datasets: [
        {
          label: 'Actividades por Mes',
          data: sortedMonths.map(month => monthCounts[month]),
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  };

  const processBarData = (users) => {
    const programCounts = {};

    users.forEach(user => {
      const program = user.academic_program.name;
      if (programCounts[program]) {
        programCounts[program]++;
      } else {
        programCounts[program] = 1;
      }
    });

    const programs = Object.keys(programCounts);
    const counts = programs.map(program => programCounts[program]);

    return {
      labels: programs,
      datasets: [
        {
          label: 'Estudiantes por Programa Académico',
          data: counts,
          backgroundColor: 'rgb(232, 207, 96)',
          borderColor: 'rgb(232, 207, 96)',
          borderWidth: 2,
        },
      ],
    };
  };

  const processBarDataGender = (users) => {
    const genderCounts = {};

    users.forEach(user => {
      const gender = user.gender.name;
      if (genderCounts[gender]) {
        genderCounts[gender]++;
      } else {
        genderCounts[gender] = 1;
      }
    });

    const genders = Object.keys(genderCounts);
    // console.log('generos',genders)
    const counts = genders.map(gender => genderCounts[gender]);

    return {
      labels: genders,
      datasets: [
        {
          label: 'Estudiantes por Genero',
          data: counts,
          backgroundColor: 'rgb(55, 141, 182)',
          borderColor: 'rgb(55, 141, 182)',
          borderWidth: 2,
        },
      ],
    };
  };

  useEffect(() => {
    const token = localStorage.getItem('tokens');

    if (!token) {
      history('/auth');
      return;
    }

    // fetch('http://127.0.0.1:8000/activities/activities/', {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // })
    //   .then(response => response.json())
    //   .then(data => setActivities(data))
    //   .catch(error => console.error('Error fetching activities:', error));

    // const {data, status} = api.get(`${API_URL}activities/activities/`);
    // if (status === 200) {
    //   console.log('datos',data);
    //   setActivities(data);
    // }

    // Llamada a la función para obtener los colaboradores

    getGenders();
    getDimensions();
    getAcademicPrograms();
    getActivities();
    getUsersCollaborators();
    getUsersEstudents();
    if (role === 'Estudiante') {
      getUserStudentById();
    }
    // getUserStudentById();
  }, []);

  const getAcademicPrograms = async () => {
    try {
      const { data, status } = await apiNoAuth.get(`${API_URL}users/academic-programs/`);
      if (status === 200) {
        setAcademicProgram(data)
      } else {
        console.error('Error en la respuesta. Estado:', status);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
    }
  };

  const getDimensions = async () => {
    try {
      const { data, status } = await api.get(`${API_URL}dimension/dimension/`);
      if (status === 200) {
        setDimensions(data)
      } else {
        console.error('Error en la respuesta. Estado:', status);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
    }
  };

  const getGenders = async () => {
    try {
      const { data, status } = await api.get(`${API_URL}users/genders/`);
      if (status === 200) {
        setGenders(data)
      } else {
        console.error('Error en la respuesta. Estado:', status);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
    }
  };

  const getActivities = async () => {
    try {
      const { data, status } = await api.get(`${API_URL}activities/activities/`);
      if (status === 200) {
        console.log('datos', data);
        setActivities(data);
      } else {
        console.error('Error en la respuesta. Estado:', status);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
    }
  };

  const getUsersCollaborators = async () => {
    try {
      const { data, status } = await api.get(`${API_URL}users/create-collaborator/`);
      if (status === 200) {
        setUsersCollaborators(data);
      } else {
        console.error('Error en la respuesta. Estado:', status);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
    }
  };


  const getUsersEstudents = async () => {
    try {
      const { data, status } = await api.get(`${API_URL}users/create-student/`);
      if (status === 200) {
        setUsersEstudents(data);
      } else {
        console.error('Error en la respuesta. Estado:', status);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
    }
  };

  const getLoggedInUserId = () => {
    const token = localStorage.getItem('tokens');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // console.log('Decoded token:', payload);
      return payload.user_id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  const userId = getLoggedInUserId();
  const [accomulatedHours, setAccomulatedHours] = useState(0);
  const getUserStudentById = async () => {
    try {
      const { data, status } = await api.get(`${API_URL}users/user-student/${userId}/`);
      if (status === 200) {
        setAccomulatedHours(data.accumulated_hours);
        // console.log('User student:', data);
        return data;
      } else {
        console.error('Error en la respuesta. Estado:', status);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
    }
  };

  // console.log('Logged in user ID:', userId);

  const data = processData(activities);
  const barData = processBarData(usersEstudents);
  const barDataGender = processBarDataGender(usersEstudents);
  // console.log('barDataGender', barDataGender.datasets);

  // const counts = usersCollaborators.length;
  // console.log(counts);

  return (
    <>
      {(role === 'Administrador' || role == 'Usuario_Bienestar') && (
        // <CreateActivity/>  
        <>
          {/* <div className='flex flex-col mb-4'>
            <h1 className='font-bold text-2xl'>Reportes y Estadísticas</h1>
            <p className='text-slate-500'>Visualiza y analiza los datos del sistema</p>
          </div> */}

          <div className='flex flex-col justify-between p-4 bg-secondary-100 rounded-lg border border-slate-200'>
            <div className='flex flex-col pb-3'>
              <h2 className='font-semibold text-lg'>Filtros y Opciones</h2>
              <p className='text-slate-500'>Selecciona los filtros para personalizar tu reporte</p>
            </div>
            <div className='flex flex-row gap-3'>
              <div className='flex flex-col w-full'>
                <label className='font-semibold text-sm text-slate-700'>Rango de fechas</label>
                <select className='p-2 rounded-md border-2 border-slate-200 bg-secondary-100'>
                  <option value="option1">Última semana</option>
                  <option value="option2">Último mes</option>
                  <option value="option3">Última trimestre</option>
                  <option value="option4">Último año</option>
                  <option value="option5">Personalizado</option>
                </select>
              </div>
              <div className='flex flex-col w-full'>
                <label className='font-semibold text-sm text-slate-700'>Programa academico</label>
                <select className='p-2 rounded-md border-2 border-slate-200 bg-secondary-100'>
                  <option value="">Todos los programas</option>
                  {academicProgram.map(academicProgram => (
                    <option key={academicProgram.id} value={academicProgram.id}>
                      {academicProgram.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col w-full'>
                <label className='font-semibold text-sm text-slate-700'>Género</label>
                <select className='p-2 rounded-md border-2 border-slate-200 bg-secondary-100'>
                  <option value="">Todos los géneros</option>
                  {genders.map(gender => (
                    <option key={gender.id} value={gender.id}>
                      {gender.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col w-full'>
                <label className='font-semibold text-sm text-slate-700'>Dimension</label>
                <select className='p-2 rounded-md border-2 border-slate-200 bg-secondary-100'>
                  <option value="">Todas las dimensiones</option>
                  {dimensions.map(dimension => (
                    <option key={dimension.id} value={dimension.id}>
                      {dimension.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className='w-full md:w-1/2 mt-3'>
            <ul role="tablist" className="relative flex flex-row p-1 w-full rounded-lg bg-blue-gray-50 bg-slate-200 bg-opacity-60">
              <li role="tab"
                className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-secondary-200 cursor-pointer select-none text-blue-gray-900 ${role === 'active' ? 'bg-white rounded-md shadow-md ' : ''}`}
                onClick={() => ('active')}>
                <div className="z-20 text-inherit">
                  Activos
                </div>
              </li>
              <li role="tab"
                className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-secondary-200 cursor-pointer select-none text-blue-gray-900 ${role === 'disabled' ? 'bg-white rounded-md shadow-md' : ''}`}
                onClick={() => ('disabled')}>
                <div className="z-40 text-inherit">
                  Deshabilitados
                </div>
              </li>
              <li role="tab"
                className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-secondary-200 cursor-pointer select-none text-blue-gray-900 ${role === 'all' ? 'bg-white rounded-md shadow-md' : ''}`}
                onClick={() => ('all')}>
                <div className="z-20 text-inherit">
                  Todas
                </div>
              </li>
            </ul>
          </div>

          <div className='flex flex-row gap-4 w-auto'>
            <CardReport titulo="Total de actividades" count={activities.length} icon={<Calendar />} color={'blue'} />
            <CardReport titulo="Total de participantes" count={usersEstudents.length} icon={<Users />} color={'green'} />
          </div>

          {/* <div className='flex md:flex-row flex-col justify-center gap-6'>
            <CardCount titulo="Docentes" count={usersCollaborators.length} data={usersCollaborators} />
            <CardCount titulo="Estudiantes participantes" count={usersEstudents.length} data={usersEstudents} />
            <CardCount titulo="Total actividades" count={activities.length} data={activities} />
          </div> */}
          <div className='h-auto w-auto border rounded-xl p-2 border-spacing-3 bg-secondary-100 border-slate-600'>

            <div className='flex flex-col pt-2 px-2'>
              <div className='flex md:flex-row flex-col md:space-x-8 pb-5 border-b border-spacing-2 border-slate-300'>

                <div className='md:w-[48%]'>
                  <h2 className='font-medium'>Conteo de Estudiantes por Genero</h2>
                  <Bar data={barDataGender} />
                </div>
                <div className='md:w-[48%]'>
                  <h2 className='font-medium'>Conteo de Estudiantes por Programa Académico</h2>
                  <Bar data={barData} />
                </div>
              </div>

              <div className='w-auto pt-3'>

                <div className='space-x-3 pl-3 py-2 w-full'>
                  <label className='font-semibold' htmlFor="startDate">Fecha de Inicio:</label>
                  <input
                    className='p-1 rounded-md border-spacing-3 border border-slate-600 bg-secondary-200'
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <label className='font-semibold' htmlFor="endDate">Fecha de Fin:</label>
                  <input
                    className='p-1 rounded-md border-spacing-3 border border-slate-600 bg-secondary-200'
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <label className='font-semibold' htmlFor="collaborator">Responsable:</label>
                  <select
                    className='p-1 rounded-md border-spacing-3 border border-slate-600 bg-secondary-200'
                    id="collaborator"
                    value={selectedCollaborator}
                    onChange={(e) => setSelectedCollaborator(e.target.value)}
                  >
                    <option value="">Todos</option>
                    {usersCollaborators.map(collaborator => (
                      <option key={collaborator.id} value={collaborator.id}>
                        {collaborator.name} {collaborator.last_name}
                      </option>
                    ))}
                  </select>
                  <ButtonExcel data={filtered} />
                </div>


                <h2 className='font-medium text-center'>Actividades por Mes</h2>
                <Line className='border border-spacing-6 rounded-lg m-2' data={data} />
              </div>

            </div>

          </div>
        </>
      )}
      {(role === 'Estudiante') && (
        <>
          <div className='flex md:flex-row flex-col gap-4 md:justify-center'>

            <CardCount titulo="Total horas a cumplir" count="96" />
            <CardCount titulo="Total horas de participacion" count={accomulatedHours} />
            <CardCount titulo="Total horas pendientes" count={96 - accomulatedHours} />
          </div>
          <div className='flex justify-center'>
            <button className="mt-4 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
              escaneo de QR
            </button>
          </div>
        </>
      )}


    </>
  );
};

export default Report;
