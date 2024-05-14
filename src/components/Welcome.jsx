import React from 'react'
import Logo from '../assets/Logo.png'

function Welcome() {
  return (
    <div className='hidden  w-[100%] gap-4 sm:flex flex-col justify-center items-center'>
      <img src={Logo} alt="" className='w-[50%] h-[45%]'/> 
      <p className='text-xl text-gray-500'>View and text directly to peaple present in the chat rooms</p>
    </div>
  )
}

export default Welcome
