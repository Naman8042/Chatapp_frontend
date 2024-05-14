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
    <div className='w-[90%] bg-stone-50 h-[90%] flex'>
    <Sidebar/>
    <Outlet/>
    {/* <Chatarea props={conversation}/> */}
    {/* <Welcome/> */}
    {/* <Creategroup/> */}
    {/* <Online/> */}
    </div>
  )
}

export default Maincontainer
