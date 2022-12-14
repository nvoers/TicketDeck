// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const eventData = JSON.parse(req.body);

  const savedEvent = await prisma.event.create({
    data: eventData
  });

  res.json(savedEvent);
}
