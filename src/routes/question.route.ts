import { Router } from "express";
import * as controller from "../controllers/question.controller";
import { createQuestionSchema } from "../schemas/question.schema";
import { validate } from "../middlewares/validation.middleware";
import { verifyToken } from "../middlewares/authentication.middleware";
import { requireRole } from "../middlewares/authorization.middleware";

const router = Router();

router.get("/", verifyToken, requireRole(["1"]), controller.getAllQuestions);
router.post("/", validate(createQuestionSchema), controller.createQuestion);

export default router;
