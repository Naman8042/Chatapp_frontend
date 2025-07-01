import { IconButton } from "@mui/material";
import { FaRegImage } from "react-icons/fa";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const Sendmessage = ({disappearHandler,sendMessage,disappear,setOpen,handleFileChange,message,setMessage,sendChatByEnter,}) => {
    
  return (
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
  )
}

export default Sendmessage