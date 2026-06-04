import { Request, Response } from "express";
import * as service from "../services/report.service";
import path from "path";
import crypto from "crypto";
import { supabase } from "../config/supabase";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    name: string;
    role: string;
  };
}

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await service.getAllReport();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};

export const getReportById = async (req: Request, res: Response) => {
  try {
    const report = await service.getReportById(Number(req.params.id));
    if (!report) {
      res.status(404).json({ message: "Report not found" });
    } else {
      res.status(200).json(report);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch report" });
  }
};

export const createReport = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    const attachmentsNames: string[] = [];

    const files = (req.files || []) as Express.Multer.File[];

    if (files.length > 5) {
      throw new Error("Maximum 5 attachments allowed");
    }

    for (const file of files) {
      const fileExt = path.extname(file.originalname).toLowerCase();
      const allowedExts = [".jpg", ".jpeg", ".png", ".webp"];
      if (!allowedExts.includes(fileExt)) {
        throw new Error("Only jpeg, jpg, png, and webp files are allowed");
      }

      const fileName = `${crypto.randomUUID()}${fileExt}`;

      const { error } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET_REPORT!)
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

      if (error) throw new Error(`Upload failed: ${error.message}`);

      attachmentsNames.push(fileName);
    }

    const reportData = { ...req.body, attachments: attachmentsNames };

    const report = await service.createReport(reportData as any, req.user);
    res.status(201).json(report);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
