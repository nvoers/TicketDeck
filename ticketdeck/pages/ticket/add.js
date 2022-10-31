import Navigation from '../../components/navigation.js';
import Head from 'next/head';
import styles from '../../styles/Cards.module.css';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

async function saveTicket(ticket) {
    const response = await fetch('/api/ticket', {
      method: 'POST',
      body: JSON.stringify(ticket)
    });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
}

export default function addticket(){
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
                <Card className={styles.card}>
                    <Card.Header className={styles.header}>
                        <h1>Add ticket</h1>
                    </Card.Header>
                    <Card.Body>
                    <form action="/api/ticket" method="post">
                        <label for="event">Event name:</label>
                        <input type="text" id="event" name="event" />
                        <label for="code">Code:</label>
                        <input type="text" id="code" name="code" />
                        <button type="submit">Submit</button>
                    </form>
                    </Card.Body>
                </Card>
            </div>
          </div>
        </div>
      );
}