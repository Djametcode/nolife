import mongoose, { Types } from "mongoose";
const { Schema } = mongoose

export interface Like {
    _id: string;
    createdBy: Types.ObjectId;
    postId: Types.ObjectId
}

const LikeSchema = new Schema<Like>({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
})

export const LikeModel = mongoose.model('Like', LikeSchema)