import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full bg-white">
      <div className="container mx-auto py-14">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="mb-1 text-4xl font-bold">TicketDeck</h1>
            <p className="text-2xl">Personal ticket storage</p>
          </div>
          <div className="flex flex-col items-center py-14 md:items-start md:py-0">
            <h1 className="mb-1 text-4xl font-bold">MENU</h1>
            <ul className="text-2xl">
              <li>
                <Link href="/api/auth/signin">Register</Link>
              </li>
              <li>
                <Link href="/api/auth/signin">Sign in</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h1 className="mb-1 text-4xl font-bold">CONTACT</h1>
            <p className="text-2xl">info@nickvanoers.nl</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-gray-100 py-3">
        <Link href="https://nickvanoers.nl" className="text-sm md:text-base">
          Copyright TicketDeck 2022 | Design by Nick van Oers
        </Link>
      </div>
    </div>
  );
}
