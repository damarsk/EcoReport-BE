import { prisma } from "../config/prisma";

interface ICreateQuestion {
  fullName: string;
  question: string;
  email: string;
}

export const createQuestion = async (data: ICreateQuestion) => {
  return await prisma.question.create({
    data: {
      fullName: data.fullName,
      question: data.question,
      email: data.email,
    },
  });
};
