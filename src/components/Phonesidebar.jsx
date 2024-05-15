import React,{useState,useEffect} from 'react'
import Conversationitems from './Conversationitems';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {IconButton} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LightModeIcon from '@mui/icons-material/LightMode'
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
    <div className=' w-full sm:w-[30%]'>
      <div className='flex justify-center bg-white px-[1%] py-[3%] m-[3%] rounded-3xl'>
        <div className='w-[30%]'>
        <IconButton>
        <AccountCircleIcon/>
        </IconButton>
        </div>
        <div className='flex justify-center w-[70%]'>
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
        <LightModeIcon/>
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
      <div className=' bg-white flex h-[72%] flex-col px-[1%] py-[3%] m-[3%] rounded-3xl'>
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
