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
exports.updateProfile = exports.loginUser = exports.registUser = void 0;
const userModel_1 = require("../model/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = require("cloudinary");
const registUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        if (!username || !email) {
            return res.status(201).json({ msg: 'Please fill all requipment' });
        }
        const checkUser = yield userModel_1.UserModel.findOne({ username: username, email: email });
        if (checkUser) {
            return res.status(201).json({ msg: 'Email or Username already exist' });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPass = yield bcrypt_1.default.hash(password, salt);
        const newUser = new userModel_1.UserModel({
            username: username,
            password: hashedPass,
            email: email
        });
        const data = yield userModel_1.UserModel.create(newUser);
        return res.status(200).json({ msg: 'Success', data });
    }
    catch (error) {
        console.log(error);
    }
});
exports.registUser = registUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(201).json({ msg: 'Please fill all requipment' });
        }
        const user = yield userModel_1.UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: 'Email or password wrong' });
        }
        const isPassCorrect = yield bcrypt_1.default.compare(password, user.password);
        console.log(isPassCorrect);
        if (!isPassCorrect) {
            return res.status(201).json({ msg: 'Password wrong' });
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user._id, username: user.username, email: user.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMES });
        return res.status(200).json({ msg: 'Success', user, token });
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginUser = loginUser;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username } = req.body;
    let file = req.file;
    try {
        if (file) {
            if (!email || !username) {
                return res.status(201).json({ msg: 'Please fill all requipment' });
            }
            const result = yield cloudinary_1.v2.uploader.upload(file.path, {
                folder: 'Testing',
                resource_type: 'auto'
            });
            const user = yield userModel_1.UserModel.findOneAndUpdate({ _id: req.user.userId }, { username: username, email: email, avatar: result.secure_url }, { new: true });
            console.log(user);
            return res.status(200).json({ msg: 'Success', user });
        }
        const user = yield userModel_1.UserModel.findOneAndUpdate({ _id: req.user.userId }, { username: username, email: email }, { new: true });
        return res.status(200).json({ msg: 'Success', user });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateProfile = updateProfile;
