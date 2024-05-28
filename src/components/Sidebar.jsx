import React,{useState,useEffect} from 'react'
import Conversationitems from './Conversationitems';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {IconButton} from '@mui/material'
import { HiUserAdd } from "react-icons/hi";
import { MdGroupAdd } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import SearchIcon from '@mui/icons-material/Search';
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios'
import Conversationgroup from './ConversationGroup'
import Cookies from 'js-cookie'

function Sidebar() {
    const id = localStorage.getItem('id')
    const image = localStorage.getItem('image')

    const navigate = useNavigate()
    const[data,setData] = useState([]);
    useEffect(()=>{
    async function get(){
    await axios.post("https://chatapp-backend-hj9n.onrender.com/user/fetchchats",{token :Cookies.get("token")})
    .then((res)=>setData(res.data))
    }
    get()
    },[data])
    function Logout(){
      Cookies.remove('token')
      navigate('/')
    }
  return (
    <div className=' w-full sm:w-[40%] lg:w-[30%] cursor-pointer'>
      <div className='flex justify-center  px-[5%] py-[3%]  rounded-3xl w-full'>
        <div className='w-[40%] '>
        <img src={image} alt='' className='h-10  object-cover rounded-full w-10'/>
        </div>
        <div className='flex justify-between w-[60%] '>
        <IconButton onClick={()=>{navigate("addusers")}}>
        <HiUserAdd className='lg:size-6 md:size-5 sm:size-4'/>
        </IconButton>
        <IconButton onClick={()=>{navigate("create-groups")}}>
        <MdGroupAdd className='lg:size-6 md:size-5 sm:size-4'/>
        </IconButton>
        <IconButton onClick={()=>{navigate("users")}}>
        <FaPlusCircle className='lg:size-6 md:size-5 sm:size-4'/>
        </IconButton>
        <IconButton>
        <MdLogout onClick={Logout} className='lg:size-6 md:size-5 sm:size-4'/>
        </IconButton>
        </div>
       </div>
      <div className=' bg-white flex items-center py-[1%] m-[3%] rounded-3xl'>
       <IconButton>
       <SearchIcon/> 
       </IconButton>
       <input type='text' placeholder='search'
       className='b-none text-bg ml-[1%] p-[1.5%] w-full rounded-3xl outline-none'
       />
      </div>
      <div className=' bg-white flex overflow-y-auto scrollbar-thin  scrollbar-track-gray-300 h-[72%] flex-col  p-[1%] m-[3%] rounded-3xl'>
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
