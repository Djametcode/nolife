/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";

import { GoHome, GoSearch, GoHomeFill } from "react-icons/go";
import { BiMoviePlay } from "react-icons/bi";
import { BsPlusSquare } from "react-icons/bs";
import getCurrentUser from "@/handler/getCurrentUser";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState([]);
  const path = usePathname();

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
    <div className=" flex justify-around p-5 w-full h-14 items-center bg-slate-50">
      <Link className=" w-full flex items-center" href={"/landing"}>
        {path === "/landing" ? <GoHomeFill size={25} /> : <GoHome size={25} />}
      </Link>
      <Link className=" w-full flex items-center" href={"/"}>
        <GoSearch size={25} />
      </Link>
      <Link className=" w-full flex items-center" href={"/"}>
        <BsPlusSquare size={25} />
      </Link>
      <Link className=" w-full flex items-center" href={"/"}>
        <BiMoviePlay size={25} />
      </Link>
      <div>
        {user.map((item: { avatar: string; _id: string }) => {
          return (
            <div key={item._id} className=" w-7 h-7">
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
