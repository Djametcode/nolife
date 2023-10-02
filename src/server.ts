import 'dotenv/config'
import express from 'express';
const app = express()
import cors from 'cors'

import connectDB from './db/connectDB';
import { userRouter } from './routes/userRoute';
import { v2 as cloudinary } from 'cloudinary'
import { postRoute } from './routes/postRoutes';

cloudinary.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME
})

app.use(cors({
    origin: ["http://localhost:3000"]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/v15/user', userRouter)
app.use('/api/v15/post', postRoute)

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(3000, () => console.log("Server running"))
    } catch (error) {
        console.log(error)
    }
}
startServer()