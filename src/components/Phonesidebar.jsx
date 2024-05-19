import React,{useState,useEffect} from 'react'
import Conversationitems from './Conversationitems';
import { FaUserCircle } from "react-icons/fa";
import {IconButton} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { MdLogout } from "react-icons/md";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Conversationgroup from './ConversationGroup'

function Sidebar() {
    const navigate = useNavigate()
    const[data,setData] = useState([]);
    useEffect(()=>{
    async function get(){
    await axios.post("https://chatapp-backend-hj9n.onrender.com/user/fetchchats",{token :localStorage.getItem("token")})
    .then((res)=>setData(res.data))
    }
    get()
    },[data])
  return (
    <div className='h-screen  w-full sm:w-[30%] overflow-hidden'>
      <div className='flex justify-center bg-white px-[5%] py-[3%] m-[3%] rounded-3xl '>
        <div className='w-[40%]'>
        <IconButton>
        <FaUserCircle size={30}/>
        </IconButton>
        </div>
        <div className='flex justify-between w-[60%]'>
        <IconButton onClick={()=>{navigate("/app/addusers")}}>
        <PersonAddIcon/>
        </IconButton>
        <IconButton onClick={()=>{navigate("/app/create-groups")}}>
        <GroupAddIcon/>
        </IconButton>
        <IconButton onClick={()=>{navigate("/app/users")}}>
        <AddCircleIcon/>
        </IconButton>
        <IconButton>
        < MdLogout/>
        </IconButton>
        </div>
       </div>
      <div className=' bg-white flex items-center px-[1%] py-[3%] m-[3%] rounded-3xl'>
       <IconButton>
       <SearchIcon/> 
       </IconButton>
       <input type='text' placeholder='search'
       className='b-none text-bg ml-[1%] p-[1%]'
       />
      </div>
      <div className=' bg-white flex h-[73%] overflow-y-scroll flex-col px-[1%] py-[3%] m-[3%] rounded-3xl'>
        {
            data.map((conversation)=>{
              if(conversation.isGroupChat===false){
                return (
                    
                  <Conversationitems
                   
                   props={conversation}
                  
                   />
              
              )
              }
              else{
                return(
                  <div >
                  <Conversationgroup props={conversation}/>
                  </div>
                )
              }
             })
        }
      </div>
    </div>
  )
}

export default Sidebar
