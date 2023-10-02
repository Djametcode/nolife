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
exports.createPost = void 0;
const userModel_1 = require("../model/userModel");
const postModel_1 = require("../model/postModel");
const cloudinary_1 = require("cloudinary");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postText } = req.body;
    let file = req.file;
    try {
        if (file) {
            const user = yield userModel_1.UserModel.findOne({ _id: req.user.userId });
            const result = yield cloudinary_1.v2.uploader.upload(file.path, {
                folder: 'Testing',
                resource_type: 'auto'
            });
            const postDetail = new postModel_1.PostModel({
                postText: postText,
                postImage: result.secure_url,
                createdBy: req.user.userId,
            });
            const newPost = yield postModel_1.PostModel.create(postDetail);
            const pushData = user === null || user === void 0 ? void 0 : user.post.push({ postId: newPost._id });
            yield (user === null || user === void 0 ? void 0 : user.save());
            return res.status(200).json({ msg: 'Success with image', newPost, pushData });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.createPost = createPost;
