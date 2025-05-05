import React from 'react'
import PropTypes from 'prop-types'
import ButtonExcel from './ButtonExcel'

const CardCount = ({ titulo, count, data }) => {
  const rol = localStorage.getItem('role');
  return (
    <div className="flex flex-col rounded-lg bg-white shadow-sm max-w-96 p-3 my-3 border border-slate-200">
        <div className="pb-4 m-0 text-center text-slate-800 border-b border-slate-200">
            <p className="text-sm uppercase font-semibold text-slate-500">
            {titulo}
            </p>
            <h1 className="flex justify-center gap-1 mt-4 font-bold text-slate-800 text-5xl">
            {count}
            </h1>
        </div>
        {rol === 'Administrador' && (
          <div className='flex bg-secondary-100 justify-end'>
          <ButtonExcel data={data}/>
        </div>
        )}
        <div className='flex bg-secondary-100 justify-end'>
          <ButtonExcel data={data}/>
        </div>
        {/* <div className="p-0 mt-12">
            <button className="min-w-32 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            Buy Now
            </button>
        </div> */}
    </div> 
  )
}
CardCount.propTypes = {
  titulo: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  data: PropTypes.array,
}

export default CardCount