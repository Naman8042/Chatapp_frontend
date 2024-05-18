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
    <div className='w-screen sm:hidden'>
      <Phonenavbar/>
      <div className='flex h-[10%] w-full justify-center items-center '>
      <span className='flex justify-center p-[1%] w-[50%]'><img src={Logo} alt="" className='w-[50%]'/></span>
      <p className='  text-2xl font-bold w-[50%]'>Add Users</p>
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
                <div className='flex p-[1%] gap-5 w-[100%] h-[10%] my-[1%] bg-white rounded-3xl' onClick={()=>CreateChat(user._id)}>
                <div className='w-[25%] flex justify-center '>
                <img
            alt="name"
            src={Default}
            className="h-16 mx-auto object-cover rounded-full w-16"
          />
                </div>  
                <div className='w-[75%] flex items-center'>{user.name}</div>
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
