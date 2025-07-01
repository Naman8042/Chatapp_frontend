
import Logo from '../assets/Logo.png'

function Welcome() {
  
  
  return (
      <div className='sm:w-[60%] lg:w-[70%] m-[1%]'>
      <div className='hidden  gap-4 sm:flex flex-col justify-center items-center h-full w-full'>
      <img src={Logo} alt="" className='w-[50%] h-[45%]'/> 
      <p className='sm:text-sm md:text-lg lg:text-xl text-gray-500'>View and text directly to peaple present in the chat rooms</p>
      </div>
      
    </div>
  )
}

export default Welcome