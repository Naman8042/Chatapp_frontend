import React, { useEffect, useState, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import Messageself from "../components/Messageself";
import Messageother from "../components/Messageothers";
import Default from "../assets/default.png";
import { FaRegImage } from "react-icons/fa";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import axios from "axios";
import { FaClock } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../data";
import { toast } from "react-toastify";

function App() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();
  const senderId = localStorage.getItem("id");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [open, setOpen] = useState(false);
  const endRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [users, setUsers] = useState([]);
  const [disappear, setDisappear] = useState(false);
  const ws = useRef(null); // WebSocket ref

  function disappearHandler() {
    setDisappear(!disappear);
    if (!disappear) {
      toast.success("The Message will be deleted in 24 hours");
    } else {
      toast.success("This is a Normal Message");
    }
  }

  async function getDetails() {
    setUsers([]);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/user/getuser`,
        { chatId: id },
        {
          withCredentials: true,
        }
      );
      setName(data.name);
      setImage(data.imageUrl);
    } catch (err) {
      console.log(err);
    }
  }

  async function getGroupDetails() {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/user/getgroupdetails`,
        { chatId: id },
        { withCredentials: true }
      );
      setName(data.chatName);
      setImage(Default);
      setUsers(data.users);
    } catch (err) {
      console.log(err);
    }
  }

  async function findIsGroup() {
    const { data } = await axios.post(
      `${BASE_URL}/user/isgroupchat`,
      { chatId: id },
      { withCredentials: true }
    );
    if (data) {
      getGroupDetails();
    } else {
      getDetails();
    }
  }

  useEffect(() => {
    findIsGroup();
  }, [id]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEmoji = (e) => {
    setMessage((prev) => prev + e.emoji);
  };

  const sendChatByEnter = async (event) => {
    if (event.key === "Enter") {
      await sendMessage();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    ws.current = new WebSocket(BASE_URL);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      setConnected(true);
      ws.current.send(
        JSON.stringify({ type: "setup", user: senderId })
      );
      ws.current.send(
        JSON.stringify({ type: "join_chat", room: id })
      );
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "connected") {
        console.log("Connected to WebSocket server");
      } else if (data.type === "message_received") {
        const newMessageStatus = data.message;
        
        if (newMessageStatus.chat === id) {
          console.log("new Message Recieved",newMessageStatus)
          setMessages((prevMessages) => [...prevMessages, newMessageStatus]);
        }
      } else if (data.type === "sidebar") {
        console.log("Sidebar update received");
      } else if (data.type === "newuser") {
        console.log("New user connected");
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.current.close();
    };
  }, [id]);

  const sendMessage = async () => {
    const formData = new FormData();
    formData.append("sender", senderId);
    formData.append("chatId", id);
    formData.append("content", message);
    if (file) {
      formData.append("file", file);
    }
    if (disappear) {
      formData.append("expiresIn", 10);
    }

    try {
      const { data } = await axios.post(
        `${BASE_URL}/user/sendmessage`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Send to server via WebSocket
      ws.current.send(
        JSON.stringify({
          type: "new_message",
          newMessageStatus: data,
          roomId: id,
        })
      );

      ws.current.send(
        JSON.stringify({
          type: "sidebar",
        })
      );

      setMessages((prevMessages) => [...prevMessages, data]);
      setMessage("");
      setFile("");
      setImagePreview(null);
      setDisappear(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchChats = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/user/allmessage`,
        { chat: id },
        { withCredentials: true }
      );
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [id]);


  return (
    <>
      <div className="relative gap-5 flex-col lg:w-[70%] sm:w-[60%] justify-center items-center sm:m-[1%]">
        <div className="h-[10%] w-[100%] flex justify-between bg-white mb-4 fixed sm:relative z-50 ">
          <div className="px-[3%] flex items-center">
            <img
              alt="User"
              src={image}
              className="mx-auto rounded-full sm:w-12 sm:h-12 md:w-13 lg:w-14 lg:h-14 h-10 w-10"
            />
            <div>
              <p className="w-[90%] text-start p-[1%] lg:text-2xl md:text-2xl sm:text-xl ml-2 font-bold">
                {name}
              </p>
              <div className="flex gap-1 ml-2">
                {users &&
                  users.map((user) => <div key={user._id}>{user.name} </div>)}
              </div>
            </div>
          </div>
          {/* <div className="w-[10%] flex justify-center">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div> */}
        </div>

        <div
          className="h-[80%] w-[100%] bg-white rounded-xl p-[2%]  pb-[20%] md:pb-0 sm:overflow-y-scroll sm:overflow-x-hidden"
          onClick={() => setOpen(false)}
        >
          {messages.map((message, index) => {
            const sender = message.sender;
            return sender === senderId ? (
              <Messageself props={message} key={index} />
            ) : (
              <Messageother props={message} key={index} />
            );
          })}
          <div ref={endRef} />
        </div>

        <div className="w-full bg-white rounded-xl flex items-center h-[10%] fixed bottom-0 sm:relative">
          <div className="md:w-[15%] w-[20%] lg:w-[10%] flex items-center justify-center gap-2">
            <MdOutlineEmojiEmotions
              onClick={() => setOpen((prev) => !prev)}
              className="size-5 md:size-6 lg:size-8"
            />
            <label className="cursor-pointer flex items-center justify-center rounded-md ">
              <FaRegImage className="size-5 md:size-6 lg:size-8" />
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <input
            placeholder="Type a Message"
            className="w-[70%] md:w-[75%] lg:w-[82%] p-[1%] rounded-xl outline-none border-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={sendChatByEnter}
          />
          <FaClock
            className={`p-3 rounded-full text-${
              disappear ? "green-500" : "black"
            }`}
            size={45}
            onClick={disappearHandler}
          />

          <div className=" h-full rounded-full flex items-center justify-center">
            <IconButton onClick={sendMessage}>
              <IoSend
                color="white"
                className="bg-green-500 w-full p-3 rounded-full size-10 md:size-15 "
              />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="fixed bottom-[17%] left-[34%] w-[60%] bg-white flex items-center justify-center z-40">
          <img src={imagePreview} alt="" className="h-64 w-64" />
        </div>
      )}

      {/* Emoji Picker */}
      {open && (
        <div className="fixed bottom-16 md:bottom-[14%] left-2  md:left-[32.5%]">
          <EmojiPicker onEmojiClick={handleEmoji} />
        </div>
      )}
      {/* <div className="sm:hidden w-screen h-dvh">
        <Phonesidebar />
      </div> */}
    </>
  );
}

export default App;
