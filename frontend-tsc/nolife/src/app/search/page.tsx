/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import getAllPost from "@/handler/getAllPost";
import { IoIosSearch } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import getAllUser from "@/handler/getAllUser";

interface PostArray {
  images: string;
  _id: string;
}

interface User {
  avatar: string;
  username: string;
}

export default function SearchComponents() {
  const [item, setItem] = useState<PostArray[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [username, setUsername] = useState<string>();
  const [user, setUser] = useState<User[]>([]);

  const itemSearch = async () => {
    try {
      const response = await getAllPost();
      const formattedPost = response.data
        .filter((item: PostArray) => item.images !== "")
        .map((item: PostArray) => {
          return {
            images: item.images,
            postId: item._id,
          };
        });

      console.log(formattedPost);
      setItem(formattedPost);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const response = await getAllUser();
      console.log(response);
      const format = response.data.filter(
        (item: User) => item.username.toLowerCase() == username?.toLowerCase()
      );
      console.log(format);
      setUser(format);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const inteval = setTimeout(() => {
      getUserData();
      console.log("I am called too");
    }, 1000);

    return () => {
      clearTimeout(inteval);
      console.log("i am called");
    };
  }, [username]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    itemSearch();
  }, []);
  return (
    <div>
      <div className=" z-30 sticky top-0 p-3 flex items-center bg-slate-50">
        {isSearch ? (
          <span
            onClick={() => setIsSearch(false)}
            className=" cursor-pointer w-14 pl-2"
          >
            <FaArrowLeftLong size={20} />
          </span>
        ) : null}
        <div className=" p-2 w-full flex gap-3 items-center bg-slate-100 rounded-xl">
          <span>
            <IoIosSearch size={20} />
          </span>
          <input
            onChange={handleChangeSearch}
            className=" focus:outline-none bg-slate-100 font-figtree"
            type="text"
            placeholder="cari"
            onFocus={() => setIsSearch(true)}
          />
        </div>
      </div>
      {isSearch ? null : (
        <div className=" z-10 w-full h-full grid grid-cols-3 place-items-center grid-flow-rows pb-14">
          {item.map((image) => {
            return (
              <div className=" cursor-pointer w-full h-full overflow-scroll bg-black">
                {image.images.toLowerCase().includes("video") ? (
                  <div className=" w-full h-[225px]">
                    <video
                      controls
                      className=" object-cover"
                      src={image.images}
                    ></video>
                  </div>
                ) : (
                  <img
                    className=" w-full h-[200px] object-cover"
                    src={image.images}
                    alt=""
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
      {isSearch ? (
        <div className=" p-4 flex flex-col gap-4">
          {user.length === 0 ? (
            <div className=" font-figtree flex justify-center items-center">
              <p>User not Found</p>
            </div>
          ) : (
            user.map((item: User) => {
              return (
                <div className=" flex gap-5 font-figtree items-center">
                  <div className=" w-14 h-14">
                    {item.avatar == "" ? (
                      <img
                        className=" bg-slate-200 rounded-full"
                        src="/user.svg"
                        alt=""
                      />
                    ) : (
                      <img
                        className=" w-full h-full rounded-full"
                        src={item.avatar}
                        alt=""
                      />
                    )}
                  </div>
                  <div>
                    <p>{item.username}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}
