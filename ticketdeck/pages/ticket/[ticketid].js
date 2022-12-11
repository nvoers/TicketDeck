import { useRouter } from "next/router";
import Head from "next/head";
import Navigation from "../../components/navigation.js";
import { PrismaClient } from "@prisma/client";
import { useQRCode } from "next-qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Page403 from "../../components/error/403.js";
import Barcode from "react-barcode";
import Footer from "../../components/footer.js";

const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  const { ticketid } = context.query;
  let ticket = await prisma.ticket.findUnique({
    where: { id: ticketid },
  });
  ticket.event = await prisma.event.findUnique({
    where: { id: ticket.eventId },
  });
  ticket = JSON.parse(JSON.stringify(ticket));
  ticket.event.date;
  return {
    props: {
      ticket: ticket,
    },
  };
}

const deleteTicket = async (ticketid, router) => {
  const response = await fetch(`/api/tickets/${ticketid}`, {
    method: "DELETE",
  });
  const data = await response.json();
  router.push("/");
};

export default function Ticket({ ticket }) {
  let date = new Date(ticket.event.date);
  const { Canvas } = useQRCode();
  const router = new useRouter();
  const session = useSession();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (session.data) {
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
            <div className="rounded-md border-2 border-ticketdeck-blue p-5">
              <h1 className="text-5xl font-bold text-ticketdeck-purple">
                {ticket.event.event}
              </h1>
              <h2 className="mt-5 text-2xl font-bold">
                {date.toLocaleDateString("en-EN", options)}
              </h2>
              <h2 className="mt-1 text-2xl font-bold">
                {ticket.event.venue}, {ticket.event.city}
              </h2>
            </div>
            {/* event info */}
            <div className="grid justify-items-center">
              {ticket.type == "QRCODE" ? (
                <div>
                  <Canvas
                    text={ticket.code}
                    options={{
                      type: "image/jpeg",
                      quality: 0.3,
                      level: "M",
                      margin: 3,
                      scale: 4,
                      width: 300,
                    }}
                  />
                </div>
              ) : (
                <div className="flex max-w-[80%] items-center pt-5">
                  <Barcode value={ticket.code} lineColor="black" />
                </div>
              )}
            </div>
            <div className="mx-auto mt-5 w-[20rem] rounded-full bg-gradient-to-r from-red-800 to-red-600 py-2 text-center drop-shadow-lg">
              <a href="/ticket/add" className="text-white">
                DELETE TICKET
              </a>
            </div>
            {/* add button */}
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return <Page403 />;
  }
}
