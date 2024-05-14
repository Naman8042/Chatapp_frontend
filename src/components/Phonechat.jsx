import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {IconButton} from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect , useState, useRef} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Messageself from './Messageself'
import Messageother from './Messageother'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import {io} from 'socket.io-client'
import Default from '../assets/default.png'
import EmojiPicker from 'emoji-picker-react'
import Emoji from '../assets/emoji.png'

const ENDPOINT = "https://chatapp-backend-hj9n.onrender.com";
var socket;
const Phonechat = () => {
    const endRef = useRef(null)
  useEffect(()=>{
   endRef.current?.scrollIntoView({behaviour:"smooth"}) 
  },[])

  const senderId = localStorage.getItem("id")
  const[open,setOpen] = useState(false)
  const[conversation,setConversation] = useState([])
  const[content,setContent] = useState()
  const[connected,setConnected] = useState(false)
  const location = useLocation();

  const id  = location.state.id;
  const name  = location.state.name;
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
    
      axios.post("https://chatapp-backend-hj9n.onrender.com/user/allmessage",{token:localStorage.getItem("token"),
      chat:id})
      .then((res)=>{setConversation(res.data)
      socket.emit("join chat",id)
      })
    
  },[conversation])
  
  useEffect(()=>{
    socket.on("message recieved",(newMessagerecieved)=>{
      console.log(newMessagerecieved)
      setConversation([...conversation],newMessagerecieved)
      setConnected(false)
    })
  })
  async function sendChat(){
    try{
     const {data} = await axios.post("https://chatapp-backend-hj9n.onrender.com/user/sendmessage",{
      token:localStorage.getItem("token"),
      chatId:id,
      content:content
     })
     setContent("")
     socket.emit("new message",data,localStorage.getItem("id"))
     
    }
    catch(err){
      console.log(err)

    }
  }
  
  
  return (
    <div className=' absolute w-[95%] py-[2%] sm:w-[30%] h-screen  p-[0.25%] flex flex-col items-center '>
    <div  className=' h-[90%] w-[100%] bg-white rounded-xl overflow-y-hidden overflow-x-hidden'>
      <div className='mb-[4%] border-b-2 flex justify-center items-center p-[1%]'>
      <div className='w-[20%]'>
      <img src={Default} className='w-full' alt="" /> 
      </div>
      <p className='w-[80%] sm:text-start p-[1%] text-2xl text-center '>{name}</p>
      </div> 
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
      <div ></div>
      </div>
      <div className='  flex bg-white  px-[1%] py-[3%] m-[3%] rounded-3xl w-full'>
        <input placeholder='Type a Message' className='w-[80%] bg-stone-100 p-[1%] rounded-xl' value={content} onChange={(e)=>setContent(e.target.value)}/>
        
        <IconButton onClick={sendChat} className=''>
            <SendIcon className='bg-stone-100 w-[7%] '/>
        </IconButton>     
      </div>
     
  </div>

      )
}

export default Phonechat
