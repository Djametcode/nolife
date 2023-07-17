/* eslint-disable react/jsx-key */
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChatDetail = () => {
  const { id } = useParams();
  const [chat, setChat] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const getChatDetail = async () => {
    try {
      const response = await axios.get(
        `https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/chat/chat-detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const result = await response.data;
      setChat(result.formatChat);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const [text, setText] = useState("");

  const data = {
    text: text,
  };

  const sendMessage = async (id, state, setState) => {
    try {
      const response = await axios.post(
        `https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/chat/send-msg/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const result = await response.data;
      setState(state + 1);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChatDetail();
  }, [count]);
  return (
    <div className=" h-screen">
      {chat.map((item) => (
        <>
          <div className=" border-b h-16 flex gap-3 justify-start items-center pl-5">
            <svg
              onClick={() => navigate("/welcome/chat")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <div>
              {item.participants.user2.avatar === "" ? (
                <div>
                  <img
                    className=" w-12 object-cover rounded-full"
                    src="/Blank-Avatar.png"
                    alt=""
                  />
                </div>
              ) : (
                <div>
                  <img
                    className=" w-12 h-12 object-cover rounded-full"
                    src={
                      item.participants.user1._id === Cookies.get("userId")
                        ? item.participants.user2.avatar
                        : item.participants.user1.avatar
                    }
                    alt=""
                  />
                </div>
              )}
            </div>
            <div>
              <p className=" font-geologica">
                {item.participants.user1._id === Cookies.get("userId")
                  ? item.participants.user2.username
                  : item.participants.user1.username}
              </p>
            </div>
          </div>
          <div className=" p-3">
            {item.message.map((item) => (
              <>
                <div
                  className={`chat ${
                    item.sender === Cookies.get("userId")
                      ? "chat-end"
                      : "chat-start"
                  }`}
                >
                  <div className="chat-bubble font-montserrat text-sm">
                    {item.text}
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className=" flex items-center p-3 gap-3 absolute bottom-2 w-full font-montserrat">
            <input
              onChange={(e) => setText(e.target.value)}
              className=" w-full focus:outline-none text-sm bg-slate-200 h-10 p-2 rounded-lg"
              type="text"
              placeholder="Pesan .."
            />
            <div className=" p-3 text-sm bg-slate-100 rounded-lg">
              <button onClick={() => sendMessage(item._id, count, setCount)}>
                Kirim
              </button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default ChatDetail;
