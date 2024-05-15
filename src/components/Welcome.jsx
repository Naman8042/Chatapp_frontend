import React from 'react'
import Logo from '../assets/Logo.png'
import Phonesidebar from './Phonesidebar'

function Welcome() {
  return (
    <div className='w-full'>
      <div className='hidden  gap-4 sm:flex flex-col justify-center items-center h-full w-full'>
      <img src={Logo} alt="" className='w-[50%] h-[45%]'/> 
      <p className='text-xl text-gray-500'>View and text directly to peaple present in the chat rooms</p>
      </div>
      <div className='sm:hidden w-screen h-screen'>
       <Phonesidebar/>
      </div>
    </div>
  )
}

export default Welcome
