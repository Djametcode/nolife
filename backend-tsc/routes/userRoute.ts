import express from 'express'
const router = express.Router()
import { createUser, getAllUser, loginUser, updateUser, followUser } from '../controller/userController'
import { authMiddleware } from '../middleware/auth'
import { upload } from '../middleware/multer'

router.post('/regist', createUser)
router.post('/login', loginUser)
router.get('/all-user', getAllUser)
router.patch('/update-user', authMiddleware, upload, updateUser)
router.post('/follow/:id', authMiddleware, followUser)

export const userRouter = router
