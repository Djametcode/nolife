"use client";

import { postHandler } from "@/handler/postHandler";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostComponent() {
  const [sending, setSending] = useState(false);
  const navigate = useRouter();
  const [text, setText] = useState(null);
  console.log(text);
  const [file, setFile] = useState(null);
  return (
    <div className=" max-sm:mt-0 mt-20 font-geologica p-5 flex flex-col justify-center gap-4">
      <h1>Create New Post</h1>
      <hr />
      <form className=" flex flex-col gap-2 font-montserrat">
        <textarea
          className="textarea textarea-bordered max-sm:w-full w-[400px] h-[200px] bg-slate-300"
          placeholder="What's on your mind?"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className=" flex items-center">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="file-input w-full max-w-xs"
          />
          <div className=" bg-neutral rounded-lg p-3 w-20 text-center text-white">
            <button
              onClick={(e) => postHandler(e, file, text, setSending, navigate)}
              disabled={sending}
            >
              {sending ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
