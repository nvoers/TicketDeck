import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navigation() {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <div className="sticky top-0 z-50">
        <nav className="bg-white px-2 py-1 sm:px-4">
          <div className="container mx-auto flex flex-wrap items-center justify-between border-b-2 py-3">
            <Link href="/" className="flex items-center no-underline">
              <span className="self-center whitespace-nowrap text-xl font-semibold text-ticketdeck-blue no-underline">
                TicketDeck
              </span>
            </Link>
            <div className="block w-auto">
              <ul className="mt-0 flex flex-row border-0 bg-white text-sm font-medium">
                <li>
                  <Link
                    href="/api/auth/signout"
                    className="block py-2 pr-4 pl-3 text-black no-underline md:p-0"
                    aria-current="page"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="sticky top-0 z-50">
        <nav className="bg-white px-2 py-1 sm:px-4">
          <div className="container mx-auto flex flex-wrap items-center justify-between py-3">
            <Link href="/" className="flex items-center no-underline">
              <span className="self-center whitespace-nowrap text-xl font-semibold text-ticketdeck-blue no-underline ">
                TicketDeck
              </span>
            </Link>
            <div className="block w-auto">
              <ul className="mt-0 flex flex-row border-0 bg-white text-sm font-medium">
                <li className="pr-6">
                  <Link
                    href="/api/auth/signin"
                    className="block py-2 pr-4 pl-3 text-black no-underline md:p-0"
                    aria-current="page"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="block py-2 pr-4 pl-3 text-black no-underline md:p-0"
                    aria-current="page"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
