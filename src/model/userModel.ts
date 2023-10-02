import mongoose, { Document, Types, mongo } from "mongoose";
const { Schema } = mongoose

interface Follower {
    userId: Types.ObjectId
}

interface Post {
    postId: Types.ObjectId
}

interface User extends Document {
    username: string;
    email: string;
    password: string;
    avatar: string;
    post: Post[];
    follower: Follower[];
    following: Follower[];
    savedPost: Post[];
}

const userSchema = new Schema<User>({
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
})

export const UserModel = mongoose.model<User>('User', userSchema)