import { prisma } from "../config/prisma";

interface CreateReportData {
  category: number;
  title: string;
  description: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  desa: string;
  incident_date: Date;
  attachments?: string[];
}

interface User {
  id: number;
  name: string;
  role: string;
}

export const getAllReport = async () => {
  return await prisma.report.findMany();
};

export const getReportById = async (id: number) => {
  return await prisma.report.findUnique({
    where: { id },
  });
};

export const createReport = async (
  reportData: CreateReportData,
  user: User,
) => {
  const category = await prisma.category.findUnique({
    where: { id: reportData.category },
  });

  if (!category) {
    throw new Error("Invalid category");
  }

  return await prisma.report.create({
    data: {
      user: { connect: { id: user.id } },
      category: { connect: { id: reportData.category } },
      title: reportData.title,
      description: reportData.description,
      provinsi: reportData.provinsi,
      kabupaten: reportData.kabupaten,
      kecamatan: reportData.kecamatan,
      desa: reportData.desa,
      incident_date: reportData.incident_date,
      attachments: reportData.attachments ?? [],
      status: "pending",
    },
  });
};
