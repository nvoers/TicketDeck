import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  console.log(req.query)

  const deletedTicket = await prisma.ticket.delete({
    where: {
        id: req.query.ticketid
    }
  });

  res.json(deletedTicket);
}