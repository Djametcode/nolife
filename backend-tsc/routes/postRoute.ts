import express from 'express'
const router = express.Router()
import { createPost, getAllPost, updatePost, likePost, unLikeController, deletePost } from '../controller/postController'
import { upload } from '../middleware/multer'

router.post('/create-post', upload, createPost)
router.delete('/delete-post/:id', deletePost)
router.get('/get-all-post', getAllPost)
router.patch('/update-post/:id', upload, updatePost)
router.post('/like-post/:id', likePost)
router.delete('/unlike/:id', unLikeController)

export const PostRouter = router