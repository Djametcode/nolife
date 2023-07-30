/* eslint-disable react/jsx-key */
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import timeConverter from "../handler/timeConverter";

const CommentList = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const getCommentList = async () => {
    try {
      const response = await axios.get(
        `https://nolife-backend.vercel.app/api/v11/no-life/post/comment?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const item = await response.data;
      const { data, postFormat } = item;
      console.log(post);
      setPost(postFormat);
      setComment(data);
      console.log(item);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCommentList();
  }, []);

  return (
    <div>
      <div className=" w-full flex h-14 gap-5 justify-start items-center border-b font-geologic pl-5">
        <Link to="..">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=" cursor-pointer w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>
        <div className=" text-lg">
          <p>Utas</p>
        </div>
      </div>
      {post.map((item) => (
        <div
          className={` border-b gap-y-3 grid grid-cols-[17%_85%] grid-rows-[12,5%_12,5%_50%_25%] w-full font-geologica p-5`}
        >
          <div className=" row-span-2">
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
        </div>
      ))}
      {comment.map((item) => (
        <div
          className={` gap-y-3 grid grid-cols-[17%_85%] grid-rows-[12,5%_12,5%_75%] w-full font-geologica p-5 border-b`}
        >
          <div className=" absolute right-3 text-xs font-montserrat">
            <p>{timeConverter(item.time)}</p>
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
            <p className=" font-montserrat text-sm">{item.commentText}</p>
          </div>
          {item.images === "" ? null : (
            <div>
              <img className=" rounded-lg" src={item.images} alt="" />
            </div>
          )}
          <div className=" col-start-2 flex gap-3">
            <div className=" cursor-pointer">
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <div className=" cursor-pointer">
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
        </div>
      ))}
    </div>
  );
};

export default CommentList;
