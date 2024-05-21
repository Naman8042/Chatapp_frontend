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
import Phonenavbar from './Phonenavbar';
import Cookies from 'js-cookie'

function Sidebar() {
    const navigate = useNavigate()
    const[data,setData] = useState([]);
    useEffect(()=>{
    async function get(){
    await axios.post("https://chatapp-backend-hj9n.onrender.com/user/fetchchats",{token :Cookies.get("token")})
    .then((res)=>setData(res.data))
    }
    get()
    },[data])
  return (
    <div className='h-screen overflow-x-hidden overflow-y-hidden py-[2%] px-[2%]'>
      <div className='h-[15%] overflow-x-hidden flex justify-center'>
      <Phonenavbar/> 
      </div>
      <div className=' bg-white flex items-center p-[1%]  m-[3%] rounded-3xl h-[10%] overflow-x-hidden'>
       <IconButton>
       <SearchIcon/> 
       </IconButton>
       <input type='text' placeholder='search'
       className='b-none text-bg ml-[1%] p-[1%]'
       />
      </div>
      <div className=' bg-white flex h-[72%] overflow-y-auto overflow-x-hidden flex-col  p-[1%]   rounded-3xl'>
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
