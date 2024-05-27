import React,{useState} from 'react'
import Logo from '../assets/Logo.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import User from '../assets/user.png'
function Login() {
  const navigate = useNavigate()
  const[file,setFile] = useState(null)
  const[name,setName] = useState("");
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  async function Login(){
    try{
      axios.post("https://chatapp-backend-hj9n.onrender.com/user/signup",{name,password,email,file},{
        headers: {
          'Content-Type': 'multipart/form-data'
        }})
      setFile(null)
      navigate("/")
    }
    
    catch(err){
      console.log(err);
    }
  } 
  return (
    <div className='w-[90%] h-[90%] bg-white flex flex-col sm:flex-row'>
      <div className='hidden w-[30%] sm:block bg-gray-200 h-[100%]  justify-center items-center'>
        <img src={Logo} alt=""/>
      </div>
      <div className=' w-[100%] sm:w-[70%] flex flex-col justify-center items-center h-screen '>
        <img src={Logo} alt="" className='sm:hidden w-48 mb-[10%]'/>
        <p className='w-full text-center font-bold text-xl md:text-2xl'>Signup to your Account</p>
        <br/>
        <label>
        {/* <img src={User} alt='' className=''/>   */}
        
        <FaRegUserCircle size={100} color='gray'/> 
      
        <input type='file' className='border-2 hidden' onChange={(e)=>setFile(e.target.files[0])} />
        <p className='text-lg font-semibold mt-[5%]'>Choose A Photo</p>
        </label>
        <br/>
        <input type="text" placeholder='Enter Your Username' value={name} onChange={(e)=>setName(e.target.value)} className='px-[2%] py-[1%] border-2 rounded-md'/>
        <br/>
        <input type="text" placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='px-[2%] py-[1%] border-2 rounded-md'/>
        <br/>
        <input type="password" placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='px-[2%] py-[1%] border-2 rounded-md'/>
        <div className='w-full flex items-center justify-center my-[5%] sm:my-[2%]'>
        <button onClick={Login} className='bg-black rounded-md text-white py-[1%] px-[5%]'>Signup</button> 
        </div>
          
      </div>
    </div>
  )
}

export default Login
