import React from 'react'
import { useNavigate } from 'react-router-dom'
import Default from '../assets/default.png'
function Conversationitems({props}) {
  var name;
  var content="Start a New Chat";
  const navigate = useNavigate()
  const users = props.users
  const length = users.length
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
      <div className='hidden sm:flex bg-gray-100 rounded-xl w-[100%] my-[0.5%] py-[2%]' onClick={()=>{navigate("chat/" , {state:{id:props._id,name:name,length:0,image:image}})}} >
      <div className='w-[20%] rounded-full  '>
      <img
            
            src={Default}
            className="h-16 mx-auto object-cover rounded-full w-16"
          />
      </div>
      <div className='w-[80%] px-[3%] flex flex-col justify-center'>
      <p className='text-lg font-semibold'>{props.chatName}</p>
      <p className='text-sm'>{content}</p>
      </div>
      </div>
      <div className='flex sm:hidden bg-gray-100 rounded-xl w-[100%] my-[0.5%] items-center ' onClick={()=>{navigate("/groupchat" , {state:{id:props._id,name:props.chatName,users:users,length:length}})}} >
      <div className='w-[30%]'><img src={Default} className='w-[100%]' alt=""/></div>
      <div className='w-[70%] px-[3%]'>
      <p className='text-lg font-semibold'>{props.chatName}</p>
      <p className='text-sm'>{content}</p>
      </div>
      </div>
      
      </>
    
  
  )
}

export default Conversationitems
