/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";

import { GoHome, GoSearch } from "react-icons/go";
import { BiMoviePlay } from "react-icons/bi";
import { BsPlusSquare } from "react-icons/bs";
import getCurrentUser from "@/handler/getCurrentUser";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      const response = await getCurrentUser();
      const { msg, data } = response;
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className=" flex justify-between p-5 w-full h-14 items-center bg-slate-50">
      <GoHome size={25} />
      <GoSearch size={25} />
      <BsPlusSquare size={25} />
      <BiMoviePlay size={25} />
      <div>
        {user.map((item: { avatar: string }) => {
          return (
            <div className=" w-7 h-7">
              <img
                className=" rounded-full object-cover"
                src={item.avatar}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
