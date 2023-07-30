import axios from "axios";
import Cookies from "js-cookie";

const getAllPost = async () => {
  try {
    const response = await axios.get(
      "https://nolife-backend.vercel.app/api/v11/no-life/post/get-all-post",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const result = await response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getAllPost };
