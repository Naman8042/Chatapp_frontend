import React, { useEffect, useState, useRef } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IoSend } from 'react-icons/io5';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import Messageself from './Messageself';
import Messageother from './Messageother';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';

const ENDPOINT = "https://chatapp-backend-hj9n.onrender.com";
let socket;

function Chatarea() {
  const senderId = localStorage.getItem("id");
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [content, setContent] = useState("");
  const [connected, setConnected] = useState(false);
  const location = useLocation();
  const endRef = useRef(null);

  const id = location.state.id;
  const name = location.state.name;
  const users = location.state.users;
  const length = location.state.length;
  const image = location.state.image;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", senderId);
    socket.on("connection", () => {
      setConnected(true);
    });
  }, [senderId]);

  const handleEmoji = (e) => {
    setContent((prev) => prev + e.emoji);
  };

  useEffect(() => {
    axios.post("https://chatapp-backend-hj9n.onrender.com/user/allmessage", {
      token: localStorage.getItem("token"),
      chat: id
    })
    .then((res) => {
      setConversation(res.data);
      socket.emit("join chat", id);
    });
  }, [id]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      setConversation([...conversation, newMessageReceived]);
      setConnected(false);
    });
  }, [conversation]);

  const sendChat = async () => {
    try {
      
      const { data } = await axios.post("https://chatapp-backend-hj9n.onrender.com/user/sendmessage",{
        token:localStorage.getItem("token"),
        chatId:id,
        content:content,
        file:file
       }, {
      headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res)=>console.log(res))
      
      setContent("");
      setFile(null); 
      socket.emit("new message", data, localStorage.getItem("id"));
    } catch (err) {
      console.log(err);
    }
  };

  const sendChatbyenter = async (event) => {
    try {
      if (event.key === 'Enter') {
        await sendChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='relative hidden sm:block gap-5 flex-col w-[70%] justify-center items-center m-[1%]'>
        <div className='h-[10%] w-[100%] flex bg-white rounded-xl'>
          <div className='w-[90%] px-[3%] flex items-center'>
            <img alt="" src={image} className="h-16 object-cover rounded-full w-16" />
            <div>
              <p className='w-[90%] text-start p-[1%] text-2xl ml-2 font-bold'>{name}</p>
              <div className='flex gap-1 ml-2 '>
                {length > 0 ? users.map((user) => (<div key={user._id}>{user.name},</div>)) : <div></div>}
              </div>
            </div>
          </div>
          <div className='w-[10%] flex justify-center'>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div className='h-[80%] w-[100%] bg-white rounded-xl p-[2%] overflow-y-scroll overflow-x-hidden'>
          {conversation.slice(0).map((message, index) => {
            const sender = message.sender;
            if (sender && sender._id === senderId) {
              return message.content === "undefined" ?
                (<div key={index} className='w-full flex justify-end'><img src={message.image} alt='' /></div>) :
                <Messageself props={message} key={index} />;
            } else {
              return message.content === "undefined" ?
                (<div key={index} className='w-full flex justify-start'><img src={message.image} alt='' /></div>) :
                <Messageother props={message} key={index} />;
            }
          })}
          <div ref={endRef} />
        </div>
        <div className='w-full bg-white rounded-xl flex items-center h-[10%]'>
          <div className='w-[7%] flex items-center justify-center'>
            <MdOutlineEmojiEmotions onClick={() => setOpen((prev) => !prev)} className='sm:size-5 md:size-10' />
          </div>
          <input placeholder='Type a Message' className='w-[85%] p-[1%] rounded-xl' value={content} onChange={(e) => setContent(e.target.value)} onKeyDown={sendChatbyenter} />
          <div className='w-[8%] h-full rounded-full flex items-center justify-center'>
            <IconButton onClick={sendChat}>
              <IoSend size={50} color='white' className='bg-green-500 w-full p-3 rounded-full ' />
            </IconButton>
          </div>
        </div>
        <input type='file' onChange={(e) => setFile(e.target.files[0])} />
      </div>
      <div className='absolute bottom-[14%] left-[32.5%]'>
        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
      </div>
    </>
  );
}

export default Chatarea;
