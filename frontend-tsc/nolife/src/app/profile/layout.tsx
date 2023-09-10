/* eslint-disable react/jsx-key */
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/component/navbar";
import getCurrentUser from "@/handler/getCurrentUser";
import { BiLockAlt } from "react-icons/bi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Children {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: Children) {
  const [user, setUser] = useState([]);
  const getUser = async () => {
    try {
      const response = await getCurrentUser();
      console.log(response);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const router = useRouter();
  const token = Cookies.get("token");
  useEffect(() => {
    token ? router.push("/landing") : router.push("/auth");
  }, [router, token]);
  return (
    <div>
      <div className=" h-16 flex item-center p-3">
        <BiLockAlt size={25} />
        {user.map((item: { username: string }) => {
          return (
            <div className=" h-full flex items-center">
              <p>{item.username}</p>
            </div>
          );
        })}
      </div>
      {children}
      <div className=" fixed bottom-0 w-full">
        <Navbar />
      </div>
    </div>
  );
}
