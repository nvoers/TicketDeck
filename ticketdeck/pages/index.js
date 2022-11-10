import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/navigation.js'
import Tickets from '../components/tickets.js'
import { PrismaClient} from '@prisma/client';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'

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
  
  const sortedTickets = tickets.sort((a, b) => {
    return Date.parse(b.event.date) - Date.parse(a.event.date);
  });
  
  return {
      props: {
          initialTickets: sortedTickets
      }
  };
}

export default function Home({ initialTickets }) {

  const { data: session, status } = useSession();

  if(session){
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
  else{
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
            <div className={styles.col}>
              <h1 className={styles.title}>Welcome to TicketDeck!</h1>
              <div className={styles.button}>
                <a href="/login">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}
