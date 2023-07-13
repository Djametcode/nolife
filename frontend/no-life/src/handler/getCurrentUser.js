import axios from "axios";
import Cookies from "js-cookie";

const getCurrentUser = async () => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(
      `https://wandering-undershirt-dog.cyclic.app /api/v11/no-life/post/get-current-user/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.data;

    return result;
  } catch (error) {
    console.log(error);
  }
};

export default getCurrentUser;
