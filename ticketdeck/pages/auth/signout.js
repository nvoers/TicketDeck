import Navigation from "../../components/navigation.js";
import Head from "next/head";
import { getCsrfToken } from "next-auth/react";

export default function SignIn({ csrfToken }) {
  return (
    <div className="h-screen bg-gradient-to-r from-ticketdeck-blue to-ticketdeck-purple">
      <Head>
        <title>TicketDeck</title>
        <meta name="description" content="Store all of your tickets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <div className="container mx-auto my-20 flex flex-col items-center py-20">
        <h1 className="mb-6 w-fit text-6xl font-bold text-white md:text-8xl">
          SIGN OUT
        </h1>
        <p className="mb-4 text-xl text-white md:text-2xl">
          Are you sure you want to sign out?
        </p>
        <form action="/api/auth/signout" method="POST">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <button
            type="submit"
            className="rounded-md border-2 border-white py-2 px-7 text-xl text-white md:text-2xl"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
