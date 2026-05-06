import {Request, Response} from "express"
import * as service from "../services/category.service"

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const result = await service.getAllCategories()
        res.status(200).json(result)
    } catch (err: any) {
        res.status(400).json({ message: err.message || "Fetching categories failed" })
    }
}
export const createCategory = async (req: Request, res: Response) => {
    try {
        const result = await service.createCategory(req.body)
        res.status(201).json(result)
    } catch (err: any) {
        res.status(400).json({ message: err.message || "Creating category failed" })
    }
}
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            throw new Error("Invalid category ID")
        }

        const result = await service.updateCategory(id, req.body)
        res.status(200).json(result)
    } catch (err: any) {
        res.status(400).json({ message: err.message || "Updating category failed" })
    }
}
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            throw new Error("Invalid category ID")
        }

        const result = await service.deleteCategory(id)
        res.status(200).json(result)
    } catch (err: any) {
        res.status(400).json({ message: err.message || "Deleting category failed" })
    }
}