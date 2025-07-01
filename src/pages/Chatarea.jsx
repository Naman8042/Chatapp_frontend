import { useEffect, useState, useRef } from "react";
import Chatareanavbar from "../components/Chatareanavbar";
import Default from "../assets/default.png";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../data";
import { toast } from "react-toastify";
import Rendermessagef from "../components/Rendermessage";
import Sendmessage from "../components/Sendmessage";
import Spinner from "../components/Spinner";

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
  const [imagePreview, setImagePreview] = useState(null);
  const [users, setUsers] = useState([]);
  const [disappear, setDisappear] = useState(false);
  const [loading, setLoading] = useState(true);
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
      ws.current.send(JSON.stringify({ type: "setup", user: senderId }));
      ws.current.send(JSON.stringify({ type: "join_chat", room: id }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "connected") {
        console.log("Connected to WebSocket server");
      } else if (data.type === "message_received") {
        const newMessageStatus = data.message;

        if (newMessageStatus.chat === id) {
          console.log("new Message Recieved", newMessageStatus);
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
    const loadData = async () => {
      setLoading(true);
      await fetchChats();
      await findIsGroup();
      setLoading(false);
    };

    loadData();
  }, [id]);

  return (
    <div className="relative gap-5 flex-col lg:w-[70%] sm:w-[60%] justify-center items-center sm:m-[1%]">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <>
            <Chatareanavbar image={image} name={name} users={users} />
            <Rendermessagef messages={messages} />
          </>
        </>
      )}
      <>
        <Sendmessage
          disappearHandler={disappearHandler}
          sendChatByEnter={sendChatByEnter}
          sendMessage={sendMessage}
          disappear={disappear}
          setOpen={setOpen}
          handleFileChange={handleFileChange}
          message={message}
          setMessage={setMessage}
        />
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
      </>
    </div>
  );
}

export default App;
