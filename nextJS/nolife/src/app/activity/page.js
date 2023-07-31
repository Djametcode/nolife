"use client";

import getCurrentUser from "@/handler/getCurrentUser";
import { useEffect, useState } from "react";

export default function ActivityComponent() {
  const [user, setUser] = useState([]);

  const getData = async () => {
    try {
      const item = await getCurrentUser(setUser);
      setUser(item.data[0].notif);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className=" h-screen w-screen">
      <h1 className=" p-3 pb-0 font-geologica text-xl">Activity</h1>
      <div className=" p-3">
        <hr />
      </div>
      <div className=" m-2 flex flex-col gap-2">
        {user.map((items) => (
          <div
            key={items._id}
            className=" bg-slate-200 font-montserrat p-3 text-sm rounded-lg"
          >
            <p>{items.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
