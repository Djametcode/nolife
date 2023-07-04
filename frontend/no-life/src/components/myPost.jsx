import { useLoaderData } from "react-router-dom";

const MyPost = () => {
  const items = useLoaderData();
  const { data } = items;
  //grid grid-rows-[175px_175px_175px_175px_175px_175px_175px] grid-flow-row-dense grid-cols-[1fr_1fr]

  return (
    <div className=" max-sm:pt-24 max-sm:pb-24 font-geologica">
      <h1 className=" p-2">My Post</h1>
      <hr />

      <div className=" flex flex-wrap justify-start">
        {data.length === 0 ? (
          <p>No post Yet .....</p>
        ) : (
          data.map((item) => (
            <div className=" flex flex-col h-44 basis-1/3 gap-3 bg-slate-100 p-3 text-sm border">
              <p>{item.text}</p>
              {item.images === "" ? null : (
                <img
                  className=" bg-cover h-[100px] rounded-lg object-cover w-[175px]"
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
