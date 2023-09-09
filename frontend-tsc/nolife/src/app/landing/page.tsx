/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Fragment, useEffect, useState } from "react";
import getAllPost from "@/handler/getAllPost";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { RiSendPlaneFill, RiChat1Line, RiBookmarkLine } from "react-icons/ri";
import Link from "next/link";

export default function LandingComponent() {
  const [data, setData] = useState([]);
  console.log(data);

  const getAllData = async () => {
    try {
      const response = await getAllPost();
      const { msg, data } = response;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className=" max-sm:w-full max-sm:h-full">
      {data.map(
        (item: {
          createdBy: {
            avatar: string;
            username: string;
          };
          images: string;
          text: string;
          like: any[];
          comments: any[];
          _id: string;
        }) => {
          return (
            <div
              key={item._id}
              className=" bg-slate-50 max-sm:w-full max-sm:h-[500px] max-sm:flex max-sm:flex-col font-figtree"
            >
              <div className=" bg-slate-100 flex text-black max-sm:h-16 items-center max-sm:gap-5 max-sm:p-3">
                <div className=" w-11 h-11">
                  <img
                    className=" w-full h-full object-cover rounded-full"
                    src={item.createdBy.avatar}
                    alt=""
                  />
                </div>
                <p>{item.createdBy.username}</p>
                <div className=" absolute right-5">
                  <BsThreeDots size={25} />
                </div>
              </div>
              <div className=" overflow-scroll max-sm:h-full">
                {item.images === "" ? (
                  <div className=" p-5">
                    <p>{item.text}</p>
                  </div>
                ) : (
                  <img
                    className=" h-full w-full object-cover"
                    src={item.images}
                    alt=""
                  />
                )}
              </div>
              <div className=" bg-slate-100">
                <div className=" flex max-sm:gap-3 max-sm:p-3">
                  <div className=" flex items-center gap-2 text-xs">
                    <FaRegHeart size={20} />
                    <p>{item.like.length}</p>
                  </div>
                  <div className=" flex items-center gap-2 text-xs">
                    <RiChat1Line size={24} />
                    <p>{item.comments.length}</p>
                  </div>
                  <div className=" items-center">
                    <RiSendPlaneFill size={20} />
                  </div>
                  <div className=" absolute right-5 items-center">
                    <RiBookmarkLine size={20} />
                  </div>
                </div>
                <div className=" max-sm:text-sm max-sm:pl-3 max-sm:items-center max-sm:pb-3 max-sm:pt-0 max-sm:flex max-sm:gap-1">
                  <p className=" font-extrabold">{item.createdBy.username}</p>
                  <p className=" text-gray-700">{item.text}</p>
                </div>
                <div className=" text-sm m-0 pl-3 text-slate-700">
                  <Link href={"/"}>Lihat semua komentar</Link>
                </div>
                <div className=" max-sm:p-3 max-sm:flex max-sm:gap-3 max-sm:items-center">
                  <div className=" w-7 h-7">
                    <img
                      className=" w-full h-full rounded-full object-cover"
                      src={item.createdBy.avatar}
                      alt=""
                    />
                  </div>
                  <div>
                    <input
                      className=" bg-slate-100 max-sm:placeholder:text-sm max-sm:font-figtree max-sm:focus:outline-none"
                      type="text"
                      placeholder="write comment .."
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
