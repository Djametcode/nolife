import axios from "axios";
import Cookies from "js-cookie";

const getCurrentUser = async () => {
  const userId = Cookies.get("userId");
  try {
    const response = await axios.get(
      `https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/get-current-user/${userId}`
    );
    const result = await response.data;
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export default getCurrentUser;