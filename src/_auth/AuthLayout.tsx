import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
const AuthLayout = () => {
  const isauth = false;
  return (
    <>
    {isauth? (<Navigate to="/"/>):
    (
    <>
    <section className='flex flex-1 justify-center items-center flex-col py-10'>
      
      <Outlet/>
      </section>
      <img src="/public/assets/images/up.jpg" alt="logo" className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat' />
      </>)
      }
    </>
  )
}

export default AuthLayout