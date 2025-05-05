import PropTypes from 'prop-types'


const CardReport = ({ titulo, count, icon, color }) => {
  // const rol = localStorage.getItem('role');

  return (
    <div className="flex flex-row gap-4 items-center rounded-lg bg-white w-[30%] p-3 my-3 border">
        <div>
          <div className=' bg-blue-100 p-2 rounded-md' style={{ fontSize: 44, color: color }}>
            {icon}
          </div>
        </div>
        <div className='flex flex-col'>
          {/* <div className="text-slate-800 border-slate-200"> */}
            <p className="text-sm font-semibold text-slate-500">
              {titulo}
            </p>
            <h1 className="font-bold text-slate-800 text-3xl">
              {count}
            </h1>
        </div>
    </div> 
  )
}
CardReport.propTypes = {
  titulo: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  icon: PropTypes.element,
  color: PropTypes.string,
  // data: PropTypes.array,
}

export default CardReport