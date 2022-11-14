import TicketCard from "./ticketcard.js";

export default function Tickets({ initialTickets }) {
  return (
    <div className="mt-5">
      {initialTickets.length > 0 ? (
        initialTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))
      ) : (
        <p>You have no tickets yet</p>
      )}
    </div>
  );
}
