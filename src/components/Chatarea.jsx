import React, { useEffect , useState, useRef} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {IconButton} from '@mui/material'
import Messageself from './Messageself'
import Messageother from './Messageother'
import { useLocation } from 'react-router-dom';
import { FaRegImage } from "react-icons/fa";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import axios from 'axios'
import {io} from 'socket.io-client'
import Default from '../assets/default.png'
import EmojiPicker from 'emoji-picker-react'
import Emoji from '../assets/emoji.png'
import { IoSend } from "react-icons/io5";
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux';

const ENDPOINT = "https://chatapp-backend-hj9n.onrender.com";
var socket;
function Chatarea() {
  const senderId =  localStorage.getItem('id')
  const[file,setFile] = useState(null)
  const[open,setOpen] = useState(false)
  const[conversation,setConversation] = useState([])
  const[content,setContent] = useState("")
  const[connected,setConnected] = useState(false)
  const location = useLocation();
  const endRef = useRef(null)

  useEffect(()=>{
    endRef.current?.scrollIntoView({behaviour:"smooth"}) 
  },[conversation])

  

  const id  = location.state.id;
  const name  = location.state.name;
  const users = location.state.users
  const length = location.state.length
  const image = location.state.image
  
  // console.log(users.length)
  useEffect(()=>{
    socket = io(ENDPOINT)
    socket.emit("setup",senderId)
    socket.on("connection",()=>{
      setConnected(true)
    })
  },[])
  const handleEmoji = (e)=>{
    setContent((prev)=>prev+e.emoji)
  }
  useEffect(()=>{
    
      axios.post("https://chatapp-backend-hj9n.onrender.com/user/allmessage",{token:Cookies.get("token"),
      chat:id})
      .then((res)=>{setConversation(res.data)
      socket.emit("join chat",id)
      })
    
  },[conversation])
  useEffect(()=>{
    socket.on("message recieved",(newMessagerecieved)=>{
      setConversation([...conversation],newMessagerecieved)
      setConnected(false)
    })
  })
  async function sendChat(){
    try{
     const {data} = await axios.post("https://chatapp-backend-hj9n.onrender.com/user/sendmessage",{
      token:Cookies.get("token"),
      chatId:id,
      content:content,
      file:file
     },{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
     })
     setFile(null)
     setContent("")
     socket.emit("new message",data,senderId)
     
    }
    catch(err){
      console.log(err)

    }
  }
  async function sendChatbyenter(event){
    try{
      if (event.key === 'Enter') {
      const {data} = await axios.post("https://chatapp-backend-hj9n.onrender.com/user/sendmessage",{
      token:Cookies.get("token"),
      chatId:id,
      content:content,
      file:file
      })
     setContent("")
     socket.emit("new message",data,senderId)
      }
    }
    catch(err){

    }
  }
  
  return (
    <>
    <div className='relative hidden sm:block gap-5 flex-col w-[70%] justify-center items-center m-[1%]'>
      <div className=' h-[10%] w-[100%] flex bg-white rounded-xl'>
      <div className='w-[90%] px-[3%] flex items-center'>
      <img
            alt=""
            src={image}
            className="h-16  object-cover rounded-full w-16"
          />
      <div>
      <p className='w-[90%] text-start p-[1%] text-2xl ml-2 font-bold'>{name}</p>
      <div className='flex gap-1 ml-2 '>
      {
        length>0?(
          
            users.map((user)=>(
             <div>
               {user.name},
             </div>
           ))
         
        ):(
          <div></div>
        )
      }
      
      </div>
      </div>
      </div> 
      <div className='w-[10%] flex justify-center'>
        <IconButton>
            <DeleteIcon/>
        </IconButton>
      </div>
      </div>
      <div  className=' h-[80%] w-[100%] bg-white rounded-xl p-[2%] overflow-y-scroll overflow-x-hidden'>
      {
        conversation
        .slice(0)
        .map((message,index)=>{
          const sender = message.sender ;
          
          if(sender && sender._id===senderId){
            
            return <Messageself props={message} key={index}/>
          }
          else{
          
            return <Messageother props={message} key={index}/> 
          }
          
        })
        
      }
      <div ref={endRef}/>
      </div>
      <div className=' w-full bg-whit rounded-xl flex items-center h-[10%]'>
      <div className='w-[10%] flex items-center justify-center gap-2'>
          <MdOutlineEmojiEmotions onClick={()=>setOpen((prev)=>(!prev))} className='sm:size-5 md:size-10' />
          
        <label className="cursor-pointer flex items-center justify-center  rounded-md ">
        <FaRegImage className='sm:size-5 md:size-8'/>
        <input 
          type="file" 
          className="hidden" 
          onChange={(e)=>setFile(e.target.files[0])}
        />
      </label>
          
        </div>
        <input placeholder='Type a Message' className='w-[82%] p-[1%] rounded-xl' value={content} onChange={(e)=>setContent(e.target.value)}/>
        <div className='w-[8%] h-full  rounded-full flex items-center justify-center'>
        <IconButton onClick={sendChat} onKeyDown={sendChatbyenter} >
            <IoSend  size={50} color='white' className='bg-green-500 w-full p-3 rounded-full '/>
        </IconButton>
        </div>    

      </div>
      
      
    </div>
    <div className='absolute bottom-[14%] left-[32.5%]'>
      <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
      </div>
   
    </>
  )
}

export default Chatarea