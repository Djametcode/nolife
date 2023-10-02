import express from 'express'
const router = express.Router()
import { registUser, loginUser, updateProfile } from '../controller/userController'
import { upload } from '../middleware/multer';
import authUser from '../middleware/auth';

router.post('/regist-user', registUser);
router.post('/login-user', loginUser);
router.patch('/update-profile', authUser, upload, updateProfile)

export const userRouter = router