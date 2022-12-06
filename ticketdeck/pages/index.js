import Head from "next/head";
import Navigation from "../components/navigation.js";
import Tickets from "../components/tickets.js";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { server } from "../config";

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
  let todaytickets = [];
  let othertickets = [];

  if (tickets.length > 0) {
    tickets = tickets.map((ticket) => {
      ticket.event = events.find((event) => event.id == ticket.eventId);
      return ticket;
    });
    sortedTickets = tickets.sort((a, b) => {
      return Date.parse(a.event.date) - Date.parse(b.event.date);
    });
  }

  todaytickets = sortedTickets.filter((ticket) => {
    let date = new Date(ticket.event.date);
    let today = new Date();
    return date.getDate() == today.getDate();
  });
  othertickets = sortedTickets.filter((ticket) => {
    let date = new Date(ticket.event.date);
    let today = new Date();
    return date.getDate() > today.getDate();
  });

  return {
    props: {
      todaytickets: todaytickets,
      othertickets: othertickets,
    },
  };
};

export default function Home({ todaytickets, othertickets }) {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <div>
        <Head>
          <title>TicketDeck</title>
          <meta name="description" content="Store all of your tickets" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navigation />
        <div className="container mx-auto">
          <div className="p-4">
            <div className="grid grid-cols-2">
              <h1 className="col-span-2 text-6xl font-bold text-ticketdeck-blue md:col-span-1">
                Todays events
              </h1>
              <Link
                href="/ticket/add/"
                className="mt-2 text-2xl text-ticketdeck-blue md:mt-0 md:justify-self-end"
              >
                Add ticket +
              </Link>
            </div>
            {todaytickets.length > 0 ? (
              <div>
                <Tickets initialTickets={todaytickets} />
              </div>
            ) : (
              <p>No tickets today</p>
            )}
          </div>
        </div>
        <div className="container mx-auto">
          <div className="p-4">
            <div className="grid grid-cols-2">
              <h1 className="col-span-2 text-6xl font-bold text-ticketdeck-blue md:col-span-1">
                Upcoming events
              </h1>
              <Link
                href="/ticket/add/"
                className="mt-2 text-2xl text-ticketdeck-blue md:mt-0 md:justify-self-end"
              >
                Add ticket +
              </Link>
            </div>
            {othertickets.length > 0 ? (
              <div>
                <Tickets initialTickets={othertickets} />
              </div>
            ) : (
              <p>No upcoming tickets</p>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen bg-ticketdeck-blue">
        <Head>
          <title>TicketDeck</title>
          <meta name="description" content="Store all of your tickets" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navigation />
        <div className="align-middle">
          <div className="container mx-auto">
            <div className="flex flex-col justify-center">
              <h1 className="pt-40 pb-10 text-center text-4xl font-bold text-white">
                Welcome to TicketDeck
              </h1>
              <button className="w-fit self-center rounded-full bg-white px-4 py-2 text-xl font-bold text-ticketdeck-blue">
                <Link href="/api/auth/signin">Login</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
