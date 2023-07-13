import axios from "axios";
import Cookies from "js-cookie";

const getMyPost = async () => {
  try {
    const response = await axios.get(
      "https://wandering-undershirt-dog.cyclic.app /api/v11/no-life/post/get-my-post",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const result = await response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default getMyPost;
