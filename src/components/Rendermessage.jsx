import Message from "./Messages";
import { useRef, useEffect } from "react";

const Rendermessage = ({ messages }) => {
  const senderId = localStorage.getItem("id");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (
    <div
      className="h-[80%] w-[100%] bg-white rounded-xl p-[2%]  pb-[20%] md:pb-0 sm:overflow-y-scroll sm:overflow-x-hidden"
      onClick={() => setOpen(false)}
    >
      {messages.map((message, index) => {
        const sender = message.sender;
        return sender === senderId ? (
          <Message props={message} key={index} isSelf={true} />
        ) : (
          <Message props={message} key={index} isSelf={false} />
        );
      })}
      <div ref={endRef} />
    </div>
  );
};

export default Rendermessage;
