import { getProviders, signIn } from "next-auth/react";
import Navigation from "../../components/navigation.js";
import Head from "next/head";

export default function SignIn({ providers }) {
  return (
    <div className="h-screen bg-gradient-to-r from-ticketdeck-blue to-ticketdeck-purple">
      <Head>
        <title>TicketDeck</title>
        <meta name="description" content="Store all of your tickets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <div className="container mx-auto my-20 flex flex-col items-center py-20">
        <h1 className="mb-12 w-fit text-6xl font-bold text-white md:text-8xl">
          SIGN IN
        </h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id)}
              className="rounded-md border-2 border-white py-2 px-7 text-xl text-white md:text-2xl"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
