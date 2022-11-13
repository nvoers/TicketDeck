import { PrismaClient } from '@prisma/client';
import styles from '../styles/TicketCard.module.css'
import Link from 'next/link'

export default function TicketCard({ticket}){
    let date = new Date(ticket.event.date);
    let link = `/ticket/${ticket.id}`;

    return (
        <Link href={link} className={styles.link}>
        <div className={styles.ticket}>
            <div className={styles.date}>
                <h1>{date.toLocaleString('default', { weekday: 'long' }).substring(0,3)}</h1>
                <h2>{date.getDate()} {date.toLocaleString('default', { month: 'short' })}</h2>
            </div>
            <div className={styles.info}>
                <h2 className={styles.infotext}>{ticket.event.event}</h2>
                <p className={styles.infotext}>{ticket.event.venue}, {ticket.event.city}</p>
            </div>
        </div>
        </Link>
    );
}