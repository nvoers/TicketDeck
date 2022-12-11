import Link from "next/link";

export default function TicketCard({ ticket }) {
  let date = new Date(ticket.event.date);
  let link = `/ticket/${ticket.id}`;

  return (
    <div className="mt-3 flex items-center justify-between">
      <h2 className="text-2xl font-bold">{ticket.event.event}</h2>
      <Link href={link}>
        <h3 className="text-xl">INFO</h3>
      </Link>
    </div>
  );
}
