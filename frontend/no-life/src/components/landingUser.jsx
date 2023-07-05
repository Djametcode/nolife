/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import likeHandler from "../handler/likeHandler";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const LandingUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/post/get-all-post",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const result = await response.data;
      setData(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const likes = useSelector((state) => state.auth.isLike);
  const toggle = useSelector((state) => state.auth.isSucess);

  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      getAllPost();
      clearInterval(interval);
    }, 3000);
  }, [likes]);
  return (
    <div className=" flex flex-col items-center max-sm:pt-16 max-sm:p-4 max-sm:pb-24 pt-20 w-full pb-20">
      {toggle && (
        <div className=" transition-all bg-success fixed bottom-11 right-5 z-40 h-12 flex justify-center font-geologica text-white rounded-lg items-center w-36">
          <p>Post Liked</p>
        </div>
      )}
      {loading ? (
        <div className=" w-full h-screen flex justify-center items-center">
          <span className="loading loading-bars loading-md"></span>
        </div>
      ) : (
        data.map((item) => (
          <div
            key={item._id}
            className=" relative bg-slate-100 shadow flex flex-col gap-3 m-3 max-sm:w-full w-[500px] overflow-scroll font-geologica p-3 rounded-lg"
          >
            <div className=" flex gap-3 items-center border-b">
              <div className="avatar">
                <div className=" w-11 rounded-full">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                    />
                  </svg>
                </div>
              </div>
              <p>{item.createdBy.username}</p>
            </div>
            <div>
              <p>{item.text}</p>
            </div>
            <div className=" pb-14 flex justify-center">
              {item.images === "" ? null : (
                <img
                  className=" rounded-lg w-full max-h-60 object-cover"
                  src={item.images}
                />
              )}
            </div>
            <div className=" max-sm:text-sm absolute bottom-3 left-3 flex flex-col gap-3">
              <div className=" flex gap-3">
                <div className=" flex items-center gap-2">
                  <img
                    onClick={() => likeHandler(item._id, dispatch)}
                    className=" cursor-pointer w-6"
                    src="/like-svgrepo-com.svg"
                    alt=""
                  />
                  <p>{item.like.length}</p>
                </div>
                <div className=" flex gap-2 items-center">
                  <img className=" w-6" src="/chat-svgrepo-com.svg" alt="" />
                  <p>{item.comments.length}</p>
                </div>
              </div>
            </div>
            <div className=" absolute top-3 right-3">
              <img className=" w-6" src="/share-svgrepo-com.svg" alt="" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LandingUser;
