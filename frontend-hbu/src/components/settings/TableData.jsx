import React, {useState} from 'react'
import PropTypes from 'prop-types'

import { ButtonAdd } from './ButtonAdd';

import { RiEdit2Line } from 'react-icons/ri';

const TableData = ({title, headers, data, endpoint, updateData}) => {

  const [searchTerm, setSearchTerm] = useState('');

  // const filteredGenders = data.filter(gender => {
  //   return gender.name.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  return (
    <>
    <div className="relative flex flex-col w-auto h-auto text-gray-700 bg-white border rounded-md bg-clip-border">
      <div className="relative mx-4 my-3 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
        <div className="flex justify-between mb-">
          <div>
            <h5
              className="block text-l antialiased font-bold leading-snug tracking-normal text-blue-gray-900">
              {title}
            </h5>
          </div>
          <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
            <ButtonAdd endpoint={endpoint} updateData={updateData}/>
          </div>
        </div>
        {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <div className="relative h-10 w-full min-w-[200px]">
              <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
              </div>
              <input
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" " />
              <label
                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Buscar
              </label>
            </div>
          </div>
        </div> */}
      </div>
      <div className=" px-0 overflow-scroll">
        <table className="w-full mt-2 text-left table-auto min-w-max">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="p-3 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    {header}
                  </p>
                </th>
              ))}
              <th className="p-3 border-y border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                  <td className="p-1 px-3 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {item.code}
                    </p>
                  </td>
                  <td className="p-1 px-3 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {item.name}
                    </p>
                  </td>
                <td className="p-1 border-b border-blue-gray-50">
                  <button
                    className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
                  <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    <RiEdit2Line className='w-4 h-4'/>
                  </span>
                    {/* <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                        className="w-4 h-4">
                        <path
                          d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                        </path>
                      </svg>
                    </span> */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          Page 1 of 10
        </p>
        <div className="flex gap-2">
          <button
            className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            Previous
          </button>
          <button
            className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            Next
          </button>
        </div>
      </div> */}
    </div>
    </>
  )
}
TableData.propTypes = {
  title: PropTypes.string.isRequired,
  headers: PropTypes.array.isRequired,
  data: PropTypes.array,
  endpoint: PropTypes.string.isRequired,
  updateData: PropTypes.func.isRequired,
}

export default TableData