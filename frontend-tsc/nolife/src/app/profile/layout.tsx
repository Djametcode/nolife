/* eslint-disable react/jsx-key */
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/component/navbar";
import getCurrentUser from "@/handler/getCurrentUser";

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

  return (
    <div className=" w-full h-full">
      {children}
      <div className=" fixed bottom-0 w-full">
        <Navbar />
      </div>
    </div>
  );
}
