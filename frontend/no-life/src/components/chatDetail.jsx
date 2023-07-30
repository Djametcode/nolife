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
      setText("");
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
          <div className=" fixed bg-slate-300 z-20 top-0 w-full border-b h-16 flex gap-3 justify-start items-center pl-5">
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
            <div className=" flex gap-5 absolute right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </div>
          </div>
          <div className=" mt-16 p-3 relative z-0">
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
          <div className=" flex items-center p-3 gap-3 fixed bottom-2 w-full font-montserrat">
            <input
              onChange={(e) => setText(e.target.value)}
              className=" w-full focus:outline-none text-sm bg-slate-200 h-10 p-2 rounded-lg"
              type="text"
              placeholder="Pesan .."
              value={text}
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
