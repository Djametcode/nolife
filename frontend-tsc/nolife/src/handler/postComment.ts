import axios from "axios"
import Cookies from "js-cookie"

export default async function postCommentHandler(postId: string, data: string
) {
    try {
        await axios.post(`https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/post/give-comment/${postId}`, {
            text: data
        }, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
    } catch (error) {
        console.log(error)
    }
}