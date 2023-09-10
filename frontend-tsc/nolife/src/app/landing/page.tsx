/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import getAllPost from "@/handler/getAllPost";
import getCurrentUser from "@/handler/getCurrentUser";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { RiSendPlaneFill, RiChat1Line, RiBookmarkLine } from "react-icons/ri";
import Link from "next/link";
import timeConverter from "@/handler/timeConvet";
import likeHandler from "@/handler/likeHandler";
import Cookies from "js-cookie";
import getPostComment from "@/handler/geteCommentPost";
import { IoClose } from "react-icons/io5";
import postCommentHandler from "@/handler/postComment";

export default function LandingComponent() {
  const [data, setData] = useState([]);
  const [user, setuser] = useState([]);
  const [comment, setComment] = useState([]);
  const [isComment, setIsComment] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  console.log(comment);
  console.log(data);
  console.log(commentText);
  const [refresher, setRefresher] = useState<number>(0);

  const getAllData = async () => {
    try {
      const response = await getAllPost();
      const user = await getCurrentUser();
      const { msg, data } = response;
      setData(data);
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
      setIsComment(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, [refresher]);

  const postComment = async (postId: string, text: string) => {
    try {
      const response = await postCommentHandler(postId, text);
      console.log(response);
      getComment(postId);
    } catch (error) {
      console.log(error);
    }
  };

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
          timePosted: Date;
        }) => {
          return (
            <div
              key={item._id}
              className=" relative bg-slate-50 max-sm:w-full max-sm:h-[700px] max-sm:flex max-sm:flex-col font-figtree"
            >
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
                                <p className=" text-base font-extrabold">
                                  {item.createdBy.username}
                                </p>
                                <p className=" text-xs">
                                  {timeConverter(item.time)}
                                </p>
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
                              <img
                                className=" rounded-full"
                                src={item.avatar}
                                alt=""
                              />
                            </div>
                          );
                        })}
                        <div className=" w-full">
                          <input
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setCommentText(e.target.value)}
                            type="text"
                            placeholder={`tambah komentar untuk ${item.createdBy.username}`}
                            className=" p-2 focus:outline-none text-sm w-full bg-slate-100 font-figtree"
                          />
                        </div>
                        <div>
                          <button
                            onClick={(e: React.MouseEvent) =>
                              postComment(item._id, commentText)
                            }
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
              <div className=" bg-slate-50 flex text-black max-sm:h-16 items-center max-sm:gap-3 max-sm:p-3">
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
              <div className=" overflow-scroll bg-white max-sm:h-full">
                {item.images === "" ? (
                  <div className=" h-full w-full bg-black text-white p-3 text-sm">
                    <p>{item.text}</p>
                  </div>
                ) : item.images.toLowerCase().includes("video") ? (
                  <div className=" flex bg-black justify-center w-full h-full">
                    <video
                      controls
                      className=" w-full"
                      src={item.images}
                    ></video>
                  </div>
                ) : (
                  <img
                    className=" bg-black h-full w-full object-contain"
                    src={item.images}
                    alt=""
                  />
                )}
              </div>
              <div className=" bg-slate-50">
                <div className=" flex max-sm:gap-3 max-sm:p-3">
                  <div className=" flex items-center gap-2 text-xs">
                    {item.like.some(
                      (items) => items.likeCreator === Cookies.get("userId")
                    ) ? (
                      <div>
                        <AiFillHeart size={20} />
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          likeHandler(item._id, refresher, setRefresher)
                        }
                        className=" cursor-pointer"
                      >
                        <FaRegHeart size={20} />
                      </div>
                    )}
                    <p>{item.like.length}</p>
                  </div>
                  <div
                    onClick={() => getComment(item._id)}
                    className=" cursor-pointer flex items-center gap-2 text-xs"
                  >
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
                <div className=" max-sm:text-sm max-sm:pl-3 max-sm:pb-3 max-sm:pt-0 max-sm:flex max-sm:flex-col max-sm:gap-1">
                  <div className=" flex gap-2">
                    <p className=" font-extrabold">{item.createdBy.username}</p>
                    <p className=" text-gray-700">{item.text}</p>
                  </div>
                  <div className=" text-sm m-0 max-sm:text-slate-400">
                    <Link href={"/"}>Lihat semua komentar</Link>
                  </div>
                  <div className=" max-sm:flex max-sm:gap-3 max-sm:items-center">
                    <div className=" w-7 h-7">
                      {user.map((item: { avatar: string; _id: string }) => {
                        return (
                          <div key={item._id} className=" w-7 h-7">
                            <img
                              className=" w-full h-full object-cover rounded-full"
                              src={item.avatar}
                              alt=""
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <input
                        className=" bg-slate-50 max-sm:placeholder:text-sm max-sm:font-figtree max-sm:focus:outline-none"
                        type="text"
                        placeholder="write comment .."
                      />
                    </div>
                  </div>
                  <div>
                    <p className=" text-xs">
                      {timeConverter(item.timePosted)} yang lalu
                    </p>
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
