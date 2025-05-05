import React from 'react'
import { Outlet } from 'react-router-dom'
import { HeaderProvider } from '../components/context/HeaderContext';
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const LayoutAdmin = () => {
  return (
    <HeaderProvider>
      <div className='min-h-screen grid grid-cols-1 xl:grid-cols-6'>
        <Sidebar/>
        <div className='xl:col-span-5'>
          <Header/>
          <div className='h-[90vh] overflow-y-scroll p-8 bg-secondary-200'>
            <Outlet/>
          </div>
        </div>
      </div>
    </HeaderProvider>
  )
}

export default LayoutAdmin