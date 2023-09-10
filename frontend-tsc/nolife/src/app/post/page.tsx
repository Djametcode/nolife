"use client";

import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";

export default function PostComponent() {
  const [text, setText] = useState<string | null>(null);
  const [items, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const data = new FormData();
  data.append("text", text || ""); // Ensure text is not null
  if (items) {
    data.append("file", items);
  }

  const userData = Object.fromEntries(data);

  console.log(data);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const token = Cookies.get("token");

  const postHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.postForm(
        "https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/post/create-post",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" bg-slate-100 m-3 p-2 rounded-2xl font-figtree">
      <div className=" p-3 flex flex-col gap-5">
        <textarea
          onChange={handleTextChange}
          className=" p-3 border w-full h-[200px] rounded-xl focus:outline-none"
        />
        <input onChange={handleFile} type="file" />
      </div>
      <div className=" p-3">
        {loading ? (
          <button
            onClick={postHandler}
            className=" bg-black p-1 w-20 rounded-lg text-white"
          >
            Posting ..
          </button>
        ) : (
          <button
            onClick={postHandler}
            className=" bg-black p-1 w-20 rounded-lg text-white"
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
}
