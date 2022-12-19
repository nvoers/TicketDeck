import Head from "next/head";
import Navigation from "../components/navigation.js";

export default function Page403() {
  return (
    <div className="h-screen bg-gradient-to-r from-ticketdeck-blue to-ticketdeck-purple">
      <Head>
        <title>TicketDeck</title>
        <meta name="description" content="Store all of your tickets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <div className="container mx-auto">
        <div className="flex flex-col content-center items-center py-32">
          <h1 className="mb-3 text-7xl font-bold text-white">ERROR</h1>
          <p className="text-2xl text-white md:text-4xl">
            403: Permission denied
          </p>
        </div>
      </div>
    </div>
  );
}
