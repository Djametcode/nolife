/* eslint-disable react/jsx-key */
"use client";

import Navbar from "@/component/navbar";
/* eslint-disable @next/next/no-img-element */
import SideBarLarge from "@/component/sidebar";
import getCurrentUser from "@/handler/getCurrentUser";
import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { RiMessengerLine, RiHeartLine } from "react-icons/ri";

interface Children {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: Children) {
  const [currUser, setCurrUser] = useState([]);
  console.log(currUser);
  const getUser = async () => {
    const response = await getCurrentUser();
    const { msg, data } = response;
    setCurrUser(data);
  };
  useEffect(() => {
    getUser();
  }, []);

  interface Dummy {
    avatar: string;
    name: string;
  }

  const dummy: Dummy[] = [
    {
      avatar: "/user.svg",
      name: "Dummy",
    },
    {
      avatar: "/user.svg",
      name: "Dummy",
    },
    {
      avatar: "/user.svg",
      name: "Dummy",
    },
    {
      avatar: "/user.svg",
      name: "Dummy",
    },
    {
      avatar: "/user.svg",
      name: "Dummy",
    },
    {
      avatar: "/user.svg",
      name: "Dummy",
    },
    {
      avatar: "/user.svg",
      name: "Dummy",
    },
  ];

  return (
    <div className=" max-sm:flex-col flex w-screen h-screen">
      <div className=" max-sm:hidden fixed w-72 h-full pt-8 pb-5 pl-10 border-r bg-slate-100 font-figtree">
        <SideBarLarge />
      </div>
      <div className="">
        <div className=" h-44 w-full font-figtree max-sm:flex-col max-sm:flex max-sm:gap-3 p-3">
          <div className=" flex items-center">
            <div className=" w-[125px]">
              <img src="/logo.png" alt="" />
            </div>
            <div className=" flex absolute right-5 gap-5">
              <RiHeartLine size={23} />
              <RiMessengerLine size={23} />
            </div>
          </div>
          <div className=" flex gap-5 overflow-scroll">
            <div>
              {currUser.map((item: { avatar: string }) => {
                return (
                  <div className=" flex flex-col items-center gap-1">
                    <div className=" w-16 h-16 relative">
                      <img
                        className=" w-full h-full rounded-full"
                        src={item.avatar}
                        alt=""
                      />
                      <span className=" bg-slate-50 rounded-full absolute right-0 bottom-0">
                        <FcPlus size={22} />
                      </span>
                    </div>
                    <div className=" flex items-center">
                      <p>Anda</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className=" flex gap-5">
              {dummy.map((item: Dummy) => {
                return (
                  <div className=" flex flex-col gap-1 items-center">
                    <div className=" w-16 h-16 rounded-full">
                      <img
                        className=" w-full h-full rounded-full object-cover bg-slate-300"
                        src={item.avatar}
                        alt=""
                      />
                    </div>
                    <div className=" text-sm">
                      <p>{item.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {children}
      </div>
      <div className=" fixed bottom-0 w-full">
        <Navbar />
      </div>
    </div>
  );
}
