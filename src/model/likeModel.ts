import mongoose, { Types } from "mongoose";
const { Schema } = mongoose

interface Like {
    createdBy: Types.ObjectId;
    postId: Types.ObjectId;
}

const likeSchema = new Schema<Like>({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
})

export const likeModel = mongoose.model<Like>('Like', likeSchema)