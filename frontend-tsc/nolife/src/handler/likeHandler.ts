import axios from "axios";
import Cookies from "js-cookie";
import React, { Dispatch, SetStateAction } from "react";


const likeHandler = async (postId: string, refresher: number, refresherSet: Dispatch<SetStateAction<number>>) => {
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
        refresherSet(refresher + 1)
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

export default likeHandler;
