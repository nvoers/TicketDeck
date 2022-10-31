import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/navigation.js'
import Tickets from '../components/tickets.js'
import { PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  let tickets = await prisma.ticket.findMany();
  tickets = JSON.parse(JSON.stringify(tickets));

  let events = await prisma.event.findMany();
  events = JSON.parse(JSON.stringify(events));
  
  tickets = tickets.map((ticket) => {
    ticket.event = events.find((event) => event.id == ticket.eventId);
    return ticket;
  });
  
  return {
      props: {
          initialTickets: tickets
      }
  };
}

export default function Home({ initialTickets }) {
  return (
    <div>
      <Head>
        <title>TicketDeck</title>
        <meta name="description" content="Store all of your tickets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <Tickets initialTickets={initialTickets}/>
          </div>
        </div>
      </div>
    </div>
  )
}
