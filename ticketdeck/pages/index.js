import Head from 'next/head'
import Navigation from '../components/navigation.js'
import Tickets from '../components/tickets.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { PrismaClient, Ticket, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  const tickets = await prisma.ticket.findMany();
  
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
