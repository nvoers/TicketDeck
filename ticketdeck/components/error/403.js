import Head from "next/head";
import Navigation from "../../components/navigation.js";

export default function Page403() {
  return (
    <div>
      <Head>
        <title>TicketDeck</title>
        <meta name="description" content="Store all of your tickets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <div className="container mx-auto">
        <h1 className="mb-3 text-6xl font-bold text-ticketdeck-blue">Error</h1>
        <p>403: Permission denied</p>
      </div>
    </div>
  );
}
