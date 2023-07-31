"use client";

import getAllPost from "@/handler/getAllPost";
import { useEffect, useState } from "react";
import timeConverter from "@/handler/timeConverter";
import Cookies from "js-cookie";
import LikeComponent from "@/components/likeComponent";
import UnLikeComponent from "@/components/unlikeComponent";

export default function LandingComponent() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getAllData = async () => {
    try {
      setLoading(true);
      const item = await getAllPost();
      setData(item.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <div className=" md:bg-slate-200 pt-16 md:max-w-2xl flex flex-col items-center max-sm:pb-14 w-full pb-20">
      {loading ? (
        <div className=" w-full h-screen flex justify-center items-center">
          <span className="loading loading-bars loading-md"></span>
        </div>
      ) : (
        data.map((item) => (
          <div
            key={item._id}
            className={` relative gap-y-3 grid grid-cols-[17%_85%] grid-rows-[12,5%_12,5%_75%] w-full font-geologica p-5 border-b`}
          >
            <div className=" absolute right-3 top-3 text-xs font-montserrat">
              <p>{timeConverter(item.timePosted)}</p>
            </div>
            <div className=" row-span-3">
              <div className=" flex justify-start">
                {item.createdBy.avatar === "" ? (
                  <div>
                    <img
                      className=" w-12 h-12 object-cover rounded-full"
                      src="/Blank-Avatar.png"
                      alt=""
                    />
                  </div>
                ) : (
                  <img
                    className=" w-12 h-12 object-cover rounded-full"
                    src={item.createdBy.avatar}
                    alt=""
                  />
                )}
              </div>
            </div>
            <div>
              <p>{item.createdBy.username}</p>
              <p className=" font-montserrat text-sm">{item.text}</p>
            </div>
            {item.images === "" ? null : (
              <div>
                <img className=" rounded-lg" src={item.images} alt="" />
              </div>
            )}
            <div className=" col-start-2 flex gap-3">
              {item.like.some(
                (items) => items.likeCreator === Cookies.get("userId")
              ) ? (
                <UnLikeComponent id={item._id} />
              ) : (
                <LikeComponent id={item._id} />
              )}
              <div
                className=" cursor-pointer"
                onClick={() => navigate(`comment/${item._id}`)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                  />
                </svg>
              </div>
            </div>
            <div className=" col-start-2 flex justify-start items-center gap-2 text-xs text-gray-400 font-montserrat">
              <p
                onClick={() => navigate(`comment-list/${item._id}`)}
                className=" cursor-pointer"
              >
                {item.comments.length} reply
              </p>
              <div className=" w-1 h-1 rounded-full bg-black"></div>
              <p>{item.like.length} likes</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
