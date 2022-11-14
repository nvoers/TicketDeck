import Link from "next/link";

export default function TicketCard({ ticket }) {
  let date = new Date(ticket.event.date);
  let link = `/ticket/${ticket.id}`;

  return (
    <Link href={link}>
      <div className="grid grid-cols-5 rounded-lg bg-gray-100 p-4">
        <div className="flex max-w-fit flex-col justify-self-center text-4xl">
          <h1 className="w-fit self-center font-bold text-ticketdeck-blue2">
            {date
              .toLocaleString("default", { weekday: "long" })
              .substring(0, 3)}
          </h1>
          <h2 className="w-fit self-center font-bold text-ticketdeck-blue2">
            {date.getDate()}{" "}
            {date.toLocaleString("default", { month: "short" })}
          </h2>
        </div>
        <div className="col-span-4 self-center text-xl">
          <h2>{ticket.event.event}</h2>
          <p>
            {ticket.event.venue}, {ticket.event.city}
          </p>
        </div>
      </div>
    </Link>
  );
}
