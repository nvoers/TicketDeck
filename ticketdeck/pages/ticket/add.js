import Navigation from '../../components/navigation.js';
import Head from 'next/head';
import cardstyles from '../../styles/Cards.module.css';
import formstyles from '../../styles/Forms.module.css';
import Card from 'react-bootstrap/Card';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

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
  let router = new useRouter();
  async function onSubmit(data, e){
    saveTicket(data);
    router.push('/');
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
                <Card className={cardstyles.card}>
                    <Card.Header className={cardstyles.header}>
                        <h1>Add ticket</h1>
                    </Card.Header>
                    <Card.Body>
                    <form className={formstyles.form} onSubmit={handleSubmit(onSubmit)}>
                        <label>Event</label>
                        <input type="text" name="event" {...register("event")} className={formstyles.large}/>
                        <label>Date</label>
                        <input type="date" name="date" {...register("date")} className={formstyles.fitted}/>
                        <label>City</label>
                        <input type="text" name="city" {...register("city")} className={formstyles.small}/>
                        <label>Venue</label>
                        <input type="text" name="venue" {...register("venue")} className={formstyles.small}/>
                        <label>Code</label>
                        <input type="text" name="code" {...register("code")} className={formstyles.small}/>
                        <input type="submit" value="Submit" className={formstyles.submit}/>
                    </form>
                    </Card.Body>
                </Card>
            </div>
          </div>
        </div>
      );
}