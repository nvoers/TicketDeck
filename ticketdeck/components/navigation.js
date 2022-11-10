import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '../styles/Navigation.module.css';
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navigation() {

    const { data: session, status } = useSession();

    if(session){
        return(
            <Navbar expand="lg" className={styles.navbar}>
                <div className="container">
                <Navbar.Brand href="\">TicketDeck</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="\">My tickets</Nav.Link>
                        <Nav.Link href="#link">My profile</Nav.Link>
                        <Nav.Link href="#logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </div>
            </Navbar>
        )
    }
    else{
        return(
            <Navbar expand="lg" className={styles.navbar}>
                <div className="container">
                <Navbar.Brand href="\">TicketDeck</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </div>
            </Navbar>
        )
    }
}