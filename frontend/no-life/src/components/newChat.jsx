import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getAllUser from "../handler/getAllUser";
import axios from "axios";
import Cookies from "js-cookie";

const NewChat = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  console.log(user);
  const [count, setCount] = useState(0);

  const getData = async () => {
    try {
      const data = await getAllUser();
      console.log(data);
      setUser(data.data.filter((item) => item._id !== Cookies.get("userId")));
    } catch (error) {
      console.log(error);
    }
  };

  const [searchingUser, setSearching] = useState(false);
  const [searchResult, setResult] = useState([]);
  const [enteredUsername, setEnteredUsername] = useState("");
  console.log(searchResult);

  const getUser = (username) => {
    const data = user.filter((item) =>
      item.username.toLowerCase().includes(username.toLowerCase())
    );
    return setResult(data);
  };

  useEffect(() => {
    const timeoutUser = setTimeout(() => {
      getUser(enteredUsername);
    }, 500);

    return () => {
      console.log("user inputing"), clearTimeout(timeoutUser);
    };
  }, [enteredUsername]);

  useEffect(() => {
    getData();
  }, [count]);

  const chatAccount = async (user2) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        `https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/chat/create-chat?user2=${user2}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
      navigate(`/welcome/chat`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" h-screen w-screen relative">
      <div className=" flex h-16 gap-4 pl-4 justify-start items-center">
        <Link to="/welcome/chat">
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
        <h1 className=" font-geologica text-xl">Cari</h1>
      </div>
      <div className=" flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-md input-bordered w-full max-w-sm"
          onChange={(e) => setEnteredUsername(e.target.value)}
          onClick={() => setSearching(true)}
        />
      </div>
      {!searchingUser ? (
        <div>
          {user.map((item) => (
            <div
              key={item._id}
              className={` gap-y-3 grid grid-cols-[17%_85%] grid-rows-[12,5%_12,5%_50%_25%] w-full font-geologica p-5`}
            >
              <div className=" row-span-2">
                <div className=" flex justify-start">
                  {item.avatar === "" ? (
                    <div>
                      <img
                        className=" w-12 h-12 object-cover rounded-full"
                        src="/Blank-Avatar.png"
                        alt=""
                      />
                    </div>
                  ) : (
                    <img
                      className=" w-12 h-12 object-cover rounded-full"
                      src={item.avatar}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div className="">
                <p>{item.username}</p>
                <p className=" text-xs font-montserrat">
                  {item.follower.length} follower
                </p>
              </div>
              <div>
                <hr />
              </div>
              <div
                onClick={() => chatAccount(item._id)}
                className=" cursor-pointer absolute right-8 text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 -rotate-45"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {searchResult.length === 0 ? (
            <div className=" flex justify-center items-center h-screen">
              <p className=" font-geologica">User not found</p>
            </div>
          ) : (
            searchResult.map((item) => (
              <div
                key={item._id}
                className={` gap-y-3 grid grid-cols-[17%_85%] grid-rows-[12,5%_12,5%_50%_25%] w-full font-geologica p-5`}
              >
                <div className=" row-span-2">
                  <div className=" flex justify-start">
                    {item.avatar === "" ? (
                      <div>
                        <img
                          className=" w-12 h-12 object-cover rounded-full"
                          src="/Blank-Avatar.png"
                          alt=""
                        />
                      </div>
                    ) : (
                      <img
                        className=" w-12 h-12 object-cover rounded-full"
                        src={item.avatar}
                        alt=""
                      />
                    )}
                  </div>
                </div>
                <div className="">
                  <p>{item.username}</p>
                  <p className=" text-xs font-montserrat">
                    {item.follower.length} follower
                  </p>
                </div>
                <div>
                  <hr />
                </div>
                <div
                  onClick={() => chatAccount(item._id)}
                  className=" cursor-pointer absolute right-5 text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 -rotate-45"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NewChat;
