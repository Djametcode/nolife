import axios from "axios";
import Cookies from "js-cookie";

const deletePostHandler = async (postId, refresher, refreshState) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.delete(
      `https://nolife-backend.vercel.app//api/v11/no-life/post/delete-post/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.data;
    refresher(refreshState + 1);
    console.log("I am called");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default deletePostHandler;
