import { Router } from "express"
import * as controller from "../controllers/profile.controller"
import { updateProfileSchema } from "../schemas/profile.schema"
import { validate } from "../middlewares/validation.middleware"
import { verifyToken } from "../middlewares/authentication.middleware"
import { upload } from "../config/multer"

const router = Router()

router.get("/", verifyToken, controller.getProfile)
router.put("/", verifyToken, upload.single("profilePicture"), validate(updateProfileSchema), controller.updateProfile)

export default router