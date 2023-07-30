/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import getAllUser from "../handler/getAllUser";
import axios from "axios";
import Cookies from "js-cookie";

const SearchComponent = () => {
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

  const followAccount = async (targetUser, count, setCount) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        `https://nolife-backend.vercel.app/api/v11/no-life/post/follow/${targetUser}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      setCount(count + 1);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" h-screen w-screen relative">
      <h1 className=" font-geologica p-3 text-xl">Cari</h1>
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
                onClick={() => followAccount(item._id, count, setCount)}
                className=" cursor-pointer absolute right-5 text-sm"
              >
                {item.follower.some(
                  (item) => item.createdBy === Cookies.get("userId")
                ) ? (
                  <p className=" p-2 border bg-black text-white rounded-lg">
                    Followed
                  </p>
                ) : (
                  <p className=" p-2 border rounded-lg">Follow</p>
                )}
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
                  onClick={() => followAccount(item._id, count, setCount)}
                  className=" cursor-pointer absolute right-5 text-sm"
                >
                  {item.follower.some(
                    (item) => item.createdBy === Cookies.get("userId")
                  ) ? (
                    <p className=" p-2 border bg-black text-white rounded-lg">
                      Followed
                    </p>
                  ) : (
                    <p className=" p-2 border rounded-lg">Follow</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
