"use client";

import Link from "next/link";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Home() {
  useEffect(() => {
    const socket = io("http://localhost:3000"); // Replace with your server's URL
    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className=" bg-slate-50 h-screen flex justify-center items-center">
      <div className=" font-montserrat">
        <h1 className=" text-3xl font-geologica">Welcome to No-life</h1>
        <div className=" flex justify-center">
          <Link href="/auth" className=" bg-slate-100 p-2 rounded-lg shadow-sm">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
