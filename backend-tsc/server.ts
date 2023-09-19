import 'dotenv/config'
import cors from 'cors'
import express from 'express'
const app = express()

import connectDB from './db/db'
import { userRouter } from './routes/userRoute'
import { PostRouter } from './routes/postRoute'
import { v2 as cloudinary } from 'cloudinary'
import { env } from './env'

cloudinary.config({
    api_key: env.API_KEY,
    api_secret: env.API_SECRET,
    cloud_name: env.CLOUD_NAME
})

//middleware
import { authMiddleware } from './middleware/auth'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/v14/no-life/auth', userRouter)
app.use('/api/v14/no-life/post', authMiddleware, PostRouter)

const startServer = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw Error('Missing env')
        }
        await connectDB(process.env.MONGO_URL)
        app.listen(3000, () => console.log(`Server running on port 3000`))
    } catch (error) {
        console.log(error)
    }
}

startServer()