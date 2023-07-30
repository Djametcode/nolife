/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Activity = () => {
  const token = Cookies.get("token");
  const [user, setUser] = useState([]);
  console.log(user);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        `https://nolife-backend.vercel.app/api/v11/no-life/post/get-current-user/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      setUser(result.data[0].notif);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <div className=" h-screen w-screen">
      <h1 className=" p-3 pb-0 font-geologica text-xl">Activity</h1>
      <div className=" p-3">
        <hr />
      </div>
      <div className=" m-2 flex flex-col gap-2">
        {user.map((items) => (
          <div className=" bg-slate-200 font-montserrat p-3 text-sm rounded-lg">
            <p>{items.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
