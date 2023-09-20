import { NextFunction } from "express";
import mongoose, { Document, Mongoose, PreSaveMiddlewareFunction, Types } from "mongoose";
const { Schema } = mongoose
import bcrypt from 'bcrypt'

interface Notification {
    _id: string;
    text: string;
    from: Types.ObjectId
}

interface Follower {
    userId: Types.ObjectId
}

interface Following {
    userId: Types.ObjectId
}

export interface Post {
    postId: Types.ObjectId;
}

interface User extends Document {
    username: string;
    email: string;
    password: string;
    avatar: string;
    post: Post[];
    follower: Follower[];
    following: Following[];
    notification: Notification[]
}

const UserSchema = new Schema<User>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(value: string) {
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

async function preSaveMiddleware(this: User, next: Function) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
}

UserSchema.pre('save', preSaveMiddleware)
  



export const UserModel = mongoose.model<User>('User', UserSchema)