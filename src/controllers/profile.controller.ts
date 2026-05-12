import { Request, Response } from "express"
import * as service from "../services/profile.service"
import { v4 as uuidv4 } from "uuid"
import path from "path"
import { supabase } from "../config/supabase"

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
        const updateData: any = {}

        if (req.body.bio) {
            updateData.bio = req.body.bio
        }

        if (req.file) {
            const fileExt = path.extname(req.file.originalname).toLowerCase()
            const allowedExts = [".jpg", ".jpeg", ".png", ".webp"]
            if (!allowedExts.includes(fileExt)) {
                throw new Error('Only jpeg, jpg, png, and webp files are allowed')
            }
            const fileName = `${uuidv4()}${fileExt}`

            const oldProfile = await service.getProfile(userId)
            if (oldProfile && oldProfile.profile_picture) {
                const oldFileName = path.basename(oldProfile.profile_picture)
                await supabase.storage
                    .from(process.env.SUPABASE_BUCKET_PROFILE!)
                    .remove([oldFileName])
            }

            const { data, error } = await supabase.storage
                .from(process.env.SUPABASE_BUCKET_PROFILE!)
                .upload(fileName, req.file.buffer, {
                    contentType: req.file.mimetype,
                    upsert: true
                })

            if (error) throw new Error(`Upload failed: ${error.message}`)

            const { data: publicUrl } = supabase.storage
                .from(process.env.SUPABASE_BUCKET_PROFILE!)
                .getPublicUrl(fileName)

            updateData.profile_picture = publicUrl.publicUrl
        }

        const result = await service.updateProfile(userId, updateData)
        res.json(result)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}