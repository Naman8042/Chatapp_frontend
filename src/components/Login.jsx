import React,{useState} from 'react'
import Logo from '../assets/Logo.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const[name,setName] = useState("");
  const[password,setPassword] = useState("")
  async function Login(){
    try{
      axios.post("https://chatapp-backend-hj9n.onrender.com/user/login",{name,password})
      .then((res)=>{localStorage.setItem("token",res.data.token)
      ,localStorage.setItem("id",res.data._id)
      navigate("/app/welcome")
    })
    }
    catch(err){
      console.log(err);
    }
  } 
  return (
    <div className='w-[90%] h-[90%] bg-white flex'>
      <div className='w-[30%] bg-gray-200 h-[100%] flex justify-center items-center'>
        <img src={Logo} alt=""/>
      </div>
      <div className='w-[70%] flex flex-col justify-center items-center'>
        <p >Login to your Account</p>
        <br/>
        <input type="text" placeholder='Enter Your Username' value={name} onChange={(e)=>setName(e.target.value)}/>
        <br/>
        <input type="password" placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={Login}>Login</button>     
      </div>
    </div>
  )
}

export default Login
