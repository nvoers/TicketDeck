import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full bg-white">
      <div className="container mx-auto py-14">
        <div className="flex justify-between">
          <div>
            <h1 className="mb-1 text-4xl font-bold">TicketDeck</h1>
            <p className="text-2xl">Personal ticket storage</p>
          </div>
          <div className="flex-col">
            <h1 className="mb-1 text-4xl font-bold">MENU</h1>
            <ul className="text-2xl">
              <li>
                <a href="/api/auth/signin">Register</a>
              </li>
              <li>
                <a href="/api/auth/signin">Login</a>
              </li>
            </ul>
          </div>
          <div className="flex-col">
            <h1 className="mb-1 text-4xl font-bold">CONTACT</h1>
            <a className="text-2xl">info@nickvanoers.nl</a>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-gray-100 py-3">
        <a href="https//nickvanoers.nl">
          Copyright TicketDeck 2022 | Design by Nick van Oers
        </a>
      </div>
    </div>
  );
}
