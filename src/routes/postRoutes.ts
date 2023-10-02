import express from 'express'
const router = express.Router();
import { createPost, updatePost } from '../controller/postController';
import authUser from '../middleware/auth';
import { upload } from '../middleware/multer';

router.post('/create-post', authUser, upload, createPost)
router.patch('/update-post/:id', authUser, updatePost)

export const postRoute = router