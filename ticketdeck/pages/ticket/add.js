import Navigation from '../../components/navigation.js';
import Head from 'next/head';
import styles from '../../styles/Cards.module.css';
import Card from 'react-bootstrap/Card';
import { useForm } from 'react-hook-form';

async function saveTicket(ticket) {
  let eventData = {
    event: ticket.event,
    date: new Date(ticket.date),
    city: ticket.city,
    venue: ticket.venue,
  };
  let ticketData = {
    event: {
      create: eventData,
    },
    code: ticket.code,
    user: {
      connect: {id: 'cl9wt7f940000ve6ns41kimi2'}
    }
  };
  // const eventResponse = await fetch('/api/event', {
  //   method: 'POST',
  //   body: JSON.stringify(eventData),
  // });
  const ticketResponse = await fetch('/api/ticket', {
    method: 'POST',
    body: JSON.stringify(ticketData),
  });

  // if (!eventResponse.ok) {
  //   throw new Error(eventResponse.statusText);
  // }
  if (!ticketResponse.ok) {
    throw new Error(ticketResponse.statusText);
  }
  return await ticketResponse.json();
}

export default function addticket(){

  const { register, handleSubmit, errors } = useForm();
  async function onSubmit(data, e){
    saveTicket(data);
  }

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
                    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <label>event</label>
                        <input type="text" name="event" {...register("event")}/>
                        <label>date</label>
                        <input type="date" name="date" {...register("date")}/>
                        <label>city</label>
                        <input type="text" name="city" {...register("city")}/>
                        <label>venue</label>
                        <input type="text" name="venue" {...register("venue")}/>
                        <label>code</label>
                        <input type="text" name="code" {...register("code")}/>
                        <input type="submit" value="Submit"/>
                    </form>
                    </Card.Body>
                </Card>
            </div>
          </div>
        </div>
      );
}