import Image from "next/image";

interface Detail {
  text: string;
  images: string | "";
  comments: any[];
  likes: any[];
  id: string;
  createdBy: {
    avatar: string;
    username: string;
  };
}

const PostDetail: React.FC<Detail> = ({
  text,
  images,
  comments,
  likes,
  id,
  createdBy,
}) => {
  return (
    <div className=" w-96">
      <div className=" grid grid-cols-2">
        {createdBy.avatar === "" ? (
          <div>
            <img
              className=" w-12 h-12 object-cover rounded-full"
              src="/Blank-Avatar.png"
              alt=""
            />
          </div>
        ) : (
          <div>
            <img
              className=" object-cover"
              src={createdBy.avatar ?? ""}
              alt=""
            />
          </div>
        )}
        <p>{createdBy.username}</p>
      </div>
    </div>
  );
};

export default PostDetail;
