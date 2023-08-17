"use client";

import { useEffect, useState } from "react";
import getAllPost from "@/handler/getAllPost";
import AllPost from "@/component/AllPost";

export default function LandingComponent() {
  const [data, setData] = useState([]);

  const getAllData = async () => {
    try {
      const response = await getAllPost();
      const { msg, data } = response;
      setData(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className=" basis-4/5">
      <AllPost data={data} />
    </div>
  );
}
