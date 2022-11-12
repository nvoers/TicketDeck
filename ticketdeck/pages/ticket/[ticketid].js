import { useRouter } from 'next/router'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../components/navigation.js'
import styles from '../../styles/Ticket.module.css'
import Card from 'react-bootstrap/Card'
import { PrismaClient} from '@prisma/client';
import { useQRCode } from 'next-qrcode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  const { ticketid } = context.query;
  let ticket = await prisma.ticket.findUnique({
    where: {id: ticketid}
  });
  ticket.event = await prisma.event.findUnique({
    where: {id: ticket.eventId}
  });
  ticket = JSON.parse(JSON.stringify(ticket));
  return {
      props: {
          ticket: ticket
      }
  };
}

const deleteTicket = async (ticketid, router) => {
  const response = await fetch(`http://localhost:3000/api/tickets/${ticketid}`, {
    method: 'DELETE'
  })
  console.log(response)
  const data = await response.json()
  router.push('/')
}

export default function Ticket({ticket}) {
  let date = new Date(ticket.event.date);
  const { Canvas } = useQRCode();
  const router = new useRouter();

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
            <div className='col-8'>
            <Card className={styles.card}>
              <Card.Header className={styles.header}>
                <h1>{ticket.event.event}</h1>
              </Card.Header>
              <Card.Body>
                <h3>{date.toDateString()}</h3>
                <h3>{ticket.event.venue}, {ticket.event.city}</h3>
                <button className={styles.delbtn} onClick={() => deleteTicket(ticket.id, router)}>
                  <FontAwesomeIcon icon={faTrashCan} width="25" color="var(--secondary-color)" className='mt-3'/>
                </button>
              </Card.Body>
            </Card>
            </div>
            <div className={styles.col4}>
              <Canvas className={styles.qr}
                text={ticket.code}
                options={{
                  type: 'image/jpeg',
                  quality: 0.3,
                  level: 'M',
                  margin: 3,
                  scale: 4,
                  width: 300,
                }}
              />
            </div>
        </div>
      </div>
    </div>
  );
}