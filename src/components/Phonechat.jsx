import { IconButton } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { IoMdSend } from "react-icons/io";
import Messageself from './Messageself';
import Messageother from './Messageother';
import { FaRegImage } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { MdOutlineEmojiEmotions } from "react-icons/md";
import axios from 'axios';
import { io } from 'socket.io-client';
import Default from '../assets/default.png';
import EmojiPicker from 'emoji-picker-react';
import Emoji from '../assets/emoji.png';
import Cookies from 'js-cookie'

const ENDPOINT = "https://chatapp-backend-hj9n.onrender.com";
var socket;
const Phonechat = () => {
  const endRef = useRef(null);
  const[file,setFile] = useState(null)
  const [conversation, setConversation] = useState([]); 
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  },[conversation]); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file)
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", senderId);
    socket.on("connection", () => {
      setConnected(true);
    });
  }, []);

  const senderId = localStorage.getItem("id");
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [connected, setConnected] = useState(false);
  const location = useLocation();

  const id = location.state.id;
  const name = location.state.name;
  const image = location.state.image

  useEffect(() => {
    axios.post("https://chatapp-backend-hj9n.onrender.com/user/allmessage", {
      token: Cookies.get("token"),
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
        token:Cookies.get("token"),
      chatId:id,
      content:content,
      file:file
     },{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      });
      setContent("");
      setSelectedImage(null)
      setFile(null)
      socket.emit("new message", data, localStorage.getItem("id"));
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='relative h-screen w-full  overflow-hidden bg-white'>
      <div className='h-[10%] fixed top-0 w-full bg-gray-100 '>
      <div className='h-full flex justify-center items-center '>
          <img
            alt="n"
            src={image}
            className="h-16 mx-auto object-cover rounded-full w-16 p-[1%]"
          />
          <p className='w-[80%] sm:text-start p-[1%] text-2xl text-center '>{name}</p>
      </div>
      </div>
      <div className='h-[80%] flex flex-col overflow-y-auto mt-[15%]   py-[5%]'>
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
      <div className='absolute bottom-3 flex  p-[1%] m-[3%] rounded-3xl w-[93%]  bg-black'>
      <div className='w-[20%] flex items-center justify-center gap-1'>
          <MdOutlineEmojiEmotions onClick={()=>setOpen((prev)=>(!prev))} size={20} color='white' />
          <label className="cursor-pointer flex items-center justify-center  rounded-md ">
        <FaRegImage  color='white' size={20}/>
        <input 
          type="file" 
          className="hidden" 
          onChange={handleFileChange}
        />
      </label>
      </div>
      <input placeholder='Type a Message' className='w-[65%] outline-none bg-black text-gray-400 p-[2%] mx-[4%] rounded-xl' value={content} onChange={(e) => setContent(e.target.value)} />

      <IconButton onClick={sendChat} className='w-[15%] bg-white'>
      <IoMdSend size={30} color='white' />
      </IconButton>
      </div>
      {
      selectedImage && 
      <div className='absolute bottom-[13%] border-8 w-full bg-white  flex items-center justify-center'>

      <img src={selectedImage} alt='' className='h-64 w-64'/>
      </div>
     }
 
      <div className='absolute bottom-20 left-5'>
      <EmojiPicker open={open} onEmojiClick={handleEmoji} width={300}/>
      </div>  
    </div>
  );
}

export default Phonechat;


