import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navigation() {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <nav className="bg-white px-2 py-1 dark:bg-gray-900 sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between border-b-2 py-3">
          <Link href="/" className="flex items-center no-underline">
            <span className="self-center whitespace-nowrap text-xl font-semibold text-ticketdeck-blue no-underline dark:text-white">
              TicketDeck
            </span>
          </Link>
          <div className="block w-auto">
            <ul className="mt-0 flex flex-row border-0 bg-white text-sm font-medium dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
              <li>
                <Link
                  href="/api/auth/signout"
                  className="block py-2 pr-4 pl-3 text-black no-underline dark:text-white md:p-0"
                  aria-current="page"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="bg-white px-2 py-1 dark:bg-gray-900 sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-3">
          <Link href="/" className="flex items-center no-underline">
            <span className="self-center whitespace-nowrap text-xl font-semibold text-ticketdeck-blue no-underline dark:text-white">
              TicketDeck
            </span>
          </Link>
          <div className="block w-auto">
            <ul className="mt-0 flex flex-row border-0 bg-white text-sm font-medium dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
              <li>
                <Link
                  href="/api/auth/signin"
                  className="block py-2 pr-4 pl-3 text-black no-underline dark:text-white md:p-0"
                  aria-current="page"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
