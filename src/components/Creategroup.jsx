import React, { useState , useEffect} from 'react'
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded'
import {IconButton} from '@mui/material'
import axios from 'axios'

function Creategroup() {
  const[groupName,setGroupName] = useState("")
  const[users,setUsers] = useState([])
  const[findUsers,setFindUsers]= useState("")
  const[user,setData] = useState([])
  useEffect(()=>{
  axios.post("http://localhost:5000/user/finduser",{token:localStorage.getItem("token"),name:findUsers})
  .then((res)=>setData(res.data))
},[findUsers])
  function createGroup(){
    axios.post("http://localhost:5000/user/creategroup",{
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
    <div className='flex flex-col w-[70%] h-[100%]'>
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
  )
}

export default Creategroup
