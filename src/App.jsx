
import React,{useState} from 'react'
import Maincontainer from './components/Maincontainer'
import Login from './components/Login'
import {Routes,Route} from 'react-router-dom'
import Welcome from './components/Welcome'
import Chatarea from './components/Chatarea'
import Online from './components/Online'
import Creategroup from './components/Creategroup'
import Adduser from './components/Adduser'
import Phonechat from './components/Phonechat'
import Signup from './components/Signup'
import Phonegroup from './components/Phonegroup'


function App() {
  const[conversation,setConversation] =useState(
    {
        name:"text1",
        lastMessage:"Last message #1",
        timeStamp:"today",
    }
  )
  return (
    <div className="w-screen  h-screen bg-stone-300 flex justify-center items-center overflow-hidden">

      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="/app" element={<Maincontainer/>}>
          <Route path="welcome" element={<Welcome/>}/>
          <Route path="chat" element={<Chatarea/>}/>
          <Route path="users" element={<Online/>}/>
          <Route path="addusers" element={<Adduser/>}/>
          <Route path="create-groups" element={<Creategroup/>}/>
        </Route>
        <Route path="/chat" element={<Phonechat/>}/>
        <Route path="/groupchat" element={<Phonegroup/>}/>
      </Routes>
      
    </div>
  )
}

export default App
