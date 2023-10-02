import express from 'express'
const router = express.Router();
import { createPost } from '../controller/postController';

router.post('/create-post', createPost)

export const postRoute = router