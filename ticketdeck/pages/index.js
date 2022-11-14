import Head from "next/head";
import Navigation from "../components/navigation.js";
import Tickets from "../components/tickets.js";
import { PrismaClient } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const prisma = new PrismaClient();

export const getServerSideProps = async (context) => {
  let tickets_request = await fetch(
    "https://ticketdeck.vercel.app/api/getticket",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: context.req.headers.cookie,
      },
    }
  );

  let tickets = await tickets_request.json();
  tickets = JSON.parse(JSON.stringify(tickets));

  let events = await prisma.event.findMany();
  events = JSON.parse(JSON.stringify(events));

  let sortedTickets = [];

  if (tickets.length > 0) {
    tickets = tickets.map((ticket) => {
      ticket.event = events.find((event) => event.id == ticket.eventId);
      return ticket;
    });
    sortedTickets = tickets.sort((a, b) => {
      return Date.parse(b.event.date) - Date.parse(a.event.date);
    });
  }

  return {
    props: {
      initialTickets: sortedTickets,
    },
  };
};

export default function Home({ initialTickets }) {
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
              <h1 className="text-6xl font-bold text-ticketdeck-blue">
                My tickets
              </h1>
              <Link
                href="/ticket/add/"
                className="justify-self-end text-2xl text-ticketdeck-blue"
              >
                Add ticket +
              </Link>
            </div>
            <div>
              <Tickets initialTickets={initialTickets} />
            </div>
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
