import React, { useEffect , useState, useRef} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {IconButton} from '@mui/material'
import Messageself from './Messageself'
import Messageother from './Messageother'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import {io} from 'socket.io-client'
import Default from '../assets/default.png'
import EmojiPicker from 'emoji-picker-react'
import Emoji from '../assets/emoji.png'

const ENDPOINT = "http://localhost:5000";
var socket;
function Chatarea() {

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
    
      axios.post("http://localhost:5000/user/allmessage",{token:localStorage.getItem("token"),
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
     const {data} = await axios.post("http://localhost:5000/user/sendmessage",{
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
    <div className='flex gap-5 flex-col w-[70%] justify-center items-center m-[1%]'>
      <div className=' h-[10%] w-[100%] flex bg-white rounded-xl'>
      <div className='w-[90%] px-[3%] flex'>
      <img src={Default} className='w-[10%]' alt=""/> 
      <p className='w-[90%] text-start p-[1%] text-2xl'>{name}</p>
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
      <div ></div>
      </div>
      <div className=' h-[10%] w-[100%] bg-white rounded-xl flex '>
        <input placeholder='Type a Message' className='w-[95%] bg-stone-100 p-[1%] rounded-xl' value={content} onChange={(e)=>setContent(e.target.value)}/>
        <div>
          <img src={Emoji} alt="" className='w-[10%]' onClick={()=>setOpen((prev)=>(!prev))}/>
          <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
        </div>
        <IconButton onClick={sendChat} className=''>
            <SendIcon className='bg-stone-100 w-[5%] '/>
        </IconButton>     
      </div>
    </div>
  )
}

export default Chatarea