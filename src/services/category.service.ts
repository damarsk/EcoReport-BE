import { prisma } from "../config/prisma"

interface CreateCategoryData {
    name: string
    description: string
}

interface UpdateCategoryData {
    name?: string,
    description?: string
}

export const getAllCategories = async () => {
    const data = await prisma.category.findMany({
        orderBy: {
            id: "asc"
        }
    })
    
    if (data === null || data.length === 0) {
        let res = [
            {
                message: "No categories found"
            }
        ]
        return res
    }

    return data
}
export const createCategory = async (data: CreateCategoryData) => {
    const existingCategory = await prisma.category.findUnique({
        where: { name: data.name }
    })
    if (existingCategory) {
        throw new Error("Category name already exists")
    }

    return await prisma.category.create({
        data: {
            name: data.name,
            description: data.description
        }
    })
}
export const updateCategory = async (id: number, data: UpdateCategoryData) => {
    const existingCategory = await prisma.category.findUnique({
        where: { id }
    })
    if (!existingCategory) {
        throw new Error("Category not found")
    }

    return await prisma.category.update({
        where: { id },
        data: {
            ...(data.name !== undefined && { name: data.name }),
            ...(data.description !== undefined && { description: data.description })
        }
    })
}
export const deleteCategory = async (id: number) => {
    const existingCategory = await prisma.category.findUnique({
        where: { id }
    })
    if (!existingCategory) {
        throw new Error("Category not found")
    }

    await prisma.category.delete({
        where: { id }
    })

    return {
        message: "Category deleted successfully",
        data: existingCategory
    }
}