"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const postSchema = new mongoose_2.Schema({
    postText: {
        type: String,
    },
    postImage: {
        type: String
    },
    createdBy: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'User'
    },
    like: [{
            likeId: {
                type: mongoose_2.Schema.Types.ObjectId,
                ref: 'Like'
            }
        }],
    comment: [{
            commentId: {
                type: mongoose_2.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        }],
    share: [{
            shareId: {
                type: mongoose_2.Schema.Types.ObjectId,
                ref: 'Share'
            }
        }]
});
exports.PostModel = mongoose_1.default.model('Post', postSchema);
