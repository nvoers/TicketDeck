import { useRouter } from "next/router";
import Head from "next/head";
import Navigation from "../../components/navigation.js";
import { PrismaClient } from "@prisma/client";
import { useQRCode } from "next-qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Page403 from "../../components/error/403.js";

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

  if (session.data) {
    return (
      <div>
        <Head>
          <title>TicketDeck</title>
          <meta name="description" content="Store all of your tickets" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navigation />
        <div className="container mx-auto mt-5 flex place-content-between bg-gray-100 p-3">
          <div>
            <h1 className="mb-3 text-6xl font-bold text-ticketdeck-blue">
              {ticket.event.event}
            </h1>
            <h2 className="text-2xl">{date.toDateString()}</h2>
            <h2 className="text-2xl">
              {ticket.event.venue}, {ticket.event.city}
            </h2>
          </div>
          <div className="self-end">
            <button onClick={() => deleteTicket(ticket.id, router)}>
              <div className="flex content-center rounded-full bg-ticketdeck-red p-2">
                <FontAwesomeIcon
                  icon={faTrashCan}
                  color="white"
                  className="mr-1 w-3"
                />

                <p className="text-white">Delete</p>
              </div>
            </button>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-2 justify-items-center">
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
            <div className="flex items-center">Barcode coming soon!</div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Page403 />;
  }
}
