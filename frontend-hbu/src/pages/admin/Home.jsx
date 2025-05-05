import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line, Bar } from 'react-chartjs-2';
import CardCount from '../../components/CardCount';
import CardReport from '../../components/CardReport';
import CardActivity from '../../components/CardActivity';
import 'chart.js/auto';
import { api, apiNoAuth } from '../../Api';
import { API_URL } from '../../apiConfig';
import { AuthContext } from '../../features/auth/AuthContext';
import ButtonExcel from '../../components/ButtonExcel';

// Icon
import { Users, Calendar, Activity, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [usersCollaborators, setUsersCollaborators] = useState([]);
  const [usersEstudents, setUsersEstudents] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCollaborator, setSelectedCollaborator] = useState('');
  const [academicProgram, setAcademicProgram] = useState([]);
  const [dimensions, setDimensions] = useState([]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
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

    const getActivities = async () => {
      try {
        const { data, status } = await api.get(`${API_URL}activities/activities/`);
        if (status === 200) {
          setActivities(data);
        } else {
          console.error('Error en la respuesta. Estado:', status);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error.message);
      }
    };

    getActivities();

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

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDayClick = (day) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selected);
  };

  const getActivitiesForDate = (date) => {
    return activities.filter(activity => {
      const activityDate = new Date(activity.date);
      return (
        activityDate.getFullYear() === date.getFullYear() &&
        activityDate.getMonth() === date.getMonth() &&
        activityDate.getDate() === date.getDate()
      );
    });
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // console.log('Logged in user ID:', userId);

  // const data = processData(activities);
  // const barData = processBarData(usersEstudents);
  // const barDataGender = processBarDataGender(usersEstudents);
  // console.log('barDataGender', barDataGender.datasets);

  // const counts = usersCollaborators.length;
  // console.log(counts);

  return (
    <>
      {(role === 'Administrador' || role == 'Usuario_Bienestar') && (
        // <CreateActivity/>  
        <>
          {/* <div className='flex flex-col mb-4'>
            <h1 className='font-bold text-2xl'>Dashboard</h1>
            <p className='text-slate-500'>Bienvenido de nuevo, {role}</p>
          </div> */}


          <div className='w-[30%]'>
            <ul role="tablist" className="relative flex flex-row p-1 w-full rounded-lg bg-blue-gray-50 bg-slate-200 bg-opacity-60">
              <li role="tab"
                className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-secondary-200 cursor-pointer select-none text-blue-gray-900 ${role === 'active' ? 'bg-white rounded-md shadow-md ' : ''}`}
                onClick={() => ('active')}>
                <div className="z-20 text-inherit">
                  Resumen
                </div>
              </li>
              <li role="tab"
                className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-secondary-200 cursor-pointer select-none text-blue-gray-900 ${role === 'disabled' ? 'bg-white rounded-md shadow-md' : ''}`}
                onClick={() => ('disabled')}>
                <div className="z-40 text-inherit">
                  Actividades
                </div>
              </li>
              <li role="tab"
                className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-secondary-200 cursor-pointer select-none text-blue-gray-900 ${role === 'all' ? 'bg-white rounded-md shadow-md' : ''}`}
                onClick={() => ('all')}>
                <div className="z-20 text-inherit">
                  Tareas
                </div>
              </li>
            </ul>
          </div>

          <div className='flex flex-row gap-4 w-auto'>
            <CardReport titulo="Actividades Activas" count={activities.length} icon={<Activity />} color={'blue'} />
            <CardReport titulo="Total de participantes" count={usersEstudents.length} icon={<Users />} color={'green'} />
          </div>

          <div className='flex flex-row gap-4 w-auto'>
            <div className='w-[50%] bg-white rounded-lg shadow-sm p-3 my-3 border border-slate-200'>
              <div className='flex justify-between items-center mb-4'>
                <div>
                  <h1 className='font-semibold text-2xl'>Próximas Actividades</h1>
                  <p className='text-slate-500 pb-2'>Actividades programadas para los próximos días</p>
                </div>
                <button className='flex items-center gap-2 text-blue-500 hover:text-blue-700'>
                  Ver todas
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className='flex flex-col gap-3'>
                {activities.filter(activity => activity.state === true).slice(0, 3).map((activity, index) => (
                  <CardActivity key={index} titulo={activity.name} fecha={activity.date} horas={activity.start_hour + ' ' + activity.end_hour} info={activity.responsible.name + ' ' + activity.responsible.last_name} icon={<Calendar />} color={'blue'} />
                ))}
              </div>
            </div>

            <div className='w-[50%] bg-white rounded-lg shadow-sm p-3 my-3 border border-slate-200'>
              <h1 className='font-semibold text-2xl'>Actividades Recientes</h1>
              <p className='text-slate-500 pb-2'>Actividades completadas recientemente</p>
              <div className='flex flex-col gap-3'>
                {activities.filter(activity => activity.state === false).slice(0, 3).map((activity, index) => (
                  <CardActivity key={index} titulo={activity.name} fecha={activity.date} horas={activity.start_hour + ' ' + activity.end_hour} info={activity.responsible.name + ' ' + activity.responsible.last_name} icon={<CheckCircle />} color={'green'} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-auto p-4 bg-secondary-100 rounded-md border">
            <h1 className="font-semibold text-2xl">Calendario de Actividades</h1>
            <p className="text-slate-500 pb-2">Vista mensual de actividades programadas</p>
            <div className="flex justify-between items-center mb-4">
              <button onClick={handlePrevMonth} className="p-2 bg-gray-200 rounded-full">
                <ChevronLeft />
              </button>
              <h2 className="text-lg font-semibold">
                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
              </h2>
              <button onClick={handleNextMonth} className="p-2 bg-gray-200 rounded-full">
                <ChevronRight />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day, i) => (
                <div key={i} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div key={`empty-${i}`} className="aspect-square"></div>
              ))}
              {days.map(day => {
                const hasActivity = activities.some(activity => {
                  const activityDate = new Date(activity.date);
                  return (
                    activityDate.getFullYear() === currentDate.getFullYear() &&
                    activityDate.getMonth() === currentDate.getMonth() &&
                    activityDate.getDate() === day
                  );
                });

                return (
                  <div
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`aspect-square rounded-md flex flex-col items-center justify-center p-1 text-sm cursor-pointer ${hasActivity ? "bg-blue-100" : "hover:bg-gray-100"}`}
                  >
                    <span>{day}</span>
                    {hasActivity && <div className="w-1.5 h-1.5 rounded-full mt-1 bg-blue-500"></div>}
                  </div>
                );
              })}
            </div>
          </div>

          {selectedDate && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">
                Actividades para el {selectedDate.toLocaleDateString()}
              </h2>
              <div className="flex flex-col gap-3">
                {getActivitiesForDate(selectedDate).map((activity, index) => (
                  <CardActivity
                    key={index}
                    titulo={activity.name}
                    fecha={activity.date}
                    horas={`${activity.start_hour} - ${activity.end_hour}`}
                    info={`${activity.responsible.name} ${activity.responsible.last_name}`}
                    icon={<Calendar />}
                    color="blue"
                  />
                ))}
              </div>
            </div>
          )}



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

export default Home;


// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Line, Bar } from 'react-chartjs-2';
// import CardCount from '../../components/CardCount';
// import CardReport from '../../components/CardReport';
// import CardActivity from '../../components/CardActivity';
// import 'chart.js/auto';
// import { api, apiNoAuth } from '../../Api';
// import { API_URL } from '../../apiConfig';
// import { AuthContext } from '../../features/auth/AuthContext';
// import ButtonExcel from '../../components/ButtonExcel';

// // Icon
// import { Users, Calendar, Activity, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// const Home = () => {
//   const [activities, setActivities] = useState([]);
//   const [usersEstudents, setUsersEstudents] = useState([]);
//   const [accomulatedHours, setAccomulatedHours] = useState(0);
//   const { role } = useContext(AuthContext);

//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);

//   const getDaysInMonth = (year, month) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const handlePrevMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };

//   const handleDayClick = (day) => {
//     const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
//     setSelectedDate(selected);
//   };

// const getActivitiesForDate = (date) => {
//   return activities.filter(activity => {
//     const activityDate = new Date(activity.date);
//     return (
//       activityDate.getFullYear() === date.getFullYear() &&
//       activityDate.getMonth() === date.getMonth() &&
//       activityDate.getDate() === date.getDate()
//     );
//   });
// };

//   useEffect(() => {
//     const getActivities = async () => {
//       try {
//         const { data, status } = await api.get(`${API_URL}activities/activities/`);
//         if (status === 200) {
//           setActivities(data);
//         } else {
//           console.error('Error en la respuesta. Estado:', status);
//         }
//       } catch (error) {
//         console.error('Error al realizar la solicitud:', error.message);
//       }
//     };

//     getActivities();
//   }, []);

//   const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
//   const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
//   const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

//   return (
//     <>
//       {(role === 'Administrador' || role === 'Usuario_Bienestar') && (
//         <>
//           <div className="flex flex-col mb-4">
//             <h1 className="font-bold text-2xl">Dashboard</h1>
//             <p className="text-slate-500">Bienvenido de nuevo, {role}</p>
//           </div>

// <div className="flex flex-col gap-3 w-auto p-4 bg-secondary-100 rounded-md border">
//   <h1 className="font-semibold text-2xl">Calendario de Actividades</h1>
//   <p className="text-slate-500 pb-2">Vista mensual de actividades programadas</p>
//   <div className="flex justify-between items-center mb-4">
//     <button onClick={handlePrevMonth} className="p-2 bg-gray-200 rounded-full">
//       <ChevronLeft />
//     </button>
//     <h2 className="text-lg font-semibold">
//       {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
//     </h2>
//     <button onClick={handleNextMonth} className="p-2 bg-gray-200 rounded-full">
//       <ChevronRight />
//     </button>
//   </div>
//   <div className="grid grid-cols-7 gap-1">
//     {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day, i) => (
//       <div key={i} className="text-center text-sm font-medium text-gray-500 py-2">
//         {day}
//       </div>
//     ))}
//     {Array.from({ length: firstDayOfMonth }, (_, i) => (
//       <div key={`empty-${i}`} className="aspect-square"></div>
//     ))}
//     {days.map(day => {
//       const hasActivity = activities.some(activity => {
//         const activityDate = new Date(activity.date);
//         return (
//           activityDate.getFullYear() === currentDate.getFullYear() &&
//           activityDate.getMonth() === currentDate.getMonth() &&
//           activityDate.getDate() === day
//         );
//       });

//       return (
//         <div
//           key={day}
//           onClick={() => handleDayClick(day)}
//           className={`aspect-square rounded-md flex flex-col items-center justify-center p-1 text-sm cursor-pointer ${hasActivity ? "bg-blue-100" : "hover:bg-gray-100"}`}
//         >
//           <span>{day}</span>
//           {hasActivity && <div className="w-1.5 h-1.5 rounded-full mt-1 bg-blue-500"></div>}
//         </div>
//       );
//     })}
//   </div>
// </div>

// {selectedDate && (
//   <div className="mt-4">
//     <h2 className="text-lg font-semibold">
//       Actividades para el {selectedDate.toLocaleDateString()}
//     </h2>
//     <div className="flex flex-col gap-3">
//       {getActivitiesForDate(selectedDate).map((activity, index) => (
//         <CardActivity
//           key={index}
//           titulo={activity.name}
//           fecha={activity.date}
//           horas={`${activity.start_hour} - ${activity.end_hour}`}
//           info={`${activity.responsible.name} ${activity.responsible.last_name}`}
//           icon={<Calendar />}
//           color="blue"
//         />
//       ))}
//     </div>
//   </div>
// )}
//         </>
//       )}
//     </>
//   );
// };

// export default Home;
