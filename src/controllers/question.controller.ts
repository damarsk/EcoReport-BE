import { Request, Response } from "express";
import * as service from "../services/question.service";
import path from "path";
import crypto from "crypto";
import { supabase } from "../config/supabase";

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { fullName, question, email } = req.body;
    const newQ = await service.createQuestion({ fullName, question, email });
    res.status(201).json({
      message: "Question submitted successfully",
      data: newQ,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
