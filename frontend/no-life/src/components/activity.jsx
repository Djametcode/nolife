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
        `https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/post/get-current-user/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      setUser(result.data);
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
      <div className=" bg-slate-100 m-3 rounded-lg">
        {user.map((item) =>
          item.notif.map((items) => (
            <div className=" font-geologica p-3 text-sm">
              <p>{items.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Activity;
