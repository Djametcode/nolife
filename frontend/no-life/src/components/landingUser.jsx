/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import likeHandler from "../handler/likeHandler";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LandingUser = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  console.log(data);
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

  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      getAllPost();
      clearInterval(interval);
    }, 3000);
  }, [likes]);
  return (
    <div className=" flex flex-col items-center max-sm:pt-16 max-sm:pb-24 pt-20 w-full pb-20">
      {loading ? (
        <div className=" w-full h-screen flex justify-center items-center">
          <span className="loading loading-bars loading-md"></span>
        </div>
      ) : (
        data.map((item) => (
          <div
            className={` gap-y-3 grid grid-cols-[17%_85%] grid-rows-[12,5%_12,5%_75%] w-full font-geologica p-5 border-b`}
          >
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
              <div
                className=" cursor-pointer"
                onClick={() => likeHandler(item._id, dispatch)}
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
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
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
            <div className=" col-start-2 flex justify-start items-center gap-2 text-sm text-gray-400">
              <p>{item.comments.length} reply</p>
              <div className=" w-1 h-1 rounded-full bg-black"></div>
              <p>{item.like.length} likes</p>
            </div>
          </div>
          // <div className=" grid grid-cols-5 grid-rows-4 w-full grid-flow-row-dense">
          //   <div className=" col-span-3 flex justify-center items-center">1</div>
          //   <div className=" col-span-4 row-span-3">2</div>
          //   <div>3</div>
          //   <div>4</div>
          //   <div>5</div>
          //   <div>6</div>
          //   <div>7</div>
          //   <div>8</div>
          //   <div>9</div>
          //   <div>10</div>
          // </div>
          // <div
          //   key={item._id}
          //   className=" relative bg-slate-100 shadow flex flex-col gap-3 m-3 max-sm:w-full w-[500px] overflow-scroll font-geologica p-3 rounded-lg"
          // >
          //   <div className=" flex gap-3 items-center">
          //     <div className="avatar">
          //       <div className=" w-10 rounded-full">
          //         {item.createdBy.avatar === "" ? (
          //           <svg
          //             fill="currentColor"
          //             viewBox="0 0 20 20"
          //             xmlns="http://www.w3.org/2000/svg"
          //             aria-hidden="true"
          //           >
          //             <path
          //               clipRule="evenodd"
          //               fillRule="evenodd"
          //               d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
          //             />
          //           </svg>
          //         ) : (
          //           <img src={item.createdBy.avatar} />
          //         )}
          //       </div>
          //     </div>
          //     <p>{item.createdBy.username}</p>
          //   </div>
          //   <div>
          //     <p>{item.text}</p>
          //   </div>
          //   <div className=" pb-14 flex justify-center">
          //     {item.images === "" ? null : (
          //       <img
          //         className=" rounded-lg w-full max-h-60 object-cover"
          //         src={item.images}
          //       />
          //     )}
          //   </div>
          //   <div className=" max-sm:text-sm absolute bottom-3 left-3 flex flex-col gap-3">
          //     <div className=" flex gap-3">
          //       <div className=" flex items-center gap-2">
          //         <img
          //           onClick={() => likeHandler(item._id, dispatch)}
          //           className=" cursor-pointer w-6"
          //           src="/like-svgrepo-com.svg"
          //           alt=""
          //         />
          //         <p>{item.like.length}</p>
          //       </div>
          //       <div
          //         onClick={() => navigate(`comment/${item._id}`)}
          //         className=" cursor-pointer flex gap-2 items-center"
          //       >
          //         <img className=" w-6" src="/chat-svgrepo-com.svg" alt="" />
          //         <p>{item.comments.length}</p>
          //       </div>
          //     </div>
          //   </div>
          //   <div className=" absolute top-3 right-3">
          //     <img className=" w-6" src="/share-svgrepo-com.svg" alt="" />
          //   </div>
          // </div>
        ))
      )}
    </div>
  );
};

export default LandingUser;
