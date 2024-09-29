import React, { useState, useEffect } from 'react';
import Conversationitems from './Conversationitems';
import { IconButton } from '@mui/material';
import { HiUserAdd } from "react-icons/hi";
import { MdGroupAdd } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import SearchIcon from '@mui/icons-material/Search';
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Conversationgroup from './ConversationGroup';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
import {fetchChats} from './function'
import Phonesidebar from './Phonesidebar'

const ENDPOINT = "https://chatapp-backend-hj9n.onrender.com";
let socket;

function Sidebar() {
  const id = localStorage.getItem('id');
  const image = localStorage.getItem('image');
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [newMessageReceived, setNewMessageReceived] = useState(false);

  // Function to fetch chat list
  // const fetchChats = async () => {
  //   try {
  //     const response = await axios.post("https://chatapp-backend-hj9n.onrender.com/user/fetchchats", { token: Cookies.get("token") });
  //     return response.data;
  //   } catch (err) {
  //     console.error("Error fetching chats", err);
  //   }
  // };
  const fetchAllUsers = async()=>{
    const users = await fetchChats()
    console.log(users)
    setData(users)
  }

  useEffect(() => {
    // Fetch chats on component mount
    fetchAllUsers();

    // Initialize socket connection
    socket = io(ENDPOINT);
    socket.emit("setup", id);

    // Listen for new messages
    socket.on("message received", (newMessage) => {
      console.log("New message received in Sidebar:", newMessage);
      setNewMessageReceived(true);
    });
    socket.on("new user", () => {
      // console.log("New message received in Sidebar:", newMessage);
      // setNewMessageReceived(true);
      alert("new user")
      fetchAllUsers()
    });

    // Cleanup when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [id]);

  // Fetch chat data again when a new message is received
  useEffect(() => {
    if (newMessageReceived) {
      fetchAllUsers();
      setNewMessageReceived(false); // Reset the flag after fetching the updated data
    }
  }, [newMessageReceived]);

  const Logout = () => {
    Cookies.remove('token');
    navigate('/');
  };

  return (
    <>
    <div className='w-full sm:w-[40%] lg:w-[30%] cursor-pointer'>
      <div className='flex justify-center px-[5%] py-[3%] rounded-3xl w-full'>
        <div className='w-[40%] '>
          <img src={image} alt='' className='h-10 rounded-full w-10' />
        </div>
        <div className='flex justify-between w-[60%] '>
          <IconButton onClick={() => { navigate("addusers") }}>
            <HiUserAdd className='lg:size-6 md:size-5 sm:size-4' />
          </IconButton>
          <IconButton onClick={() => { navigate("create-groups") }}>
            <MdGroupAdd className='lg:size-6 md:size-5 sm:size-4' />
          </IconButton>
          <IconButton onClick={() => { navigate("users") }}>
            <FaPlusCircle className='lg:size-6 md:size-5 sm:size-4' />
          </IconButton>
          <IconButton>
            <MdLogout onClick={Logout} className='lg:size-6 md:size-5 sm:size-4' />
          </IconButton>
        </div>
      </div>

      <div className='bg-white flex items-center py-[1%] m-[3%] rounded-3xl'>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input
          type='text'
          placeholder='search'
          className='b-none text-bg ml-[1%] p-[1.5%] w-full rounded-3xl outline-none'
        />
      </div>

      <div className='bg-white flex overflow-y-auto scrollbar-thin scrollbar-track-gray-300 h-[72%] flex-col p-[1%] m-[3%] rounded-3xl'>
        {
          data.length>0 ?(
            
              data.map((conversation) => {
                if (conversation.isGroupChat === false) {
                  return (
                    <Conversationitems
                      key={conversation._id}
                      props={conversation}
                    />
                  );
                } else {
                  return (
                    <div key={conversation._id}>
                      <Conversationgroup props={conversation} />
                    </div>
                  );
                }
              })
            
          ):(<div className='flex items-center justify-center h-full text-xl font-semibold'>
            Start A New Chat on Clicking Add Users
          </div>)
        }
      </div>
    </div>
    <div className='sm:hidden w-screen h-dvh'>
       <Phonesidebar/>
      </div>
    </>
  );
}

export default Sidebar;
