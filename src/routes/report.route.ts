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
router.get("/", verifyToken, controller.getAllReports);
router.get("/:id", verifyToken, controller.getReportById);
router.get("/my-reports", verifyToken, controller.getMyReports);

export default router;
