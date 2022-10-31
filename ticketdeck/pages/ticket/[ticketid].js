import { useRouter } from 'next/router'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../components/navigation.js'
import styles from '../../styles/Ticket.module.css'
import Card from 'react-bootstrap/Card'

export default function Ticket() {
    const router = useRouter()
    const { ticketid } = router.query
    
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
            <Card className={styles.card}>
                <Card.Header className={styles.header}>
                    <h1>Ticket</h1>
                </Card.Header>
            </Card>
            </div>
        </div>
      </div>
    </div>
    );
}