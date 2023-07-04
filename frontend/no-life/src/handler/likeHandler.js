import axios from "axios";
import Cookies from "js-cookie";

const likeHandler = async (postId, setLike, like) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      `https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/post/give-like/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.data;
    setLike(like + 1);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default likeHandler;
