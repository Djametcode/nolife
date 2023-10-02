import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken'

interface IJWT {
    userId: string;
    username: string;
    email: string;
}

const authUser = async (req: Request, res: Response, next: NextFunction) => {
    const HeaderCheck = req.headers.authorization;

    if (!HeaderCheck?.startsWith('Bearer ') || !HeaderCheck) {
        return res.status(401).json({ msg: 'Please login First' })
    }

    const token = HeaderCheck.split(" ")[1]
    try {
        const data = await jwt.verify(token, process.env.JWT_SECRET) as IJWT

        if (!data) {
            return res.status(401).json({ msg: 'Token Error Please Login Again' })
        }

        req.user = { userId: data.userId, username: data.username, email: data.email }
        next()
    } catch (error) {
        console.log(error)
    }
}

export default authUser