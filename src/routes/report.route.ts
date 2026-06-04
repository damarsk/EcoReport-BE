import { Router } from "express";
import * as controller from "../controllers/report.controller";
import { createReportSchema } from "../schemas/report.schema";
import { validate } from "../middlewares/validation.middleware";
import { verifyToken } from "../middlewares/authentication.middleware";
import { requireRole } from "../middlewares/authorization.middleware";
import { upload } from "../config/multer";

const router = Router();

router.post(
  "/",
  verifyToken,
  upload.array("attachments", 5),
  validate(createReportSchema),
  controller.createReport,
);
router.get("/", verifyToken, requireRole(["1"]), controller.getAllReports);
router.get("/:id", verifyToken, requireRole(["1"]), controller.getReportById);

export default router;
