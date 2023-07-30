import axios from "axios";
import Cookies from "js-cookie";

const editProfileHandler = async (
  username,
  avatar,
  toggle,
  count,
  setCount
) => {
  const id = Cookies.get("userId");
  const token = Cookies.get("token");
  try {
    const userUpdate = new FormData();
    userUpdate.append("username", username);
    userUpdate.append("file", avatar);

    const item = Object.fromEntries(userUpdate);
    const response = await axios.patchForm(
      `https://nolife-backend.vercel.app//api/v11/no-life/post/update-avatar/${id}`,
      item,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.data;
    setCount(count + 1);
    toggle(false);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default editProfileHandler;
