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

export const updateProfile = async (userId: number, updateData: UpdateProfileData) => {
    return await prisma.profile.update({
        where: { user_id: userId },
        data: {
            ...(updateData.profile_picture && { profile_picture: updateData.profile_picture }),
            ...(updateData.bio && { bio: updateData.bio })
        }
    })
}