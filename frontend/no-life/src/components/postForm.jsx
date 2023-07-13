import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const [text, setText] = useState(null);
  console.log(text);
  const [file, setFile] = useState(null);

  const postHandler = async (event) => {
    event.preventDefault();

    const data = new FormData();

    if (file === null) {
      data.append("text", text);
    } else {
      data.append("text", text);
      data.append("file", file);
    }

    try {
      setSending(true);
      const response = await axios.post(
        "https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/post/create-post",
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      await response.data;
      setSending(false);
      await navigate("/welcome");
    } catch (error) {
      console.log(error);
    }
  };

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
            <button onClick={postHandler} disabled={sending}>
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
};

export default PostForm;
