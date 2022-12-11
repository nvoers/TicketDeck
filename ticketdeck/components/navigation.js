import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navigation() {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <div className="sticky top-0 z-50">
        <nav className="bg-gradient-to-r from-ticketdeck-blue to-ticketdeck-purple px-2 py-1 sm:px-4">
          <div className="container mx-auto flex flex-wrap items-center justify-between py-3">
            <Link href="/" className="flex items-center no-underline">
              <span className="ml-2 self-center whitespace-nowrap text-xl font-semibold text-white no-underline md:ml-0">
                TicketDeck
              </span>
            </Link>
            <div className="block w-auto">
              <ul className="mt-0 flex flex-row border-0 text-sm font-medium">
                <li>
                  <Link
                    href="/api/auth/signout"
                    className="block py-2 pr-4 pl-3 text-white no-underline md:p-0"
                    aria-current="page"
                  >
                    Sign out
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
      <div className="sticky top-0 z-50 bg-gradient-to-r from-ticketdeck-blue to-ticketdeck-purple">
        <nav className="px-2 py-1 sm:px-4">
          <div className="container mx-auto flex flex-wrap items-center justify-between py-3">
            <Link href="/" className="flex items-center no-underline">
              <span className="self-center whitespace-nowrap text-xl font-semibold text-white no-underline ">
                TicketDeck
              </span>
            </Link>
            <div className="block w-auto">
              <ul className="mt-0 flex flex-row border-0 text-sm font-medium">
                <li className="pr-6">
                  <Link
                    href="/api/auth/signin"
                    className="block py-2 pr-4 pl-3 text-white no-underline md:p-0"
                    aria-current="page"
                  >
                    Sign in
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="/register"
                    className="block py-2 pr-4 pl-3 text-white no-underline md:p-0"
                    aria-current="page"
                  >
                    Register
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
