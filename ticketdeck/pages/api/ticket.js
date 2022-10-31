// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const ticketData = JSON.parse(req.body);

  const savedTicket = await prisma.ticket.create({
    data: ticketData
  });

  res.json(savedTicket);
}
