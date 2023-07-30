/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import likeHandler from "../handler/likeHandler";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";
import commentHandler from "../handler/commentHandler";
import getCurrentUser from "../handler/getCurrentUser";

const Comments = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentCount, commentAdded] = useState(0);
  const [user, setUser] = useState({});

  const getAllPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://nolife-backend.vercel.app//api/v11/no-life/post/get-all-post",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
      const filter = result.data.filter((item) => item._id === id);
      setData(filter);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const likes = useSelector((state) => state.auth.isLike);

  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      getAllPost();
      clearInterval(interval);
    }, 3000);
  }, [likes, commentCount]);

  useEffect(() => {
    const getCurrUser = async () => {
      try {
        const response = await getCurrentUser();
        console.log(response);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrUser();
  }, []);

  const [comment, setComment] = useState("");
  const commentData = {
    text: comment,
  };
  return (
    <div className=" flex flex-col max-sm:h-screen items-center max-sm:pt-0 max-sm:pb-24 pt-20 w-full pb-20">
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
          <p>Reply</p>
        </div>
      </div>
      {loading ? (
        <div className=" w-full h-screen flex justify-center items-center">
          <span className="loading loading-bars loading-md"></span>
        </div>
      ) : (
        data.map((item) => (
          <Fragment>
            <div
              className={` gap-y-3 grid grid-cols-[17%_85%] grid-rows-[12,5%_12,5%_50%_25%] w-full font-geologica p-5`}
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
            <div
              className={` gap-y-3 grid grid-cols-[17%_85%] grid-rows-[12,5%_12,5%_50%_25%] w-full font-geologica p-5`}
            >
              <div className=" row-span-2">
                <div className=" flex justify-start">
                  {user.avatar === "" ? (
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
                      src={user.avatar}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div>
                <p>{user.username}</p>
                <input
                  className=" focus:outline-none font-montserrat text-xs"
                  type="text"
                  placeholder={`Reply ${item.createdBy.username} ..`}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
            <div className=" w-full font-geologica text-sm p-3 flex justify-end">
              <button
                onClick={() =>
                  commentHandler(
                    item._id,
                    commentData,
                    setComment,
                    commentCount,
                    commentAdded
                  )
                }
                className=" bg-slate-50 shadow-sm p-2 rounded-lg"
              >
                Post comment
              </button>
            </div>
          </Fragment>
        ))
      )}
    </div>
  );
};

export default Comments;
