"use client";

/* eslint-disable react/jsx-key */
import Navbar from "@/component/navbar";
/* eslint-disable @next/next/no-img-element */
import SideBarLarge from "@/component/sidebar";

interface Children {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: Children) {
  return (
    <div className=" max-sm:flex-col flex w-screen h-screen">
      <div className=" max-sm:hidden fixed w-72 h-full pt-8 pb-5 pl-10 border-r bg-slate-100 font-figtree">
        <SideBarLarge />
      </div>
      <div className=" md:flex md:justify-center md:w-full">{children}</div>
      <div className=" fixed bottom-0 w-full">
        <Navbar />
      </div>
    </div>
  );
}
