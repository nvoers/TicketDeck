import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '../styles/Navigation.module.css'

export default function Navigation() {
    return(
        
            <Navbar expand="lg" className={styles.navbar}>
                <div className='container'>
                <Navbar.Brand href="#home">TicketDeck</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#tickets">My tickets</Nav.Link>
                        <Nav.Link href="#link">My profile</Nav.Link>
                        <Nav.Link href="#logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </div>
            </Navbar>
        
    )
}