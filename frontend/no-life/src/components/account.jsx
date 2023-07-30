/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Cookies from "js-cookie";
import { Fragment, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import editProfileHandler from "../handler/editProfileHandler";

const Account = () => {
  const token = Cookies.get("token");
  const [user, setUser] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        `https://nolife-backend.vercel.app/api/v11/no-life/post/get-current-user/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      setUser(result.data);
      console.log("I am called");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [count]);

  const [update, setUpdate] = useState(false);
  const [newUsername, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  console.log(newUsername);
  console.log(avatar);

  return (
    <div className=" md: max-w-2xl max-sm:mt-0 mt-16 font-geologica flex flex-col gap-3 bg-slate-100">
      {user.map((item) => (
        <>
          {" "}
          <div className=" grid grid-cols-[25%_75%] w-full p-5">
            <div>
              {item.avatar === "" ? (
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className=" w-20 h-20"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                  />
                </svg>
              ) : (
                <div className="avatar">
                  <div className=" w-16 rounded-full">
                    <img src={item.avatar} />
                  </div>
                </div>
              )}
            </div>
            <div className=" text-sm flex justify-center items-center gap-3 font-montserrat-">
              <div className=" flex flex-col items-center justify-start">
                <p>{item.post.length}</p>
                <p>Post</p>
              </div>
              <div className=" flex flex-col items-center justify-start">
                <p>{item.follower.length}</p>
                <p>Follower</p>
              </div>
            </div>
            <div className=" font-geologica font-extrabold flex flex-col gap-3 w-full">
              {update ? (
                <input
                  className=" font-montserrat placeholder:text-sm focus:outline-none border rounded-lg p-1"
                  type="text"
                  placeholder={item.username}
                  onChange={(e) => setUsername(e.target.value)}
                  value={newUsername}
                />
              ) : (
                <div className="">
                  <div>
                    <p className=" text-xl">{item.username}</p>
                  </div>
                </div>
              )}
              {update ? (
                <input
                  className=" placeholder:text-sm font-montserrat pb-24 max-w-md focus:outline-none border rounded-lg p-1"
                  type="text"
                  placeholder="New Bio ..."
                />
              ) : (
                <p className=" font-montserrat text-xs">No Bio Yet</p>
              )}
              {update ? (
                <Fragment>
                  <label className=" font-montserrat text-xs italic text-warning">
                    Put file to update avatar
                  </label>
                  <input
                    type="file"
                    className="file-input font-montserrat text-xs file-input-bordered file-input-acent w-full max-w-xs"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </Fragment>
              ) : null}
            </div>
          </div>
        </>
      ))}

      <div className=" flex justify-around font-montserrat text-sm p-3 gap-2">
        {update ? (
          <Fragment>
            <button
              onClick={() =>
                editProfileHandler(
                  newUsername,
                  avatar,
                  setUpdate,
                  count,
                  setCount
                )
              }
              className=" bg-primary text-white p-2 rounded-lg shadow w-full"
            >
              Update Profile
            </button>
            <button
              onClick={() => setUpdate(false)}
              className=" bg-slate-200 p-2 rounded-lg shadow-sm w-1/3"
            >
              Cancle
            </button>
          </Fragment>
        ) : (
          <button
            onClick={() => setUpdate(true)}
            className=" bg-slate-200 p-1 rounded-lg shadow-sm w-full"
          >
            Edit Profile
          </button>
        )}
        {update ? null : (
          <button className=" bg-slate-200 p-1 rounded-lg shadow-sm w-full">
            Bagikan Profil
          </button>
        )}
      </div>
      <div className=" flex justify-around text-sm font-montserrat">
        <button
          onClick={() => navigate("/welcome/account")}
          className={`${
            location.pathname === "/welcome/account"
              ? " border-b border-black"
              : ""
          } w-full p-3`}
        >
          Postingan
        </button>
        <button
          onClick={() => navigate("/welcome/account/reply")}
          className={`${
            location.pathname === "/welcome/account/reply"
              ? " border-b border-black"
              : ""
          } w-full p-3`}
        >
          Balasan
        </button>
      </div>
      <div className=" m-5 max-sm:m-0 max-sm:pb-14">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
