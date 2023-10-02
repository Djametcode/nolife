import { Request, Response } from "express";
import { UserModel } from "../model/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'

const registUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    try {
        if (!username || !email) {
            return res.status(201).json({ msg: 'Please fill all requipment' })
        }

        const checkUser = await UserModel.findOne({ username: username, email: email })

        if (checkUser) {
            return res.status(201).json({ msg: 'Email or Username already exist' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const newUser = new UserModel({
            username: username,
            password: hashedPass,
            email: email
        })

        const data = await UserModel.create(newUser)
        return res.status(200).json({ msg: 'Success', data })
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(201).json({ msg: 'Please fill all requipment' })
        }

        const user = await UserModel.findOne({ email: email })

        if (!user) {
            return res.status(404).json({ msg: 'Email or password wrong' })
        }

        const isPassCorrect = await bcrypt.compare(password, user.password)
        console.log(isPassCorrect)

        if (!isPassCorrect) {
            return res.status(201).json({ msg: 'Password wrong' })
        }

        const token = jwt.sign({
            userId: user._id, username: user.username, email: user.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMES })

        return res.status(200).json({ msg: 'Success', user, token })
    } catch (error) {
        console.log(error)
    }
}

const updateProfile = async (req: Request, res: Response) => {
    const { email, username } = req.body
    let file = req.file
    try {

        if (file) {

            if (!email || !username) {
                return res.status(201).json({ msg: 'Please fill all requipment' })
            }

            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'Testing',
                resource_type: 'auto'
            })

            const user = await UserModel.findOneAndUpdate({ _id: req.user.userId }, { username: username, email: email, avatar: result.secure_url }, { new: true })
            console.log(user)

            return res.status(200).json({ msg: 'Success', user })
        }

        const user = await UserModel.findOneAndUpdate({ _id: req.user.userId }, { username: username, email: email }, { new: true })

        return res.status(200).json({ msg: 'Success', user })

    } catch (error) {
        console.log(error)
    }
}

export { registUser, loginUser, updateProfile }