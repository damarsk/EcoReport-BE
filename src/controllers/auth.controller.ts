import {Request, Response} from "express"
import * as service from "../services/auth.service"

export const register = async (req: Request, res: Response) => {
    try {
        const user = await service.register(req.body)
        res.status(201).json(user)
    } catch (err: any) {
        res.status(400).json({ message: err.message || "Registration failed" })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const result = await service.login(req.body)
        res.status(200).json(result)
    } catch (err: any) {
        res.status(400).json({ message: err.message || "Login failed" })
    }
}

export const me = async (req: Request, res: Response) => {
    try {
        const user = await service.getMe((req as any).user.id)
        res.status(200).json(user)
    } catch (err: any) {
        res.status(400).json({ message: err.message || "Failed to fetch user info" })
    }
}
    