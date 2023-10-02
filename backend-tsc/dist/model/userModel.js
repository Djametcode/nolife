"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide username']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    avatar: {
        type: String,
        default: ''
    },
    post: [{
            postId: {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        }],
    savedPost: [{
            postId: {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        }],
    follower: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }],
    following: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }]
});
exports.UserModel = mongoose_1.default.model('User', userSchema);
