import React,{useEffect ,useState} from 'react'
import Logo from '../assets/Logo.png'
import SearchIcon from '@mui/icons-material/Search'
import {IconButton} from '@mui/material'
import axios from 'axios'
import Default from '../assets/default.png'
import Phonenavbar from './Phonenavbar'
function Online() {
  const[users,setUsers] = useState([])
  useEffect(()=>{
   try{
    axios.post("https://chatapp-backend-hj9n.onrender.com/user/getall",{token:localStorage.getItem("token")})
    .then((res)=>setUsers(res.data))
   }
   catch(err){

   }
  },[])
  async function CreateChat(userId){
    try{
     await axios.post("https://chatapp-backend-hj9n.onrender.com/user/accesschats",{
        userId:userId,
        token:localStorage.getItem("token")
     })
     .then((res)=>console.log(res))
    }
    catch(err){

    }
  }

  return (
    <>
    <div className='hidden sm:block w-[70%]'>
      <div className='flex h-[10%]'>
      <span className='w-[10%] p-[1%]'><img src={Logo} alt=""/></span>
      <p className='w-[90%] flex items-center text-2xl'>Add Users</p>
      </div>
      <div className=' bg-white flex items-center px-[1%] py-[1%] m-[3%] rounded-3xl'>
       <IconButton>
       <SearchIcon/> 
       </IconButton>
       <input type='text' placeholder='search'
       className='b-none text-bg ml-[1%] p-[1%]'
       />
      </div>
      <div className='text-2xl my-[2%] w-[97%] flex flex-col items-center justify-center rounded-3xl'>
        {
            users.map((user)=>(
                <div className='flex  gap-5 w-[100%] h-[10%] my-[1%] bg-white rounded-3xl' onClick={()=>CreateChat(user._id)}>
                <div className='w-[25%] flex justify-center '><img src={Default} className='w-[50%]' alt=""/></div>  
                <div className='w-[75%] flex items-center'>{user.name}</div>
                {/* <button className='w-[80%]' onClick={()=>CreateChat(user._id)}>Send Message</button> */}
                </div>
            ))
        }
      </div>
    </div>
    <div className='w-screen block sm:hidden h-screen'>
      <div className='h-[40%]'>
        <div className='h-[30%]'><Phonenavbar/></div>
        <div className='h-[80%]'>
        <div className='flex '>
       <span className='w-[50%] p-[1%]'><img src={Logo} alt="" className='w-24 h-24'/></span>
       <p className='w-[50%] flex items-center text-2xl text-start'>Add Users</p>
       </div>
       <div className=' bg-white flex items-center px-[1%] py-[1%] m-[3%] rounded-3xl'>
       <IconButton>
       <SearchIcon/> 
       </IconButton>
       <input type='text' placeholder='search'
       className='b-none text-bg ml-[1%] p-[1%]'
       />
       </div>
        </div>
      </div>
      <div className='h-[60%] flex flex-col gap-4 items-center py-[2%] overflow-y-scroll'>
      {
            users.map((user)=>(
                <div className='flex h-[20%] w-[93%] items-center bg-white rounded-xl' onClick={()=>CreateChat(user._id)}>
                <div className='w-[20%]'><img src={Default} className='h-16 mx-auto object-cover rounded-full w-16' alt=""/></div>  
                <div className='w-[80%] text-xl font-semibold text-center'>{user.name}</div>
                {/* <button className='w-[80%]' onClick={()=>CreateChat(user._id)}>Send Message</button> */}
                </div>
            ))
        }
      </div>
      </div>
 
    </>
  )
}

export default Online
