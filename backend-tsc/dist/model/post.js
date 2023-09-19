"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const PostSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    images: {
        type: String,
        default: ""
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    like: [{
            createdBy: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }]
});
exports.PostModel = mongoose_1.default.model('Post', PostSchema);
