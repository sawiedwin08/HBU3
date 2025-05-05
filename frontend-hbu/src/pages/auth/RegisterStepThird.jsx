// import React from 'react'
// import { Link } from 'react-router-dom';
// // Icons
// import { RiUserLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiMailLine } from "react-icons/ri";

// // image
// import ImageLogin from '../../assets/images/imagenLogin.png'

// const RegisterStepThird = () => {
//   return (
//     <div className='flex flex-row bg-secondary-200 justify-center items-center'>
//       <div className="lg:w-[45%]">
//         <img
//           src={ImageLogin}
//           alt="Universidad Cooperativa de Colombia"
//           className="object-cover w-full h-full"
//         />
//       </div>
//       <div className='bg-secondary-200 lg:mx-44 p-8 rounded-xl shadow-2xl w-auto lg:w-[55%]'>
//         <h1 className='text-2xl uppercase font-bold tracking-[2px] mb-8 text-center'>Crear cuenta en HBU</h1>
//         <h1 className='text-xl font-bold text-center mb-8'>Complete sus datos</h1>
//         <form className='mb-2'>
//           <div className="relative mb-4">
//             <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2"/>
//             <input type="text" className='py-2 pl-8 pr-4 w-full bg-secondary-100 outline-none rounded-lg'
//             placeholder='Tipo de documento' />
//           </div>
//           <div className="relative mb-4">
//             <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2"/>
//             <input type="text" className='py-2 pl-8 pr-4 w-full bg-secondary-100 outline-none rounded-lg'
//             placeholder='Numero de documento' />
//           </div>
//           <div className="relative mb-4">
//             <RiMailLine  className="absolute top-1/2 -translate-y-1/2 left-2"/>
//             <input type="text" className='py-2 pl-8 pr-4 w-full bg-secondary-100 outline-none rounded-lg'
//             placeholder='Genero' />
//           </div>
//           <div className="relative mb-4">
//             <RiMailLine  className="absolute top-1/2 -translate-y-1/2 left-2"/>
//             <input type="text" className='py-2 pl-8 pr-4 w-full bg-secondary-100 outline-none rounded-lg'
//             placeholder='Programa academico' />
//           </div>
//           {/* crear dropdown */}
//           <div className="relative">
//             <RiMailLine  className="absolute top-1/2 -translate-y-1/2 left-2"/>
//             <input type="number" className='py-2 pl-8 pr-2 w-full bg-secondary-100 outline-none rounded-lg'
//             placeholder='Semestre' />
//           </div>
//           <div className='mt-4'>
//             <button type='submit' className='bg-primary w-full py-2 px-4 text-white rounded-lg'>
//               <Link to="/auth">
//                 Crear cuenta
//               </Link>
//             </button>
//           </div>
//         </form>
//         <p className="mt-8 text-center">
//           ¿Tienes una cuenta?
//           <Link to="/auth" className="text-primary px-2 hover:underline">
//             Iniciar sesión
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default RegisterStepThird

import React from 'react'

const RegisterStepThird = () => {
  return (
    <div>Su cuenta ha sido activada correctamente</div>
  )
}

export default RegisterStepThird