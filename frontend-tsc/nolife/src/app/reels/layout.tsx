import Navbar from "@/component/navbar";
import React from "react";

interface Children {
  children: React.ReactNode;
}

export default function ReelLayout({ children }: Children) {
  return (
    <div className=" w-screen h-screen">
      {children}
      <div className=" z-40 fixed bottom-0 w-full">
        <Navbar />
      </div>
    </div>
  );
}
