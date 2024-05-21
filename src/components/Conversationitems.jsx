import React from 'react'
import { useNavigate } from 'react-router-dom'
import Default from '../assets/default.png'
import { useSelector } from 'react-redux'
function Conversationitems({props}) {
  const id = localStorage.getItem('id')
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
  if(id===props.users[0]._id){
    name = props.users[1].name
    image = props.users[1].imageUrl
  }
  else{
    name = props.users[0].name
    image = props.users[0].imageUrl
  }
  return (
    
     <>
     <div className='hidden sm:flex bg-gray-100 rounded-xl w-[100%] my-[0.5%] py-[2%]' onClick={()=>{navigate("chat/" , {state:{id:props._id,name:name,length:0,image:image}})}} >
      <div className='w-[20%] rounded-full  '>
      <img
            
            src={image}
            className="md:h-16 mx-auto object-cover rounded-full sm:w-12 sm:h-12 md:w-16"
          />
      </div>
      <div className='w-[80%] px-[3%] flex flex-col justify-center'>
      <p className='text-lg font-semibold'>{name}</p>
      <p className='text-sm'>{content}</p>
      </div>
      </div>
      <div className='flex sm:hidden bg-gray-100 rounded-xl  w-[100%] my-[0.5%]' onClick={()=>{navigate("/chat" , {state:{id:props._id,name:name,length:0,image:image}})}} >
      <div className='p-1 w-[30%]'>
      <img
            alt="n"
            src={image}
            className="h-16 mx-auto object-cover rounded-full w-16"
          />
      </div>
      <div className='w-[70%] px-[3%] flex flex-col justify-center'>
      <p className='text-lg font-semibold'>{name}</p>
      <p className='text-sm'>{content}</p>
      </div>
      </div>
     </>
      
    
  
  )
}

export default Conversationitems
