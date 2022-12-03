// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const ticketData = JSON.parse(req.body);

  const user = await prisma.user.findUnique({
    where: { id: ticketData.user.id },
  });

  const session = await getSession({ req });

  const savedTicket = await prisma.ticket.create({
    data: {
      event: ticketData.event,
      code: ticketData.code,
      user: {
        connect: {
          id: ticketData.user.id,
        },
      },
      type: ticketData.type,
    },
  });

  res.json(savedTicket);
};
