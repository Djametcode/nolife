/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";

import getAllPost from "@/handler/getAllPost";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { RiSendPlaneFill, RiChat1Line } from "react-icons/ri";
import likeHandler from "@/handler/likeHandler";
import Cookies from "js-cookie";
import { IoClose } from "react-icons/io5";
import getPostComment from "@/handler/geteCommentPost";
import timeConverter from "@/handler/timeConvet";
import postCommentHandler from "@/handler/postComment";
import getCurrentUser from "@/handler/getCurrentUser";

interface Video {
  _id: string;
  images: string;
  createdBy: {
    _id: string;
    avatar: string;
    username: string;
  };
  text: string;
  comments: any[];
  like: any[];
}

export default function ReelComponent() {
  const [video, setVideo] = useState<Video[]>([]);
  const [refresher, setRefresher] = useState<number>(0);
  const [isComment, setIsComment] = useState<boolean>(false);
  const [comment, setComment] = useState([]);
  const [commentText, setCommentText] = useState<string>("");
  const [savedPostId, setPostId] = useState<string>("");
  const [user, setuser] = useState([]);

  const getVideo = async () => {
    try {
      const response = await getAllPost();
      const user = await getCurrentUser();
      console.log(response);
      const format = response.data.filter((item: { images: string }) =>
        item.images.toLowerCase().includes("video")
      );
      console.log(format);
      setVideo(format);
      setuser(user.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getComment = async (postId: string) => {
    console.log(postId);
    try {
      const response = await getPostComment(postId);
      console.log(response);
      setComment(response?.data.data);
      setPostId(postId);
      setIsComment(true);
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async (postId: string, text: string) => {
    try {
      const response = await postCommentHandler(postId, text);
      console.log(response);
      getComment(postId);
      setCommentText("");
      setRefresher(refresher + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideo();
  }, [refresher]);
  return (
    <div className=" w-full h-full overflow-scroll snap-mandatory snap-y bg-black">
      <div className=" z-20 fixed bg-transparent top-5 left-5 text-2xl font-figtree font-extrabold text-white">
        <h1>Reels</h1>
      </div>
      {isComment ? (
        <div className=" z-40 w-full h-full rounded-tr-3xl rounded-tl-3xl fixed bottom-0 top-10 bg-slate-100">
          <div className=" p-3 flex justify-center items-center font-figtree border-b h-16 border-slate-300">
            <h1 className=" text-black">Komentar</h1>
            <div
              onClick={() => setIsComment(false)}
              className=" cursor-pointer absolute right-5"
            >
              <IoClose />
            </div>
          </div>
          <div className=" overflow-scroll">
            {comment.map(
              (item: {
                commentText: string;
                createdBy: {
                  username: string;
                  avatar: string;
                };
                like: any[];
                reply: any[];
                time: Date;
              }) => {
                return (
                  <div className=" relative w-full h-full p-3 flex gap-4 font-figtree">
                    <div className=" w-10 h-10">
                      <img
                        className=" w-full h-full object-contain rounded-full"
                        src={item.createdBy.avatar}
                        alt=""
                      />
                    </div>
                    <div className=" flex flex-col gap-1">
                      <div className=" flex gap-3 items-center">
                        <p className=" text-sm font-extrabold">
                          {item.createdBy.username}
                        </p>
                        <p className=" text-xs">{timeConverter(item.time)}</p>
                      </div>
                      <p className=" text-xs">{item.commentText}</p>
                      <div className=" flex gap-3 text-slate-400">
                        <p className=" text-xs">
                          {item.like.length.toString()} suka
                        </p>
                        <button className=" text-xs">Reply</button>
                      </div>
                    </div>
                    <div className=" absolute right-5 top-8 flex h-full">
                      <FaRegHeart size={15} />
                    </div>
                  </div>
                );
              }
            )}
            <div className=" absolute bottom-14 w-full z-40">
              <div className=" w-full h-16 flex gap-5 items-center p-3">
                {user.map((item: { avatar: string; _id: string }) => {
                  return (
                    <div className=" flex items-center w-10 h-10">
                      <img className=" rounded-full" src={item.avatar} alt="" />
                    </div>
                  );
                })}
                <div className=" w-full">
                  <input
                    value={commentText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCommentText(e.target.value)
                    }
                    type="text"
                    placeholder={`tambah komentar`}
                    className=" p-2 focus:outline-none text-sm w-full bg-slate-100 font-figtree"
                  />
                </div>
                <div>
                  <button
                    onClick={() => postComment(savedPostId, commentText)}
                    className=" bg-black text-white pl-3 pr-3 rounded-lg font-figtree"
                  >
                    kirim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
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
            <div className=" absolute flex flex-col gap-2 bg-transparent bottom-36 left-3 text-2xl font-figtree font-extrabold text-white">
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
            <div className=" absolute flex flex-col gap-4 bg-transparent bottom-40 right-4 text-2xl font-figtree font-extrabold text-white">
              <div className=" flex flex-col justify-center items-center gap-1">
                {item.like.some(
                  (items) => items.likeCreator === Cookies.get("userId")
                ) ? (
                  <div className=" text-red-500">
                    <FaHeart size={20} />
                  </div>
                ) : (
                  <div
                    onClick={() =>
                      likeHandler(item._id, refresher, setRefresher)
                    }
                    className=" cursor-pointer"
                  >
                    <FaRegHeart size={22} />
                  </div>
                )}
                <p className=" text-base">{item.like.length}</p>
              </div>
              <div
                onClick={() => getComment(item._id)}
                className=" cursor-pointer flex flex-col justify-center items-center gap-1"
              >
                <RiChat1Line size={22} />
                <p className=" text-base">{item.comments.length}</p>
              </div>
              <div className=" flex flex-col justify-center items-center gap-1">
                <RiSendPlaneFill size={22} />
              </div>
              <div className=" flex flex-col justify-center items-center gap-1">
                <BsThreeDots size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
