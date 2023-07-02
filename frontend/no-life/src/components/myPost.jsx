import { useLoaderData } from "react-router-dom";

const MyPost = () => {
  const items = useLoaderData();
  console.log(items);
  const { data } = items;
  return (
    <div className=" max-sm:p-5">
      <h1>My Post</h1>
      <hr />
      <div className=" p-5">
        {data.length === 0 ? <p>No post Yet .....</p> : <h1>Wait .....</h1>}
      </div>
    </div>
  );
};

export default MyPost;
