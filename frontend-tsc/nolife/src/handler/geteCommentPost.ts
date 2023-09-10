import axios from "axios"
import Cookies from "js-cookie"

const getPostComment = async (postId: string) => {
    try {
        const response = await axios.get(`https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/post/comment?id=${postId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

export default getPostComment