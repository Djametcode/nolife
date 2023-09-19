import express from 'express'
const router = express.Router()
import { createUser, getAllUser, loginUser, updateUser } from '../controller/userController'
import { authMiddleware } from '../middleware/auth'
import { upload } from '../middleware/multer'

router.post('/regist', createUser)
router.post('/login', loginUser)
router.get('/all-user', getAllUser)
router.patch('/update-user/:id', authMiddleware, upload, updateUser)

export const userRouter = router
