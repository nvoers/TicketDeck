import Head from 'next/head'
import Navigation from './navigation.js'
import Tickets from './tickets.js'
import Calendar from './calendar.js'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
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
            <Tickets />
          </div>
          <div className='col'>
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  )
}
