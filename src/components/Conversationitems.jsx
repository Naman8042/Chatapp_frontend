import React from 'react'
import { useNavigate } from 'react-router-dom'
import Default from '../assets/default.png'
function Conversationitems({props}) {
  var name;
  var image;
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
    image = props.users[1].imageUrl
  }
  else{
    name = props.users[0].name
    image = props.users[0].imageUrl
  }
  return (
    
     <>
     <div className='hidden sm:flex border-y-2 w-[100%] my-[0.5%] py-[2%]' onClick={()=>{navigate("chat/" , {state:{id:props._id,name:name,length:0}})}} >
      <div className='w-[20%] rounded-full '>
      <img
            alt="name"
            src={image}
            className="h-16 mx-auto object-cover rounded-full w-16"
          />
      </div>
      <div className='w-[80%] px-[3%] flex flex-col justify-center'>
      <p className='text-lg font-semibold'>{name}</p>
      <p className='text-sm'>{content}</p>
      </div>
      </div>
      <div className='flex sm:hidden border-y-2 w-[100%] my-[0.5%]' onClick={()=>{navigate("/chat" , {state:{id:props._id,name:name,length:0}})}} >
      <div className='w-[30%]'><img src={image} className='w-[100%]' alt=""/></div>
      <div className='w-[70%] px-[3%] flex flex-col justify-center'>
      <p className='text-lg font-semibold'>{name}</p>
      <p className='text-sm'>{content}</p>
      </div>
      </div>
     </>
      
    
  
  )
}

export default Conversationitems
