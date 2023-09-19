import { Request, Response } from "express";
import { UserModel } from "../model/user";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { env } from "../env";

const createUser = async (req: Request, res: Response) => {
    const {username, email, password} = req.body

    if (!username || !email || !password) {
        return res.status(400).json({msg: "Please fill requipment"})
    }

    const user = await UserModel.findOne({username: username})

    if (user) {
        return res.status(201).json({msg: "Username already taken please take another"})
    }

    const emailUser = await UserModel.findOne({email: email})

    if (emailUser) {
        return res.status(201).json({msg: "Email already used please use other"})
    }

    const newUser = await UserModel.create({username: username, email: email, password: password})

    return res.status(200).json({msg: "Success" , newUser})
}

const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body
    try {
        if (!email || !password) {
            return res.status(401).json({msg: 'Please fill all requipment'})
        }

        const user = await UserModel.findOne({ email: email }).populate({ path: "post._id" })

        if (!user) {
            return res.status(404).json({msg: 'User not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({msg: "Password wrong"})
        }

        const token = jwt.sign({userId: user._id, username: user.username}, env.JWT_SECRET, {expiresIn: env.JWT_TIMES})

        return res.status(200).json({msg: 'Success login', user, token})
        
    } catch (error) {
        console.log(error)
    }
}

const getAllUser = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.find({})

        return res.status(200).json({msg: 'Success', user})
    } catch (error) {
        console.log(error)
    }
}

export { createUser, getAllUser, loginUser }