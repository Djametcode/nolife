/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";

import getAllPost from "@/handler/getAllPost";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { RiSendPlaneFill, RiChat1Line } from "react-icons/ri";

interface Video {
  images: string;
  createdBy: {
    avatar: string;
    username: string;
  };
  text: string;
  comments: any[];
  like: any[];
}

export default function ReelComponent() {
  const [video, setVideo] = useState<Video[]>([]);
  const getVideo = async () => {
    try {
      const response = await getAllPost();
      console.log(response);
      const format = response.data.filter((item: { images: string }) =>
        item.images.toLowerCase().includes("video")
      );
      console.log(format);
      setVideo(format);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);
  return (
    <div className=" w-full h-full overflow-scroll snap-mandatory snap-y bg-black">
      <div className=" z-20 fixed bg-transparent top-5 left-5 text-2xl font-figtree font-extrabold text-white">
        <h1>Reels</h1>
      </div>
      {video.map((item: Video) => {
        return (
          <div
            key={item.images}
            className=" z-10 relative w-full h-full snap-center pb-14"
          >
            <video
              className="max-sm:w-full max-sm:h-full object-cover"
              src={item.images}
              controls
              controlsList="nodownload"
            />
            <div className=" absolute flex flex-col gap-2 bg-transparent bottom-40 left-3 text-2xl font-figtree font-extrabold text-white">
              <div className=" flex gap-4 items-center">
                <div className=" w-12 h-12">
                  <img
                    className="w-full h-full object-contain rounded-full"
                    src={item.createdBy.avatar}
                    alt=""
                  />
                </div>
                <div className=" text-lg">
                  <p>{item.createdBy.username}</p>
                </div>
              </div>
              <div className=" font-figtree text-base">
                <p>{item.text}</p>
              </div>
            </div>
            <div className=" absolute flex flex-col gap-5 bg-transparent bottom-44 right-7 text-2xl font-figtree font-extrabold text-white">
              <div className=" flex flex-col justify-center items-center gap-2">
                <FaRegHeart size={28} />
                <p className=" text-base">{item.like.length}</p>
              </div>
              <div className=" flex flex-col justify-center items-center gap-2">
                <RiChat1Line size={28} />
                <p className=" text-base">{item.comments.length}</p>
              </div>
              <div className=" flex flex-col justify-center items-center gap-2">
                <RiSendPlaneFill size={28} />
                <p className=" text-base">{item.like.length}</p>
              </div>
              <div className=" flex flex-col justify-center items-center gap-2">
                <BsThreeDots size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
