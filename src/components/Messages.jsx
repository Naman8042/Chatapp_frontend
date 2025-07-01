import { useState } from "react";
import { MdGTranslate } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../data";

function Message({ props, isSelf }) {
  const [message, setMessage] = useState(props.content);
  const hasImage = props.image !== null;

  const onClickTranslate = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/translate`, {
        sentence: props.content,
        fromLanguage: "en",
        toLanguage: "hi",
      });
      setMessage(data.translatedData.translation);
    } catch (error) {
      console.error("Translation failed", error);
    }
  };

  const handleImageClick = () => {
    window.open(props.image, "_blank");
  };

  return (
    <div
      className={`px-4 my-2 flex ${isSelf ? "justify-end" : "justify-start"}`}
    >
      {!hasImage ? (
        <div
          className={`w-full flex ${
            isSelf ? "justify-end" : "justify-start"
          } my-2`}
        >
          <div className="group relative max-w-[80%] sm:max-w-[70%] md:max-w-[60%] ">
            <div
              className={`rounded-xl p-3 text-white text-sm md:text-base font-medium break-words bg-green-500`}
            >
              <MdGTranslate
                onClick={onClickTranslate}
                size={20}
                className={`absolute top-1/2 transform  -translate-y-1/2 cursor-pointer text-black
          ${
            isSelf ? "left-[-28px]" : "right-[-28px]"
          } hidden group-hover:block`}
              />
              <p>{message}</p>
            </div>
          </div>
        </div>
      ) : (
        <div onClick={handleImageClick} className="cursor-pointer">
          <div className="bg-gray-100 rounded-xl p-2 max-w-xs md:max-w-sm">
            <img
              src={props.image}
              alt="uploaded"
              className="h-32 w-48 md:h-40 md:w-64 object-cover rounded-md"
            />
            <p className="text-sm mt-2 break-words">{props.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
