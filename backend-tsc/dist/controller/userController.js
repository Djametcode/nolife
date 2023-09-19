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
exports.updateUser = exports.loginUser = exports.getAllUser = exports.createUser = void 0;
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
        const user = yield user_1.UserModel.findOne({ email: email }).populate({ path: "post._id" });
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
    const { id } = req.params;
    let file = req.file;
    try {
        if (file) {
            const result = yield cloudinary_1.v2.uploader.upload(file.path, {
                folder: 'Testing',
                resource_type: 'auto'
            });
            if (id !== req.user.userId) {
                return res.status(401).json({ msg: 'Please login with correct account' });
            }
            const user = yield user_1.UserModel.findOneAndUpdate({ _id: req.user.userId }, { avatar: result.secure_url }, { new: true });
            return res.status(200).json({ msg: 'Success update', user });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateUser = updateUser;
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
