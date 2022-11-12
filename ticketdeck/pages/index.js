import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/navigation.js'
import Tickets from '../components/tickets.js'
import { PrismaClient } from '@prisma/client';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'

const prisma = new PrismaClient();

export const getServerSideProps = async (context) => {
  let tickets_request = await fetch('http://localhost:3000/api/getticket', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: context.req.headers.cookie,
    },
  })

  let tickets = await tickets_request.json();
  tickets = JSON.parse(JSON.stringify(tickets))

  let events = await prisma.event.findMany();
  events = JSON.parse(JSON.stringify(events));

  let sortedTickets = [];

  if(tickets.length > 0){
    tickets = tickets.map((ticket) => {
      ticket.event = events.find((event) => event.id == ticket.eventId);
      return ticket;
    });
    sortedTickets = tickets.sort((a, b) => {
      return Date.parse(b.event.date) - Date.parse(a.event.date);
    });
  }

  return {
      props: {
          initialTickets: sortedTickets
      }
  };
}

export default function Home({initialTickets}) {

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
              <Tickets initialTickets={initialTickets} />
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
                <a href="/api/auth/signin">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}
