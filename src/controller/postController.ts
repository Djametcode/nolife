import { Request, Response } from "express";
import { UserModel } from "../model/userModel";
import { PostModel } from "../model/postModel";
import { v2 as cloudinary } from 'cloudinary'
import { Types } from "mongoose";
import { likeModel } from "../model/likeModel";

const createPost = async (req: Request, res: Response) => {
    const { postText } = req.body
    let file = req.file
    try {
        const user = await UserModel.findOne({ _id: req.user.userId })

        if (file) {
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

        const postDetail = new PostModel({
            postText: postText,
            createdBy: req.user.userId,
        })
        const newPost = await PostModel.create(postDetail)
        const pushData = user?.post.push({ postId: newPost._id })
        await user?.save()


        return res.status(200).json({ msg: 'Success with no image', newPost, pushData })
    } catch (error) {
        console.log(error)
    }
}

const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params
    const { postText } = req.body
    try {
        const selectedPost = await PostModel.findOne({ _id: id })
        console.log(selectedPost)

        if (!selectedPost) {
            return res.status(404).json({ msg: "Post not found" })
        }

        const checkOwner = selectedPost?.createdBy.toString() === req.user.userId
        console.log(checkOwner)

        if (!checkOwner) {
            return res.status(201).json({ msg: 'Only owner can modify this !' })
        }

        const post = await PostModel.findOneAndUpdate({ _id: id }, { postText: postText, ...req.body }, { new: true })

        return res.status(200).json({ msg: 'Success', post })

    } catch (error) {
        console.log(error)
    }
}

const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const post = await PostModel.findOne({ _id: id });

        if (!post) {
            return res.status(404).json({ msg: 'Post not found or deleted' })
        }

        return res.status(200).json({ msg: 'Success', post })
    } catch (error) {
        console.log(error)
    }
}

const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = await UserModel.findOne({ _id: req.user.userId })
        const post = await PostModel.findOne({ _id: id })

        const check = post?.createdBy == user?._id
        console.log(check)

        if (!check) {
            return res.status(201).json({ msg: 'Only owner can delete this' })
        }

        const deletedPost = await PostModel.findOneAndDelete({ _id: id })

        return res.status(200).json({ msg: 'Success', deletedPost })
    } catch (error) {
        console.log(error)
    }
}

const savePost = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = await UserModel.findOne({ _id: req.user.userId })
        const post = await PostModel.findOne({ _id: id })
        const savedUser = user?.savedPost.push({ postId: post?._id as Types.ObjectId })
        await user?.save()

        return res.status(200).json({ msg: 'Post saved', savedUser })
    } catch (error) {
        console.log(error)
    }
}

const likePost = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const post = await PostModel.findOne({ _id: id });
        const like = await likeModel.create({ createdBy: req.user.userId })

        const likedPost = post?.like.push({ likeId: like._id })
        await post?.save()

        return res.status(200).json({ msg: 'Success', likedPost })
    } catch (error) {
        console.log(error)
    }
}

export { createPost, updatePost, getPostById, deletePost, savePost, likePost }