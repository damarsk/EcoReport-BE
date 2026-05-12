import { prisma } from "../config/prisma"

interface UpdateProfileData {
    profile_picture?: string
    bio?: string
}

export const getProfile = async (userId: number) => {
    return await prisma.profile.findUnique({
        where: { user_id: userId },
        select: {
            profile_picture: true,
            bio: true
        }
    })
}

export const updateProfile = async (userId: number, data: UpdateProfileData) => {
    return await prisma.profile.update({
        where: { user_id: userId },
        data: {
            ...(data.profile_picture && { profile_picture: data.profile_picture }),
            ...(data.bio && { bio: data.bio })
        }
    })
}