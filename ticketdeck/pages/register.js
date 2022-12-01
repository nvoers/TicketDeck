import Head from "next/head";
import Navigation from "../components/navigation";
import RegisterForm from "../components/register-form";

export default function Login() {
  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>TicketDeck</title>
        <meta name="description" content="Store all of your tickets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <div className="absolute w-screen">
        <div className="flex h-screen justify-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
