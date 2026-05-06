import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"

interface AuthenticatedRequest extends Request {
    user?: {
        id: number 
        name: string
        role: string
    }
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET as string)
        req.user = decoded as any
        next()
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}