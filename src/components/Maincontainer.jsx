import React,{useState} from 'react'
import Sidebar from './Sidebar'
import Chatarea from './Chatarea'
import Welcome from './Welcome'
import Creategroup from './Creategroup'
import Online from './Online'
import { Outlet } from 'react-router-dom'

function Maincontainer() {
  const[conversation,setConversation] =useState(
    {
        name:"text1",
        lastMessage:"Last message #1",
        timeStamp:"today",
    },
    
)
  return (
    <>
    <div className='hidden sm:flex w-[90%] bg-stone-50 h-[90%] rounded-xl '>
    <Sidebar/>
    <Outlet/>
    </div>
    <div className='block sm:hidden'>
      <Outlet/>
    </div>
    
    </>
  )
}

export default Maincontainer
