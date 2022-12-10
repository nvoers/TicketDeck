import Head from "next/head";
import Navigation from "../components/navigation.js";
import Footer from "../components/footer.js";
import Tickets from "../components/tickets.js";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { server } from "../config";
import Image from "next/image";
import TicketCard from "../components/ticketcard.js";
import { SystemZone } from "luxon";

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

  let numbertickets = await prisma.ticket.count();
  numbertickets = JSON.parse(JSON.stringify(numbertickets));

  let numberevents = await prisma.event.count();
  numberevents = JSON.parse(JSON.stringify(numberevents));

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
    let day = date.getDate() - today.getDate();
    let month = date.getMonth() - today.getMonth();
    let year = date.getFullYear() - today.getFullYear();
    return day == 0 && month == 0 && year == 0;
  });
  othertickets = sortedTickets.filter((ticket) => {
    let date = new Date(ticket.event.date);
    let today = new Date();
    let day = date.getDate() - today.getDate();
    let month = date.getMonth() - today.getMonth();
    let year = date.getFullYear() - today.getFullYear();
    return day && month && year;
  });

  return {
    props: {
      todaytickets: todaytickets,
      othertickets: othertickets.slice(0, 3),
      numbertickets: numbertickets,
      numberevents: numberevents,
    },
  };
};

export default function Home({
  todaytickets,
  othertickets,
  numbertickets,
  numberevents,
}) {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <div className="h-screen bg-gradient-to-r from-ticketdeck-blue to-ticketdeck-purple">
        <Head>
          <title>TicketDeck</title>
          <meta name="description" content="Store all of your tickets" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navigation />
        <div className="container mx-auto grid h-fit grid-cols-2 self-center bg-white">
          <div className="p-5">
            <div className="rounded-md border-2 border-ticketdeck-blue p-5">
              <h1 className="text-5xl font-bold text-ticketdeck-purple">
                Today's events
              </h1>
              {todaytickets.length > 0 ? (
                todaytickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))
              ) : (
                <p className="mt-3 text-2xl font-bold">
                  You have no events today
                </p>
              )}
            </div>
            {/* today tickets */}
            <div className="mx-auto mt-5 w-[20rem] rounded-full bg-gradient-to-r from-blue-300 to-teal-200 py-2 text-center drop-shadow-lg">
              <a href="/ticket/add" className="text-white">
                ADD TICKET
              </a>
            </div>
            {/* add button */}
          </div>
          <div className="p-5">
            <div className="rounded-md border-2 border-ticketdeck-blue p-5">
              <h1 className="text-5xl font-bold text-ticketdeck-purple">
                Upcoming events
              </h1>
              {othertickets.length > 0 ? (
                othertickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))
              ) : (
                <p className="mt-3 text-2xl font-bold">
                  You have no upcoming events
                </p>
              )}
            </div>
            {/* other tickets */}
            <div className="mx-auto mt-5 w-[20rem] rounded-full bg-gradient-to-r from-blue-300 to-teal-200 py-2 text-center drop-shadow-lg">
              <a href="/ticket/add" className="text-white">
                VIEW ALL EVENTS
              </a>
            </div>
            {/* all button */}
          </div>
        </div>
        <div className="fixed bottom-0 w-full">
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Head>
          <title>TicketDeck</title>
          <meta name="description" content="Store all of your tickets" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="bg-gradient-to-r from-ticketdeck-blue to-ticketdeck-purple">
          <Navigation />
          <div className="container mx-auto flex justify-center">
            <div className="flex w-[30%] flex-col pt-20 pb-32">
              <div>
                <h1 className="text-center text-5xl font-bold text-white">
                  All your tickets in one place
                </h1>
              </div>
              <div className="flex flex-row justify-around pt-5">
                <div className="w-[9rem] rounded-full bg-gradient-to-r from-blue-300 to-teal-200 py-2 text-center drop-shadow-lg">
                  <a href="/api/auth/signin" className="text-white">
                    LOGIN
                  </a>
                </div>
                {/* <div className="w-[9rem] rounded-full bg-white py-2 text-center">
                  <a href="/register">REGISTER</a>
                </div> */}
              </div>
            </div>
          </div>
          <div className="flex justify-center bg-white py-16">
            <div className="mx-8 flex h-[8rem] w-[15rem] justify-center border-2 border-ticketdeck-purple text-center">
              <h1 className="h-fit self-center text-3xl font-bold">
                {numberevents}
                <br />
                EVENTS
              </h1>
            </div>
            <div className="mx-8 flex h-[8rem] w-[15rem] justify-center border-2 border-ticketdeck-purple text-center">
              <h1 className="h-fit self-center text-3xl font-bold">
                {numbertickets}
                <br />
                TICKETS
              </h1>
            </div>
            {/* <div className="mx-8 flex h-[8rem] w-[15rem] justify-center border-2 border-ticketdeck-purple text-center">
              <h1 className="h-fit self-center text-3xl font-bold">
                60
                <br />
                USERS
              </h1>
            </div> */}
          </div>
          <div className="mx-auto w-[65%] py-32">
            <h1 className="mb-8 text-center text-3xl font-bold text-white">
              Store all of your tickets safely
            </h1>
            <h2 className="text-center text-2xl text-white">
              TicketDeck provides a safe place to keep all of your concert and
              festival tickets. No more loose PDF files all over your email and
              phone.
            </h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
