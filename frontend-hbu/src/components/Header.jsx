import React, { useContext } from 'react'

import { AuthContext } from '../features/auth/AuthContext';
import { HeaderContext } from './context/HeaderContext';

// Icons
import { RiArrowDownSLine } from "react-icons/ri";

const Header = () => {

  const { role, fullName } = useContext(AuthContext);
  const { headerInfo } = useContext(HeaderContext);

  return (
    <div className='flex items-center justify-between h-[7vh] md:h-[10vh] border-b border-b-secondary-200 px-4 gap-3'>
      <div className='flex flex-col'>
        <h1 className='font-bold text-2xl'>{headerInfo.title}</h1>
        <p className='text-slate-500'>{headerInfo.description}</p>
      </div>
      <div className='flex items-center justify-between gap-3'>
        <div className="">
          <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
            alt="John Michael" className="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
        </div>
        <div className='flex flex-col'>
          <p>{fullName}</p>
          <p className='text-gray-400 pt-0 text-right'>{role}</p>
        </div>
        <RiArrowDownSLine />
      </div>
    </div>
  );
}

export default Header