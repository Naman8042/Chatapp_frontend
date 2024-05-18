import React, { useState , useEffect} from 'react'
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded'
import {IconButton} from '@mui/material'
import axios from 'axios'
import Phonenavbar from './Phonenavbar'

function Creategroup() {
  const[groupName,setGroupName] = useState("")
  const[users,setUsers] = useState([])
  const[findUsers,setFindUsers]= useState("")
  const[user,setData] = useState([])
  useEffect(()=>{
  axios.post("https://chatapp-backend-hj9n.onrender.com/user/finduser",{token:localStorage.getItem("token"),name:findUsers})
  .then((res)=>setData(res.data))
},[findUsers])
  function createGroup(){
    axios.post("https://chatapp-backend-hj9n.onrender.com/user/creategroup",{
      token:localStorage.getItem("token"),
      users:users,
      name:groupName
    })
    .then((res)=>console.log(res.data))
    setUsers([])
  }
  function Adduser(id){
   if(users.includes(id)){
    alert("user already addes")
   }
   else{
    setUsers([...users,id])
    console.log(users)
   }
  }
  
  return (
    <>
    <div className='hidden sm:flex flex-col w-[70%] h-[100%]'>
    <div className='w-[100%] h-[50%] flex flex-col gap-3 justify-end items-center'>
      <input placeholder='Enter Group Name' className='p-[1%] rounded-xl w-[60%]' value={groupName} onChange={(e)=>setGroupName(e.target.value)}/>
      <input placeholder='Search Users'className='p-[1%] rounded-xl w-[60%]' value={findUsers} onChange={(e)=>setFindUsers(e.target.value)}/>
      
    </div>
    <div className='flex flex-col justify-center items-center gap-4 m-[1%]'>
      {
        user.length>0?(
          user.map((users)=>(
            <div className='w-[60%] text-center text-xl bg-stone-100 p-[1%] rounded-xl' onClick={()=>Adduser(users._id)}>{users.name}</div>
          ))
        ):(
          <div>
            No user found
          </div>
        )
      } 
    </div>
    <button onClick={createGroup}>Create Group</button>
    </div>
    <div className='block sm:hidden w-screen h-screen'>
      <div className='h-[10%] '><Phonenavbar/></div>
      <div className=' flex flex-col w-[100%] h-[80%] p-[2%]'>
      <div className='w-[100%] h-[30%] flex flex-col gap-3 justify-center items-center '>
      <input placeholder='Enter Group Name' className='p-[2%] rounded-2xl w-[80%]' value={groupName} onChange={(e)=>setGroupName(e.target.value)}/>
      <input placeholder='Search Users'className='p-[2%] rounded-2xl w-[60%] w-[80%]' value={findUsers} onChange={(e)=>setFindUsers(e.target.value)}/>
      </div>
      <div className=' py-[5%] h-[70%] flex flex-col justify-center items-center gap-6  my-[5%] overflow-y-scroll'>
      {
        user.length>0?(
          user.map((users)=>(
            <div className='bg-white w-full py-[2%] text-center rounded-xl font-semibold text-xl' onClick={()=>Adduser(users._id)}>{users.name}</div>
          ))
        ):(
          <div>
            No user found
          </div>
        )
      } 
    </div>
    </div>
    <div className='flex justify-center h-[10%]'>
    <button className='bg-black text-white m-[3%] px-[2%] rounded-xl' onClick={createGroup}>Create Group</button>
    </div>
    </div>
    </>
  )
}

export default Creategroup
