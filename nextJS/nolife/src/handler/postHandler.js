import axios from "axios";

export const postHandler = async (event, file, text, setSending, navigate) => {
  event.preventDefault();

  const data = new FormData();

  if (file === null) {
    data.append("text", text);
  } else {
    data.append("text", text);
    data.append("file", file);
  }

  try {
    setSending(true);
    const response = await axios.post(
      "https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/post/create-post",
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    await response.data;
    setSending(false);
    await navigate.push("/landing");
  } catch (error) {
    console.log(error);
  }
};
