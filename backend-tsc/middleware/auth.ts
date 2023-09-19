import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { env } from "../env";

interface User {
    userId: string;
    username: string
}

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({msg: 'Please login first'})
    }

    const token = header.split(" ")[1]

    const data = jwt.verify(token, env.JWT_SECRET) as User
    req.user = {userId: data.userId, username: data.username}
    next()
}

export const authMiddleware = auth