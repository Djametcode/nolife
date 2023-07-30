/* eslint-disable react/jsx-key */
import deletePostHandler from "../handler/deletePostHandler";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const MyPost = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const getMyPost = async () => {
    try {
      const response = await axios.get(
        "https://nolife-backend.vercel.app/api/v11/no-life/post/get-my-post",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const result = await response.data;
      const { data } = result;
      setData(data);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyPost();
  }, [refresh]);

  return (
    <div className=" font-montserrat max-sm:h-full md:pt-24 md:pb-12 max-sm:pb-14 flex flex-col gap-2 max-sm:p-3">
      <div>
        <h1>{data.username}</h1>
      </div>
      <div className=" flex flex-wrap justify-start">
        {data.length === 0 ? (
          <div className=" p-3 h-full flex justify-center items-center w-screen">
            <p>No post Yet .....</p>
          </div>
        ) : (
          data.map((item) => (
            <div
              key={item._id}
              className=" relative rounded-lg flex flex-col h-48 md:basis-1/3 basis-1/2 gap-3 bg-slate-100 border text-sm"
            >
              {item.images === "" ? (
                <p className=" pl-2 pt-2">{item.text}</p>
              ) : (
                <img
                  className=" rounded-lg bg-cover h-full object-cover w-full"
                  src={item.images}
                />
              )}
              <div
                onClick={() => deletePostHandler(item._id, setRefresh, refresh)}
                className=" cursor-pointer absolute bottom-3 right-3 bg-slate-50 shadow-sm p-2 rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className=" w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPost;
