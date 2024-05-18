import { IconButton } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { IoMdSend } from "react-icons/io";
import Messageself from './Messageself';
import Messageother from './Messageother';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import Default from '../assets/default.png';
import EmojiPicker from 'emoji-picker-react';
import Emoji from '../assets/emoji.png';

const ENDPOINT = "https://chatapp-backend-hj9n.onrender.com";
var socket;
const Phonechat = () => {
  const endRef = useRef(null);
  const [conversation, setConversation] = useState([]); 

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  },[conversation]); 

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", senderId);
    socket.on("connection", () => {
      setConnected(true);
    });
  }, []);

  const senderId = localStorage.getItem("id");
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [connected, setConnected] = useState(false);
  const location = useLocation();

  const id = location.state.id;
  const name = location.state.name;
  const image = location.state.image

  useEffect(() => {
    axios.post("https://chatapp-backend-hj9n.onrender.com/user/allmessage", {
      token: localStorage.getItem("token"),
      chat: id
    })
      .then((res) => {
        setConversation(res.data);
        socket.emit("join chat", id);
      });

  }, [conversation]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      console.log(newMessageReceived);
      setConversation([...conversation, newMessageReceived]); 
      setConnected(false);
    });
  }, []);

  const handleEmoji = (e) => {
    setContent((prev) => prev + e.emoji);
  };

  async function sendChat() {
    try {
     
      const { data } = await axios.post("https://chatapp-backend-hj9n.onrender.com/user/sendmessage", {
        token: localStorage.getItem("token"),
        chatId: id,
        content: content
      });
      setContent("");
      socket.emit("new message", data, localStorage.getItem("id"));
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='relative sm:hidden w-[95%]  bg-white pb-[5%] sm:w-[30%] h-screen  p-[0.25%] flex flex-col items-center '>
      <div className='mb-[4%] absolute top-0 w-[95%] bg-white border-b-2 flex justify-center items-center p-[1%]'>
          <div className='w-[20%]'>
          <img
            alt="n"
            src={image}
            className="h-16 mx-auto object-cover rounded-full w-16"
          />
          </div>
          <p className='w-[80%] sm:text-start p-[1%] text-2xl text-center '>{name}</p>
        </div>
      <div className='absolute top-6 w-[100%] rounded-xl overflow-y-scroll overflow-x-hidden'>
      <div className='flex flex-col pt-[20%]'>
          {
            conversation
              .slice(0)
              .map((message, index) => {
                const sender = message.sender;

                if (sender && sender._id === senderId) {
                  return <Messageself props={message} key={index} />;
                }
                else {
                  return <Messageother props={message} key={index} />;
                }

              })

          }
          <div ref={endRef} />
        </div>
        
      </div>
   
        

      <div className='flex  absolute bottom-3 px-[1%] py-[3%] m-[3%] rounded-3xl w-[93%]  bg-black'>
        <input placeholder='Type a Message' className='w-[80%] outline-none bg-black text-gray-400 p-[2%] mx-[4%] rounded-xl' value={content} onChange={(e) => setContent(e.target.value)} />

        <IconButton onClick={sendChat} className='w-[20%] bg-white'>
          <IoMdSend size={30} color='white' />
        </IconButton>
      </div>
  
    </div>
  );
}

export default Phonechat;
