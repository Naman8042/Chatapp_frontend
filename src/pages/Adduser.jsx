import React, { useEffect, useState, useRef } from 'react';
import Logo from '../assets/Logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import axios from 'axios';
import Default from '../assets/default.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { BASE_URL } from '../data';

function Online() {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  const [findUsers, setFindUsers] = useState("");
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});
  const ws = useRef(null); // native WebSocket

  // Initialize WebSocket connection
  useEffect(() => {
    ws.current = new WebSocket(BASE_URL); // replace with your server port

    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "newuser") {
        console.log("New user notification received");
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/user/getall`,
        {},
        { withCredentials: true }
      );
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const CreateChat = async (userId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/accesschats`,
        { userId },
        { withCredentials: true }
      );

      toast.success("User Added Successfully");
      setData(response.data);

      // Send 'newuser' event via WebSocket
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ type: "newuser" }));
      }

      const currentUserId = id;
      const otherUser = response.data.users.find(
        (user) => user._id !== currentUserId
      );

      if (otherUser) {
        navigate(`/app/chat/${response.data._id}`);
      } else {
        console.error("Other user not found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full sm:w-[60%] lg:w-[70%] h-full m-2">
  <div className="h-[30%] p-2">
    {/* Header */}
    <div className="flex items-center gap-4">
      <img src={Logo} alt="Logo" className="w-16 h-16 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain" />
      <p className="text-xl sm:text-2xl font-bold">Add Users</p>
    </div>

    {/* Search Bar */}
    <div className="bg-white flex items-center px-3 py-2 mt-4 rounded-3xl shadow-sm">
      <IconButton>
        <SearchIcon />
      </IconButton>
      <input
        type="text"
        placeholder="Search any user"
        className="ml-2 w-full outline-none text-base"
        value={findUsers}
        onChange={(e) => setFindUsers(e.target.value)}
      />
    </div>
  </div>

  {/* User List */}
  <div className="h-[70%] overflow-y-scroll px-4 space-y-3 pb-4">
    {users.map((user) => (
      <div
        key={user._id}
        className="flex items-center gap-3 bg-gray-50 border shadow rounded-xl p-2 cursor-pointer hover:bg-gray-100 transition-all"
        onClick={() => CreateChat(user._id)}
      >
        <img
          src={user.imageUrl || Default}
          alt="User"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full "
        />
        <div className="flex-1 text-base sm:text-lg font-medium truncate">{user.name}</div>
      </div>
    ))}
  </div>
</div>

  );
}

export default Online;
