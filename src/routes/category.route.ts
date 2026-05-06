import { Router } from "express"
import * as controller from "../controllers/category.controller"
import { createCategorySchema, updateCategorySchema } from "../schemas/category.schema"
import { validate } from "../middlewares/validation.middleware"
import { verifyToken } from "../middlewares/authentication.middleware"
import { requireRole } from "../middlewares/authorization.middleware"

const router = Router()

router.get("/", verifyToken, controller.getAllCategories)
router.post("/", verifyToken, requireRole(["1"]), validate(createCategorySchema), controller.createCategory)
router.put("/:id", verifyToken, requireRole(["1"]), validate(updateCategorySchema), controller.updateCategory)
router.delete("/:id", verifyToken, requireRole(["1"]), controller.deleteCategory)

export default router