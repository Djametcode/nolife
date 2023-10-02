import mongoose, { Types, mongo } from "mongoose";
import { Schema } from "mongoose";

interface Like {
    likeId: Types.ObjectId
}

interface Comment {
    commentId: Types.ObjectId
}

interface Share {
    shareId: Types.ObjectId
}

interface Post {
    postText: string;
    postImage: string;
    createdBy: Types.ObjectId;
    like: Like[];
    comment: Comment[];
    share: Share[]
}

const postSchema = new Schema<Post>({
    postText: {
        type: String,
    },
    postImage: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    like: [{
        likeId: {
            type: Schema.Types.ObjectId,
            ref: 'Like'
        }
    }],
    comment: [{
        commentId: {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    }],
    share: [{
        shareId: {
            type: Schema.Types.ObjectId,
            ref: 'Share'
        }
    }]
})

export const PostModel = mongoose.model<Post>('Post', postSchema)