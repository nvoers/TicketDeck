import Navigation from "../../components/navigation.js";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Page403 from "../403.js";
import Footer from "../../components/footer.js";

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
      <div className="h-screen bg-gradient-to-r from-ticketdeck-blue to-ticketdeck-purple">
        <Head>
          <title>TicketDeck</title>
          <meta name="description" content="Store all of your tickets" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navigation />
        <div className="container mx-auto mt-5 flex flex-col items-center py-20">
          <h1 className="mb-12 w-fit text-8xl font-bold text-white">
            ADD TICKET
          </h1>
          <form
            className="flex w-[45%] flex-col items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              name="event"
              placeholder="EVENT"
              {...register("event")}
              className="border-1 mb-5 w-full rounded-md border-gray-300 p-2 text-center"
            />
            <input
              type="date"
              name="date"
              placeholder="DATE"
              {...register("date")}
              className="border-1 mb-5 rounded-md border-gray-300 p-2 text-center"
            />
            <input
              type="text"
              name="city"
              placeholder="CITY"
              {...register("city")}
              className="border-1 mb-5 w-full rounded-md border-gray-300 p-2 text-center"
            />
            <input
              type="text"
              name="venue"
              placeholder="VENUE"
              {...register("venue")}
              className="border-1 mb-5 w-full rounded-md border-gray-300 p-2 text-center"
            />
            <input
              type="text"
              name="code"
              placeholder="CODE"
              {...register("code")}
              className="border-1 mb-5 w-full rounded-md border-gray-300 p-2 text-center"
            />
            <div className="mb-5 flex w-full items-center justify-around">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="qr"
                  name="type"
                  value="QRCODE"
                  {...register("type")}
                />
                <label for="qr" className="ml-2 text-white">
                  QR CODE
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="barcode"
                  name="type"
                  value="BARCODE"
                  {...register("type")}
                />
                <label for="barcode" className="ml-2 text-white">
                  BARCODE
                </label>
              </div>
            </div>
            <input
              type="submit"
              value="ADD TICKET"
              className="mx-auto mt-5 w-[20rem] rounded-full bg-gradient-to-r from-blue-300 to-teal-200 py-2 text-center text-white drop-shadow-lg"
            />
          </form>
        </div>
        <Footer />
      </div>
    );
  } else {
    return <Page403 />;
  }
}
