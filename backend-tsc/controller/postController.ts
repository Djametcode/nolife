import { UserModel } from "../model/user";
import { Post, PostModel } from "../model/post";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { Like, LikeModel } from "../model/like";
import { HydratedDocument } from "mongoose";


const createPost = async (req: Request, res: Response) => {
    const { text } = req.body

    const createdBy = req.user.userId

    let file = req.file

    if (file) {
        try {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'Testing',
                resource_type: 'auto'
            })

            if (!result.secure_url) {
                return res.status(401).json({msg: 'Cloudinary error'})
            }

            const user = await UserModel.findOne({_id: req.user.userId})

            if (!user) {
                return res.status(404).json({msg: 'User not found or please login first'})
            }

            const post = await PostModel.create({
                text: text,
                images: result.secure_url,
                createdBy: createdBy
            })

            user.post.push({
                postId: post._id
            })
            await user.save()

            return res.status(200).json({msg: 'Success with image', user})

        } catch (error) {
            console.log(error)
        }
    }
    try {
        const post = await PostModel.create({text: text, createdBy: createdBy})

        return res.status(200).json({msg: 'Success', post})
    } catch (error) {
        console.log(error)
    }
}

const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params
    const { text } = req.body
    let file = req.file

    try {
        if (file) {
            const user = await UserModel.findOne({_id: req.user.userId}) 

            if (!user) {
                return res.status(401).json({msg: 'User not found or please login'})
            }

            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'Testing',
                resource_type: 'auto'
            })

            const postId = await PostModel.findOne({_id: id})

            if (postId?.createdBy.toString() !== req.user.userId) {
                return res.status(401).json({msg: "Please use correct account"})
            }
    
            const post = await PostModel.findOneAndUpdate({ _id: id }, { text: text, images: result.secure_url }, { new: true })
    
            if (!post) {
                return res.status(404).json({msg: 'Post not Found'})
            }
    
            return res.status(200).json({msg: 'Success Update Post', post})

        }

        const user = await UserModel.findOne({_id: req.user.userId}) 

        if (!user) {
            return res.status(401).json({msg: 'User not found or please login'})
        }

        const post = await PostModel.findOneAndUpdate({ _id: id }, { text: text }, { new: true })

        if (!post) {
            return res.status(404).json({msg: 'Post not Found'})
        }

        return res.status(200).json({msg: 'Success Update Post', post})
    } catch (error) {
        console.log(error)
    }
}

const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const post = await PostModel.findOneAndDelete({_id: id})
        if (!post) {
            return res.status(404).json({msg: 'Post not found or already delete'})
        }

        const currentUser = await UserModel.findOne({_id: req.user.userId})
        
        const postIndex = currentUser?.post.findIndex((item) => item.postId === post?._id)
        currentUser?.post.slice(postIndex, 1 )
        
        await currentUser?.save()
        
        return res.status(200).json({msg: 'Success', currentUser})

    } catch (error) {
        console.log(error)
    }
}

const likePost = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const post = await PostModel.findOne({_id: id});

        const check = await LikeModel.findOne({postId: id, createdBy: req.user.userId})

        if (check) {
            return res.status(401).json({msg: 'Only can like once :3'})
        }

        await LikeModel.create({postId: id, createdBy: req.user.userId})

        post?.like.push({createdBy: req.user.userId})
        await post?.save()

        return res.status(200).json({msg: "Success like", post})
    } catch (error) {
        console.log(error)
    }
}

const unLikeController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Find the post by id
        const post = await PostModel.findOne({ _id: id });

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Find and delete the like
        const like = await LikeModel.findOneAndDelete({ postId: id, createdBy: req.user.userId });

        if (!like) {
            return res.status(404).json({ msg: 'Like not found' });
        }

        // Remove the like from the post's like array
        const likeIndex = post.like.findIndex((likedItem) => likedItem.createdBy.equals(req.user.userId));
        console.log(likeIndex)

        if (likeIndex !== -1) {
            post.like.splice(likeIndex, 1);
            await post.save();

            return res.status(200).json({ msg: 'Like removed' });
        } else {
            return res.status(404).json({ msg: 'Like not found in post' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
}


const getAllPost = async (req: Request, res: Response) => {
    try {
        const post = await PostModel.find({}).populate({ path: "createdBy", select: ["username", "avatar"] })

        return res.status(200).json({msg: "Success", post})
    } catch (error) {
        console.log(error)
    }
}

export { createPost, getAllPost, updatePost, deletePost, likePost, unLikeController }
