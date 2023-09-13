/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
"use client";

import getCurrentUser from "@/handler/getCurrentUser";
import React, { useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { GrAdd } from "react-icons/gr";
import { GrGrid } from "react-icons/gr";
import { BiMoviePlay } from "react-icons/bi";
import { FaUserTag } from "react-icons/fa";
import { BiLockAlt } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import updateAvatar from "@/handler/updateAvatar";

export default function ProfileComponent() {
  const [user, setUser] = useState([]);
  const [isChangeProfile, setIsChangeProfile] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [avatar, setFile] = useState<File | null>(null);
  const getUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAvatarHandler = async (
    userId: string,
    data: {
      username: string;
      file: File | null;
    }
  ) => {
    try {
      const response = await updateAvatar(userId, {
        username: data.username,
        avatar: data.file,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className=" relative z-0 pb-14 bg-slate-50 h-full w-full">
      <div className=" h-16 flex items-center p-5 sticky top-0 z-30 bg-slate-50">
        {user.map((item: { username: string; avatar: string; _id: string }) => {
          return (
            <div className=" flex items-center gap-3 h-fullfont-figtree">
              <BiLockAlt size={25} />
              <div className=" flex flex-col justify-center h-full text-lg">
                <p>{item.username}</p>
              </div>
              <div className=" flex items-center absolute right-5 gap-3">
                <FiPlusSquare size={25} />
                <GiHamburgerMenu size={25} />
              </div>
            </div>
          );
        })}
      </div>
      {isChangeProfile ? (
        <div className=" fixed top-0 w-full h-full z-50 bg-slate-50 flex flex-col gap-5">
          <div className=" flex items-center justify-between p-3 font-figtree">
            <button
              onClick={() => setIsChangeProfile(false)}
              className=" bg-slate-300 rounded-lg w-16 h-9"
            >
              Batal
            </button>
            <div>
              <p>Edit Profile</p>
            </div>
            {user.map((item: { _id: string }) => {
              return (
                <button
                  onClick={() =>
                    updateAvatarHandler(item._id, {
                      username: username,
                      file: avatar,
                    })
                  }
                  className=" bg-slate-300 rounded-lg w-16 h-9"
                >
                  Selesai
                </button>
              );
            })}
          </div>
          <div className=" flex flex-col gap-6 items-center">
            {user.map(
              (item: { avatar: string; username: string; email: string }) => {
                return (
                  <>
                    <div className=" w-20 h-20">
                      <img
                        className=" w-full h-full rounded-full object-cover"
                        src={item.avatar}
                        alt=""
                      />
                    </div>
                    <form
                      className=" bg-slate-50 w-full font-figtree p-3"
                      action=""
                    >
                      <div className=" w-full h-11 flex items-center">
                        <label className=" w-1/4" htmlFor="username">
                          Nama :
                        </label>
                        <input
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setUsername(e.target.value)
                          }
                          className=" border-b bg-slate-50 w-3/4 focus:outline-none"
                          type="text"
                          placeholder="Nama"
                          value={username}
                        />
                      </div>
                      <div className=" w-full h-11 flex items-center">
                        <label className=" w-1/4" htmlFor="username">
                          email :
                        </label>
                        <input
                          className=" border-b focus:outline-none bg-slate-50 w-3/4"
                          type="email"
                          placeholder="username"
                          value={item.email}
                        />
                      </div>
                      <div className=" w-full h-36 flex items-start pt-3">
                        <label className=" w-1/4" htmlFor="username">
                          Bio
                        </label>
                        <textarea
                          className=" w-3/4 h-32 bg-slate-200 rounded-lg focus:outline-none p-3"
                          placeholder="new bio"
                        />
                      </div>
                      <div className=" w-full h-36 flex items-start pt-3">
                        <label className=" w-1/4" htmlFor="username">
                          foto profil
                        </label>
                        <input
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (e.target.files && e.target.files[0]) {
                              setFile(e.target.files[0]);
                            }
                          }}
                          type="file"
                          name="file"
                        />
                      </div>
                    </form>
                  </>
                );
              }
            )}
          </div>
        </div>
      ) : null}
      {user.map(
        (item: {
          avatar: string;
          username: string;
          post: [
            {
              images: string;
            }
          ];
          follower: any[];
        }) => {
          return (
            <div className=" p-5 w-full flex flex-col gap-4 justify-start bg-slate-50">
              <div className=" flex w-full gap-8">
                <div className=" w-20 h-20">
                  <img
                    className=" w-full h-full rounded-full"
                    src={item.avatar}
                    alt=""
                  />
                </div>
                <div className=" flex font-figtree gap-2 items-center justify-center w-[250px] ">
                  <div className=" text-center w-full text-sm">
                    <p>{item.post.length}</p>
                    <p>Post</p>
                  </div>
                  <div className=" text-center w-full text-sm">
                    <p>{item.follower.length}</p>
                    <p>Follower</p>
                  </div>
                  <div className=" text-center w-full text-sm">
                    <p>0</p>
                    <p>Following</p>
                  </div>
                </div>
              </div>
              <div className=" w-20 flex flex-col gap-1 font-figtree">
                <p className=" font-extrabold">{item.username}</p>
                <p className=" text-xs">No bio yet</p>
              </div>
              <div className=" flex items-center w-full gap-3 text-black">
                <div
                  onClick={() => setIsChangeProfile(true)}
                  className=" cursor-pointer w-full flex justify-center bg-gray-200 h-8 rounded-lg"
                >
                  <button className=" text-sm">Edit Profile</button>
                </div>
                <div className=" w-full flex justify-center bg-gray-200 h-8 rounded-lg">
                  <button className=" text-sm">Share Profile</button>
                </div>
                <div className=" w-20 flex justify-center items-center bg-gray-200 h-8 rounded-lg">
                  <IoMdPersonAdd />
                </div>
              </div>
              <div className=" flex">
                <div className=" border rounded-full p-4">
                  <GrAdd size={20} />
                </div>
              </div>
              <div className=" flex w-full justify-around">
                <div className=" border-b w-full flex justify-center">
                  <GrGrid size={20} />
                </div>
                <div className=" w-full flex justify-center">
                  <BiMoviePlay size={25} />
                </div>
                <div className="  w-full flex justify-center">
                  <FaUserTag size={25} />
                </div>
              </div>
              <div className=" w-full grid grid-cols-3 gap-2">
                {item.post.map((result: { images: string }) => {
                  return (
                    <div className=" h-[150px] w-full">
                      {result.images.toLowerCase().includes("video") ? (
                        <video
                          className=" w-full h-full object-cover"
                          src={result.images}
                          controls
                        ></video>
                      ) : (
                        <img
                          className=" w-full h-full object-cover"
                          src={result.images}
                          alt=""
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
