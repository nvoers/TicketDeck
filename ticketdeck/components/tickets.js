import styles from '../styles/Cards.module.css'
import Card from 'react-bootstrap/Card'
import TicketCard from './ticketcard.js'


export default function Tickets({ initialTickets }) {

    return (
        <Card className={styles.card}>
            <Card.Header className={styles.header}>
                <h1>My Tickets</h1>
            </Card.Header>
            <Card.Body>
                {initialTickets.map((ticket) => (
                    <TicketCard ticket={ticket}/>
                ))}
            </Card.Body>
        </Card>
    );
}