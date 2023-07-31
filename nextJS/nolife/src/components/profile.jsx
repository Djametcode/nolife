"use client";

import { Fragment, useEffect, useState } from "react";
import getCurrentUser from "@/handler/getCurrentUser";

const ProfileComponent = () => {
  const [user, setUser] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newUsername, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  const getData = async () => {
    try {
      const item = await getCurrentUser();
      setUser(item.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className=" pt-16 pb-0 md:max-w-2xl max-sm:mt-0 mt-16 font-geologica flex flex-col">
      {user.map((item) => (
        <div key={item._id}>
          <div className=" grid grid-cols-[25%_75%] w-full p-5 pt-9 pb-0">
            <div className=" flex items-center">
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
            <div className=" text-sm w-full items-center font-montserrat">
              <div className=" h-full flex justify-evenly items-center">
                <div className=" flex flex-col items-center justify-start">
                  <p>{item.post.length}</p>
                  <p>Post</p>
                </div>
                <div className=" flex flex-col items-center justify-start">
                  <p>{item.follower.length}</p>
                  <p>Follower</p>
                </div>
                <div className=" flex flex-col items-center justify-start">
                  <p>{item.follower.length}</p>
                  <p>Following</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" font-geologica font-extrabold flex flex-col gap-3 w-full">
            {update ? (
              <div className=" flex flex-col p-3 gap-2">
                <input
                  className=" font-montserrat placeholder:text-sm focus:outline-none border rounded-lg p-1"
                  type="text"
                  placeholder={item.username}
                  onChange={(e) => setUsername(e.target.value)}
                  value={newUsername}
                />
                <input
                  className=" placeholder:text-sm font-montserrat pb-24 max-w-md focus:outline-none border rounded-lg p-1"
                  type="text"
                  placeholder="New Bio ..."
                />
                <label className=" font-montserrat text-xs italic text-warning">
                  Put file to update avatar
                </label>
                <input
                  type="file"
                  className="file-input font-montserrat text-xs file-input-bordered file-input-acent w-full max-w-xs"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </div>
            ) : (
              <div className=" p-5 flex flex-col gap-2">
                <div>
                  <p className=" text-xl">{item.username}</p>
                </div>
                <p className=" font-montserrat text-xs">No Bio Yet</p>
              </div>
            )}
          </div>
        </div>
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
      <div className=" p-3 w-20 flex flex-col gap-2">
        <div className=" bg-slate-50 rounded-full h-14 w-14 flex justify-center items-center border">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className=" w-7 h-7"
          >
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
        </div>
        <div className=" flex justify-center text-xs font-montserrat">
          <p>Baru</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
