import { Request, Response } from "express"
import * as service from "../services/profile.service"

interface AuthenticatedRequest extends Request {
    user?: {
        id: number
        name: string
        role: string
    }
}

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user!.id
        const profile = await service.getProfile(userId)
        res.json(profile)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user!.id
        const result = await service.updateProfile(userId, req.body)
        res.json(result)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}