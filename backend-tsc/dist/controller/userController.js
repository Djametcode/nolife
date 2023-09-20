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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followUser = exports.updateUser = exports.loginUser = exports.getAllUser = exports.createUser = void 0;
const user_1 = require("../model/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../env");
const cloudinary_1 = require("cloudinary");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ msg: "Please fill requipment" });
    }
    const user = yield user_1.UserModel.findOne({ username: username });
    if (user) {
        return res.status(201).json({ msg: "Username already taken please take another" });
    }
    const emailUser = yield user_1.UserModel.findOne({ email: email });
    if (emailUser) {
        return res.status(201).json({ msg: "Email already used please use other" });
    }
    const newUser = yield user_1.UserModel.create({ username: username, email: email, password: password });
    return res.status(200).json({ msg: "Success", newUser });
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(401).json({ msg: 'Please fill all requipment' });
        }
        const user = yield user_1.UserModel.findOne({ email: email }).populate("post.postId");
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Password wrong" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, username: user.username }, env_1.env.JWT_SECRET, { expiresIn: env_1.env.JWT_TIMES });
        return res.status(200).json({ msg: 'Success login', user, token });
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginUser = loginUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let file = req.file;
    const { username, email } = req.body;
    try {
        const user = yield user_1.UserModel.findOne({ _id: req.user.userId });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        if (req.user.userId == user._id) {
            if (file) {
                const result = yield cloudinary_1.v2.uploader.upload(file.path, {
                    folder: 'Testing',
                    resource_type: 'auto'
                });
                const user = yield user_1.UserModel.findOneAndUpdate({ _id: req.user.userId }, { avatar: result.secure_url, username: username, email: email });
                return res.status(200).json({ msg: 'Success update', user });
            }
            const updatedUser = yield user_1.UserModel.findOneAndUpdate({ _id: req.user.userId }, { username: username, email: email });
            return res.status(200).json({ msg: 'Success update', updatedUser });
        }
        return res.status(401).json({ msg: 'Please use correct account' });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateUser = updateUser;
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.UserModel.findOne({ _id: id });
        const currentUser = yield user_1.UserModel.findOne({ _id: req.user.userId });
        if (!user || !currentUser) {
            return res.status(404).json({ msg: 'User not found or please login first' });
        }
        const isAlreadyFollow = user === null || user === void 0 ? void 0 : user.follower.some((item) => item.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser._id));
        if (isAlreadyFollow) {
            return res.status(401).json({ msg: 'Already follow' });
        }
        user === null || user === void 0 ? void 0 : user.follower.push({
            userId: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id
        });
        currentUser === null || currentUser === void 0 ? void 0 : currentUser.following.push({
            userId: user === null || user === void 0 ? void 0 : user._id
        });
        yield (user === null || user === void 0 ? void 0 : user.save());
        yield (currentUser === null || currentUser === void 0 ? void 0 : currentUser.save());
        return res.status(200).json({ msg: 'Success', currentUser });
    }
    catch (error) {
        console.log(error);
    }
});
exports.followUser = followUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.UserModel.find({});
        return res.status(200).json({ msg: 'Success', user });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllUser = getAllUser;
