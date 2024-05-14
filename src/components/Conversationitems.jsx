import React from 'react'
import { useNavigate } from 'react-router-dom'
import Default from '../assets/default.png'
function Conversationitems({props}) {
  var name;
  var content="Start a New Chat";
  const navigate = useNavigate()
  if(props.latestMessage!==undefined){
    if(props.latestMessage.content.length<30){
      content = props.latestMessage.content
    }
    else{
      content = props.latestMessage.content.slice(0,30)
    }
    
  }
  if(localStorage.getItem("id")===props.users[0]._id){
    name = props.users[1].name
  }
  else{
    name = props.users[0].name
  }
  return (
    
     <>
     <div className='hidden sm:flex border-y-2 w-[100%] my-[0.5%]' onClick={()=>{navigate("chat" , {state:{id:props._id,name:name}})}} >
      <div className='w-[30%]'><img src={Default} className='w-[100%]' alt=""/></div>
      <div className='w-[70%] px-[3%] flex flex-col justify-center'>
      <p className='text-lg font-semibold'>{name}</p>
      <p className='text-sm'>{content}</p>
      </div>
      </div>
      <div className='flex sm:hidden border-y-2 w-[100%] my-[0.5%]' onClick={()=>{navigate("/chat" , {state:{id:props._id,name:name}})}} >
      <div className='w-[30%]'><img src={Default} className='w-[100%]' alt=""/></div>
      <div className='w-[70%] px-[3%] flex flex-col justify-center'>
      <p className='text-lg font-semibold'>{name}</p>
      <p className='text-sm'>{content}</p>
      </div>
      </div>
     </>
      
    
  
  )
}

export default Conversationitems
