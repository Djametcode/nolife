"use client";

import Navbar from "@/component/navbar";
import React, { Children, ReactNode, useState } from "react";

interface Children {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: Children) {
  return (
    <div>
      {children}
      <div className=" fixed bottom-0 w-full">
        <Navbar />
      </div>
    </div>
  );
}
