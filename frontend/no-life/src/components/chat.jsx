/* eslint-disable react/jsx-key */
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Chat = () => {
  const [chat, setChat] = useState([]);
  const navigate = useNavigate();

  const getMychat = async () => {
    try {
      const response = await axios.get(
        "https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/chat/my-chat",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const result = await response.data;
      setChat(result.chat);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMychat();
  }, []);
  return (
    <div className=" font-geologica p-3 flex flex-col justify-start items-start h-screen">
      <div className=" w-full flex h-14 gap-5 justify-start items-center border-b font-geologic pl-5">
        <Link to="..">
          <svg
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
        </Link>
        <div className=" text-lg">
          <p>Chat</p>
        </div>
        <div
          onClick={() => navigate("/welcome/new-chat")}
          className=" cursor-pointer absolute right-5"
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
      <div>
        {chat.map((item) => (
          <div
            onClick={() => navigate(`/welcome/chat/${item._id}`)}
            className=" cursor-pointer h-24 p-4 overflow-hidden flex gap-3 justify-start items-center"
          >
            <div>
              {item.participants.user2.avatar === "" ? (
                <div>
                  <img
                    className=" w-14 object-cover rounded-full"
                    src="/Blank-Avatar.png"
                    alt=""
                  />
                </div>
              ) : (
                <img
                  className=" w-14 h-14 object-cover rounded-full"
                  src={`${
                    item.participants.user1._id === Cookies.get("userId")
                      ? item.participants.user2.avatar
                      : item.participants.user1.avatar
                  }`}
                  alt=""
                />
              )}
            </div>
            <div>
              <p className=" font-geologica text-sm">
                {item.participants.user1._id === Cookies.get("userId")
                  ? item.participants.user2.username
                  : item.participants.user1.username}
              </p>
              <p className=" font-montserrat text-xs">
                {item.message.length === 0 ? null : (
                  <p>{item.message[item.message.length - 1].text}</p>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
