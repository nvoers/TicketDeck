import Head from "next/head";
import Navigation from "../../components/navigation.js";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { server } from "../../config";
import Footer from "../../components/footer";

const prisma = new PrismaClient();

export const getServerSideProps = async (context) => {
  let tickets_request = await fetch(`${server}/api/getticket`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: context.req.headers.cookie,
    },
  });

  let tickets = await tickets_request.json();
  tickets = JSON.parse(JSON.stringify(tickets));

  let events = await prisma.event.findMany();
  events = JSON.parse(JSON.stringify(events));

  let sortedTickets = [];
  let pasttickets = [];
  let upcomingtickets = [];

  if (tickets.length > 0) {
    tickets = tickets.map((ticket) => {
      ticket.event = events.find((event) => event.id == ticket.eventId);
      return ticket;
    });
    sortedTickets = tickets.sort((a, b) => {
      return Date.parse(a.event.date) - Date.parse(b.event.date);
    });
  }

  upcomingtickets = sortedTickets.filter((ticket) => {
    let date = new Date(ticket.event.date);
    let today = new Date();
    let day = date.getDate() - today.getDate();
    let month = date.getMonth() - today.getMonth();
    let year = date.getFullYear() - today.getFullYear();
    if (year > 0) {
      return true;
    } else if (year == 0 && month > 0) {
      return true;
    } else if (year == 0 && month == 0 && day >= 0) {
      return true;
    } else {
      return false;
    }
  });
  pasttickets = sortedTickets.filter((ticket) => {
    let date = new Date(ticket.event.date);
    let today = new Date();
    let day = date.getDate() - today.getDate();
    let month = date.getMonth() - today.getMonth();
    let year = date.getFullYear() - today.getFullYear();
    if (year < 0) {
      return true;
    } else if (year == 0 && month < 0) {
      return true;
    } else if (year == 0 && month == 0 && day < 0) {
      return true;
    } else {
      return false;
    }
  });

  return {
    props: {
      upcomingtickets: upcomingtickets,
      pasttickets: pasttickets,
      numbertickets: tickets.length,
    },
  };
};

export default function All({ upcomingtickets, pasttickets, numbertickets }) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="h-screen bg-gradient-to-r from-ticketdeck-blue to-ticketdeck-purple">
      <Head>
        <title>TicketDeck</title>
        <meta name="description" content="Store all of your tickets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <div className="container mx-auto mb-10 grid h-fit self-center bg-white">
        <div className="p-5">
          <h1 className="text-5xl font-bold text-ticketdeck-purple">
            Upcoming events
          </h1>
          {upcomingtickets.length > 0 ? (
            upcomingtickets.map((ticket) => (
              <div className="mt-5 rounded-md border-2 border-ticketdeck-blue bg-white p-5">
                <h1 className="text-5xl font-bold text-ticketdeck-purple">
                  {ticket.event.event}
                </h1>
                <h2 className="mt-5 text-2xl font-bold">
                  {new Date(ticket.event.date).toLocaleDateString(
                    "en-EN",
                    options
                  )}
                </h2>
                <h2 className="mt-1 text-2xl font-bold">
                  {ticket.event.venue}, {ticket.event.city}
                </h2>
              </div>
            ))
          ) : (
            <p className="mt-3 text-2xl font-bold">You have no events</p>
          )}
        </div>
        <div className="p-5">
          <h1 className="text-5xl font-bold text-ticketdeck-purple">
            Past events
          </h1>
          {pasttickets.length > 0 ? (
            pasttickets.map((ticket) => (
              <div className="mt-5 rounded-md border-2 border-ticketdeck-blue bg-white p-5">
                <h1 className="text-5xl font-bold text-ticketdeck-purple">
                  {ticket.event.event}
                </h1>
                <h2 className="mt-5 text-2xl font-bold">
                  {new Date(ticket.event.date).toLocaleDateString(
                    "en-EN",
                    options
                  )}
                </h2>
                <h2 className="mt-1 text-2xl font-bold">
                  {ticket.event.venue}, {ticket.event.city}
                </h2>
              </div>
            ))
          ) : (
            <p className="mt-3 text-2xl font-bold">You have no past events</p>
          )}
        </div>
      </div>
      {numbertickets > 1 ? (
        <Footer />
      ) : (
        <div className="md:fixed md:bottom-0 md:w-full">
          <Footer />
        </div>
      )}
    </div>
  );
}
