import axios from "axios"
import Cookies from "js-cookie"

interface Data {
    username: string,
    avatar: File | null
}

export default async function updateAvatar(user_id: string, data: Data) {
    const userData = new FormData()
    userData.append('username', data.username)
    if (data.avatar) {
        userData.append('file', data.avatar)
    }

    const userDataFormat = Object.fromEntries(userData)
    try {
        const response = await axios.patchForm(`https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/post/update-avatar/${user_id}`, userDataFormat, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })

        return response
    } catch (error) {
        console.log(error)
    }
}