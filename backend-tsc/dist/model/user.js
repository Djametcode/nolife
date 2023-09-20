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
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value);
            },
            message: "Invalid format"
        }
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    post: [{
            postId: {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        }],
    follower: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }],
    following: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }],
    notification: [{
            from: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }]
});
function preSaveMiddleware(next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            this.password = yield bcrypt_1.default.hash(this.password, salt);
            return next();
        }
        catch (error) {
            return next(error);
        }
    });
}
UserSchema.pre('save', preSaveMiddleware);
exports.UserModel = mongoose_1.default.model('User', UserSchema);
