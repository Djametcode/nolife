import { Document } from "mongodb";
import mongoose, { Types } from "mongoose";
const { Schema } = mongoose

interface Like {
    createdBy: Types.ObjectId
}

export interface Post extends Document {
    text: string;
    images: string;
    createdBy: Types.ObjectId
    like: Types.DocumentArray<Like>
}

const PostSchema = new Schema<Post>({
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
})

export const PostModel = mongoose.model<Post>('Post', PostSchema)