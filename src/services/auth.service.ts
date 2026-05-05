import { prisma } from "../config/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

interface CreateUserData {
    name: string
    email: string
    phone_number: string
    password: string
}

interface LoginData {
    email: string
    password: string
}

export const register = async (data: CreateUserData) => {
    const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
    })

    if (existingUser) {
        throw new Error("Email already in use")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            password: hashedPassword,
            profile: {
                create: {
                    bio: null,
                    profile_picture: null
                }
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone_number: true,
            role: true,
        }
    })
}

export const login = async (data: LoginData) => {
    const user = await prisma.user.findUnique({
        where: { email: data.email }
    })

    if (!user) {
        throw new Error("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password)

    if (!isPasswordValid) {
        throw new Error("Invalid credentials")
    }

    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            role: user.role
        },
        process.env.JWT_SECRET as string,
        { expiresIn: (process.env.JWT_EXPIRES_IN) as any}
    )

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            role: user.role,
        }
    }
}

export const getMe = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            phone_number: true,
            role: true,
            profile: {
                select: {
                    bio: true,
                    profile_picture: true
                }
            },
            created_at: true
        }
    })

    if (!user) {
        throw new Error("User not found")
    }

    return user
}