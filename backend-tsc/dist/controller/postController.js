"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unLikeController = exports.likePost = exports.deletePost = exports.updatePost = exports.getAllPost = exports.createPost = void 0;
const user_1 = require("../model/user");
const post_1 = require("../model/post");
const cloudinary_1 = require("cloudinary");
const like_1 = require("../model/like");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    const createdBy = req.user.userId;
    let file = req.file;
    if (file) {
        try {
            const result = yield cloudinary_1.v2.uploader.upload(file.path, {
                folder: 'Testing',
                resource_type: 'auto'
            });
            if (!result.secure_url) {
                return res.status(401).json({ msg: 'Cloudinary error' });
            }
            const user = yield user_1.UserModel.findOne({ _id: req.user.userId });
            if (!user) {
                return res.status(404).json({ msg: 'User not found or please login first' });
            }
            const post = yield post_1.PostModel.create({
                text: text,
                images: result.secure_url,
                createdBy: createdBy
            });
            user.post.push({
                postId: post._id
            });
            yield user.save();
            return res.status(200).json({ msg: 'Success with image', user });
        }
        catch (error) {
            console.log(error);
        }
    }
    try {
        const post = yield post_1.PostModel.create({ text: text, createdBy: createdBy });
        return res.status(200).json({ msg: 'Success', post });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { text } = req.body;
    let file = req.file;
    try {
        if (file) {
            const user = yield user_1.UserModel.findOne({ _id: req.user.userId });
            if (!user) {
                return res.status(401).json({ msg: 'User not found or please login' });
            }
            const result = yield cloudinary_1.v2.uploader.upload(file.path, {
                folder: 'Testing',
                resource_type: 'auto'
            });
            const postId = yield post_1.PostModel.findOne({ _id: id });
            if ((postId === null || postId === void 0 ? void 0 : postId.createdBy.toString()) !== req.user.userId) {
                return res.status(401).json({ msg: "Please use correct account" });
            }
            const post = yield post_1.PostModel.findOneAndUpdate({ _id: id }, { text: text, images: result.secure_url }, { new: true });
            if (!post) {
                return res.status(404).json({ msg: 'Post not Found' });
            }
            return res.status(200).json({ msg: 'Success Update Post', post });
        }
        const user = yield user_1.UserModel.findOne({ _id: req.user.userId });
        if (!user) {
            return res.status(401).json({ msg: 'User not found or please login' });
        }
        const post = yield post_1.PostModel.findOneAndUpdate({ _id: id }, { text: text }, { new: true });
        if (!post) {
            return res.status(404).json({ msg: 'Post not Found' });
        }
        return res.status(200).json({ msg: 'Success Update Post', post });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield post_1.PostModel.findOneAndDelete({ _id: id });
        if (!post) {
            return res.status(404).json({ msg: 'Post not found or already delete' });
        }
        const currentUser = yield user_1.UserModel.findOne({ _id: req.user.userId });
        const postIndex = currentUser === null || currentUser === void 0 ? void 0 : currentUser.post.findIndex((item) => item.postId === (post === null || post === void 0 ? void 0 : post._id));
        currentUser === null || currentUser === void 0 ? void 0 : currentUser.post.slice(postIndex, 1);
        yield (currentUser === null || currentUser === void 0 ? void 0 : currentUser.save());
        return res.status(200).json({ msg: 'Success', currentUser });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deletePost = deletePost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield post_1.PostModel.findOne({ _id: id });
        const check = yield like_1.LikeModel.findOne({ postId: id, createdBy: req.user.userId });
        if (check) {
            return res.status(401).json({ msg: 'Only can like once :3' });
        }
        yield like_1.LikeModel.create({ postId: id, createdBy: req.user.userId });
        post === null || post === void 0 ? void 0 : post.like.push({ createdBy: req.user.userId });
        yield (post === null || post === void 0 ? void 0 : post.save());
        return res.status(200).json({ msg: "Success like", post });
    }
    catch (error) {
        console.log(error);
    }
});
exports.likePost = likePost;
const unLikeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Find the post by id
        const post = yield post_1.PostModel.findOne({ _id: id });
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        // Find and delete the like
        const like = yield like_1.LikeModel.findOneAndDelete({ postId: id, createdBy: req.user.userId });
        if (!like) {
            return res.status(404).json({ msg: 'Like not found' });
        }
        // Remove the like from the post's like array
        const likeIndex = post.like.findIndex((likedItem) => likedItem.createdBy.equals(req.user.userId));
        console.log(likeIndex);
        if (likeIndex !== -1) {
            post.like.splice(likeIndex, 1);
            yield post.save();
            return res.status(200).json({ msg: 'Like removed' });
        }
        else {
            return res.status(404).json({ msg: 'Like not found in post' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});
exports.unLikeController = unLikeController;
const getAllPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.PostModel.find({}).populate({ path: "createdBy", select: ["username", "avatar"] });
        return res.status(200).json({ msg: "Success", post });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllPost = getAllPost;
