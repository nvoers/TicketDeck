import styles from '../styles/Cards.module.css'
import Card from 'react-bootstrap/Card'
import TicketCard from './ticketcard.js'
import Link from 'next/link'


export default function Tickets({ initialTickets }) {

    return (
        <Card className={styles.card}>
            <Card.Header className={styles.header}>
                <h1>My Tickets</h1>
                <Link href="/ticket/add" className={styles.link}>Add ticket +</Link>
            </Card.Header>
            <Card.Body>
                {initialTickets.length > 0
                    ? initialTickets.map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket}/>
                    )) 
                    : <p>You have no tickets yet</p>
                }
            </Card.Body>
        </Card>
    );
}