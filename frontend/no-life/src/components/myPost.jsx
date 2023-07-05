/* eslint-disable react/jsx-key */
import { useLoaderData } from "react-router-dom";

const MyPost = () => {
  const items = useLoaderData();
  const { data } = items;
  console.log(items);
  console.log(data);
  //grid grid-rows-[175px_175px_175px_175px_175px_175px_175px] grid-flow-row-dense grid-cols-[1fr_1fr]

  return (
    <div className=" max-sm:pt-24 max-sm:pb-10 font-geologica flex flex-col">
      <div>
        <h1>{data.username}</h1>
      </div>
      <h1 className=" p-2 text-xl">My Post :</h1>
      <hr />

      <div className=" flex flex-wrap justify-start">
        {data.length === 0 ? (
          <p>No post Yet .....</p>
        ) : (
          data.map((item) => (
            <div className=" flex flex-col h-48 basis-1/2 gap-3 bg-slate-100 text-sm border">
              <p className=" pl-2 pt-2">{item.text}</p>
              {item.images === "" ? null : (
                <img
                  className=" bg-cover h-full object-cover w-full"
                  src={item.images}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPost;
