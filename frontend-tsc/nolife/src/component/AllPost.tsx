import React from "react";
import PostDetail from "./postDetail";

interface Post {
  data: any[];
}

const AllPost: React.FC<Post> = ({ data }) => {
  return (
    <div>
      {data.map((item) => {
        return (
          <PostDetail
            text={item.text}
            comments={item.comments}
            images={item.iamges}
            likes={item.likes}
            id={item._id}
            createdBy={item.createdBy}
          />
        );
      })}
    </div>
  );
};

export default AllPost;
