import express from 'express'
const router = express.Router()
import { createUser, getAllUser, loginUser } from '../controller/userController'

router.post('/regist', createUser)
router.post('/login', loginUser)
router.get('/all-user', getAllUser)

export const userRouter = router
