import styles from '../styles/Cards.module.css'
import Card from 'react-bootstrap/Card'
import React, { useState } from 'react'
import { PrismaClient, Ticket, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
    const tickets = await prisma.ticket.findMany();

    return {
        props: {
            initialTickets: tickets
        }
    };
}

export default function Tickets({ initialTickets }) {

    console.log(initialTickets);
    const [tickets, setTickets] = useState([]);
    console.log(tickets);

    return (
        <Card className={styles.card}>
            <Card.Header className={styles.header}>
                <h1>My Tickets</h1>
            </Card.Header>
            <Card.Body>
                {tickets.map((ticket) => (
                    <p>{ticket.event}</p>
                ))}
            </Card.Body>
        </Card>
    );
}