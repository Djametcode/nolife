import axios from "axios";
import Cookies from "js-cookie";
import { authAction } from "../redux/store";


const likeHandler = async (postId, dispatch) => {
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
    dispatch(authAction.likePost());
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default likeHandler;
