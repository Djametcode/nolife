import { Request, Response } from "express";
import { UserModel } from "../model/userModel";
import { PostModel } from "../model/postModel";
import { v2 as cloudinary } from 'cloudinary'

const createPost = async (req: Request, res: Response) => {
    const { postText } = req.body
    let file = req.file
    try {
        if (file) {
            const user = await UserModel.findOne({ _id: req.user.userId })
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'Testing',
                resource_type: 'auto'
            })
            const postDetail = new PostModel({
                postText: postText,
                postImage: result.secure_url,
                createdBy: req.user.userId,
            })
            const newPost = await PostModel.create(postDetail)
            const pushData = user?.post.push({ postId: newPost._id })
            await user?.save()


            return res.status(200).json({ msg: 'Success with image', newPost, pushData })
        }
    } catch (error) {
        console.log(error)
    }
}

export { createPost }