import Head from "next/head";
import Navigation from "../components/navigation";
import LoginForm from "../components/login-form";

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
          <LoginForm />
        </div>
      </div>
      {/* <div className="container mx-auto flex grow justify-center">
        <form className="my-auto w-[75%] md:w-[30%]">
          <div className="flex flex-col justify-center">
            <input
              type="text"
              id="username"
              placeholder="USERNAME"
              className="border-light-gray mb-3 rounded-md border-2 p-1 text-center"
            />
            <input
              type="password"
              id="password"
              placeholder="PASSWORD"
              className="border-light-gray mb-3 rounded-md border-2 p-1 text-center"
            />
            <button
              type="submit"
              className="mx-auto w-[50%] rounded-full border-2 py-1 text-center"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div> */}
    </div>
  );
}
