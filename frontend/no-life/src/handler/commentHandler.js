import axios from "axios";
import Cookies from "js-cookie";

const commentHandler = async (postId, data, setComment, count, setCount) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v11/no-life/post/give-comment/${postId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.data;
    setComment("");
    setCount(count + 1);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default commentHandler;
