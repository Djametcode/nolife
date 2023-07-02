/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const LandingUser = () => {
  const item = useLoaderData();
  const { msg, data } = item;
  console.log(data);

  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return (
    <div className=" flex flex-col items-center max-sm:pt-16 max-sm:p-3 max-sm:pb-24 pt-20 w-full pb-20">
      {/* <div className=" font-geologica p-5 fixed top-20 bg-primary w-full">
        <h1>All Posts</h1>
      </div> */}
      {data.map((item) => (
        <div
          key={item._id}
          className=" relative bg-slate-100 shadow flex flex-col gap-3 m-3 h-full max-sm:w-full w-[500px] overflow-scroll font-geologica p-3 rounded-lg"
        >
          <div className=" flex gap-3 items-center border-b">
            <div className="avatar">
              <div className=" w-16 rounded-full">
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
          <p>{item.text}</p>
          <div className=" pb-14 flex justify-center">
            {item.images === "" ? null : (
              <img className=" rounded-lg w-full h-72" src={item.images} />
            )}
          </div>
          <div className=" max-sm:text-sm absolute bottom-5 left-5 flex gap-3">
            <p>{item.like.length} suka</p>
            <p>{item.comments.length} comment</p>
            <p>{item.share.length} share</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandingUser;
