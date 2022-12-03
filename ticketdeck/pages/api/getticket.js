// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getSession({ req });

  let savedTicket = [];
  if (session) {
    savedTicket = await prisma.ticket.findMany({
      where: {
        userId: session.user.id,
      },
    });
  } else {
    savedTicket = [];
  }

  return res.json(savedTicket);
};
