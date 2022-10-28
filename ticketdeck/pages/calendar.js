import styles from '../styles/Cards.module.css'
import Card from 'react-bootstrap/Card'

export default function Tickets(){
    return (
        <Card className={styles.card}>
            <Card.Header className={styles.header}>
                <h1>Calendar</h1>
            </Card.Header>
            <Card.Body>
                
            </Card.Body>
        </Card>
    )
}