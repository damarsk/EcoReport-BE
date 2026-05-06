import { Router } from "express"
import * as controller from "../controllers/auth.controller"
import { validate } from "../middlewares/validation.middleware"
import { registerSchema, loginSchema } from "../schemas/auth.schema"
import { verifyToken } from "../middlewares/authentication.middleware"

const router = Router()

router.get("/me", verifyToken, controller.me)
router.post("/register", validate(registerSchema), controller.register)
router.post("/login", validate(loginSchema), controller.login)

export default router