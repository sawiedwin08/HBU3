import PropTypes from 'prop-types'


const CardActivity = ({ titulo, fecha, horas, info, icon, color }) => {
  // const rol = localStorage.getItem('role');

  const formatFecha = (fecha) => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  return (
    <div className="flex flex-ro gap-4 items-center rounded-lg bg-white w-full px-3 py-2 border">
        <div>
          <div className=' bg-blue-100 p-2 rounded-md' style={{ fontSize: 44, color: color }}>
            {icon}
          </div>
        </div>
        <div className='flex flex-col'>
            <h1 className="text-md font-bold pb-2 text-slate-800">
              {titulo}
            </h1>
            <p className="text-slate-500">
              {formatFecha(fecha)} {horas} 
            </p>
            <p className="text-slate-500">
              {info}
            </p>
        </div>
    </div> 
  );
}
CardActivity.propTypes = {
  titulo: PropTypes.string.isRequired,
  fecha: PropTypes.string,
  horas: PropTypes.string,
  info: PropTypes.string,
  icon: PropTypes.element,
  color: PropTypes.string,
  // data: PropTypes.array,
}

export default CardActivity