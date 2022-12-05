import Navigation from "../../components/navigation.js";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Page403 from "../../components/error/403.js";

async function saveTicket(ticket) {
  let eventData = {
    event: ticket.event,
    date: new Date(ticket.date),
    city: ticket.city,
    venue: ticket.venue,
  };
  let ticketData = {
    event: {
      create: eventData,
    },
    code: ticket.code,
    type: ticket.type,
  };

  const ticketResponse = await fetch("/api/ticket", {
    method: "POST",
    body: JSON.stringify(ticketData),
  });

  if (!ticketResponse.ok) {
    throw new Error(ticketResponse.statusText);
  }
  return await ticketResponse.json();
}

export default function Addticket() {
  const { register, handleSubmit, errors } = useForm();
  let router = new useRouter();
  let session = new useSession();

  async function onSubmit(data, e) {
    saveTicket(data);
    router.push("/");
  }

  if (session.data) {
    return (
      <div>
        <Head>
          <title>TicketDeck</title>
          <meta name="description" content="Store all of your tickets" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navigation />
        <div className="container mx-auto mt-5 flex flex-col place-content-between bg-gray-100 p-3">
          <h1 className="mb-3 text-6xl font-bold text-ticketdeck-blue">
            Add ticket
          </h1>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <label>Event</label>
            <input
              type="text"
              name="event"
              {...register("event")}
              className="border-1 mx-2 mb-2 rounded-md border-gray-300 p-2 md:w-1/2"
            />
            <label>Date</label>
            <input
              type="date"
              name="date"
              {...register("date")}
              className="border-1 mx-2 mb-2 w-fit rounded-md border-gray-300 p-2"
            />
            <label>City</label>
            <input
              type="text"
              name="city"
              {...register("city")}
              className="border-1 mx-2 mb-2 rounded-md border-gray-300 p-2 md:w-1/2"
            />
            <label>Venue</label>
            <input
              type="text"
              name="venue"
              {...register("venue")}
              className="border-1 mx-2 mb-2 rounded-md border-gray-300 p-2 md:w-1/2"
            />
            <label>Code</label>
            <input
              type="text"
              name="code"
              {...register("code")}
              className="border-1 mx-2 mb-2 rounded-md border-gray-300 p-2 md:w-1/2"
            />
            <label>Type</label>
            <input
              type="radio"
              id="qr"
              name="type"
              value="QRCODE"
              {...register("type")}
            />
            <label for="qr">QR CODE</label>
            <input
              type="radio"
              id="barcode"
              name="type"
              value="BARCODE"
              {...register("type")}
            />
            <label for="barcode">BARCODE</label>
            <input
              type="submit"
              value="Submit"
              className="mt-2 flex w-fit content-center rounded-full bg-ticketdeck-blue p-2 text-white"
            />
          </form>
        </div>
      </div>
    );
  } else {
    return <Page403 />;
  }
}
