// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const userData = JSON.parse(req.body);

  try {
    const savedUser = await prisma.user.create({
      data: userData,
    });
    res.json(savedUser);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        if (error.meta.target.includes("username")) {
          return res
            .status(409)
            .json({ message: "A user with this username already exists" });
        }
        if (error.meta.target.includes("email")) {
          return res
            .status(409)
            .json({ message: "A user with this email already exists" });
        }
      }
    }
  }
};
