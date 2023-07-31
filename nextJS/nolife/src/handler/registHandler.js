const { default: axios } = require("axios");

const registHandler = async (data) => {
  event.preventDefault();
  try {
    const response = await axios.post(
      "https://wandering-undershirt-dog.cyclic.app/api/v12/auth/regist-user",
      data
    );
    const result = await response.data;

    return console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default registHandler;
