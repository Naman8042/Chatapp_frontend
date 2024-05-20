import React,{useState} from 'react'
import Logo from '../assets/Logo.png'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const[name,setName] = useState("");
  const[password,setPassword] = useState("")
  async function Login(){
    try{
      axios.post("https://chatapp-backend-hj9n.onrender.com/user/login",{name,password})
      .then((res)=>{
      console.log(res)  
      localStorage.setItem("token",res.data.token)
      ,localStorage.setItem("id",res.data._id)
      ,localStorage.setItem("image",res.data.imageUrl)
      navigate("/app/welcome")
    })
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
        <p className='w-full text-center font-bold text-xl md:text-2xl'>Login to your Account</p>
        <br/>
        <input type="text" placeholder='Enter Your Username' value={name} onChange={(e)=>setName(e.target.value)} className='px-[2%] py-[1%] border-2 rounded-md'/>
        <br/>
        <input type="password" placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='px-[2%] py-[1%] border-2 rounded-md'/>
        <div className='w-full flex items-center justify-center my-[5%] sm:my-[2%]'>
        <button onClick={Login} className='bg-black rounded-md text-white py-[1%] px-[5%]'>Login</button> 
        </div>   
        <div className='flex gap-2'>
        <p className='text-gray-500'>Dont' have an Account yet?</p>
        <Link to="/signup" className='font-bold'>Sign Up</Link> 
        </div>  
      </div>
    </div>
  )
}

export default Login
