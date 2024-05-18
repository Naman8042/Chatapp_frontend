import React,{useState} from 'react'
import {IconButton} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LightModeIcon from '@mui/icons-material/LightMode'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Phonenavbar = () => {
  const navigate = useNavigate()
  const[data,setData] = useState([]);
  return (
    <div className='fixed top-1 w-full flex  flex-col items-center'>
      <div className='flex justify-center items-center bg-white px-[2%] py-[3%] rounded-3xl w-[95%]'>
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
      {/* <div className=' bg-white flex items-center px-[1%] py-[3%] my-[3%] w-[95%] rounded-3xl'>
       <IconButton>
       <SearchIcon/> 
       </IconButton>
       <input type='text' placeholder='search'
       className='b-none text-bg ml-[1%] p-[1%]'
       />
      </div> */}
    </div>
  )
}

export default Phonenavbar
