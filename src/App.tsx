import { useState } from 'react'
import { Routes ,Route } from 'react-router-dom';
import './Globals.css';
import SigninForm from './_auth/forms/SigninForm';
import { Home } from './_root/pages';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster"

const App=() => {

  return (
    <>
     <main className='flex h-screen'>
      <Routes>
<Route element={<AuthLayout/>}>
            <Route path='/sign-in' element={<SigninForm/>}/>
      <Route path='/sign-up' element={<SignupForm/>}/>
      </Route>
      <Route element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      </Route>
      
      
      {/* index means the starting page of our route */}
      </Routes>
      <Toaster/>
     </main>
    </>
  )
}

export default App
