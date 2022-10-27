import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navigation() {
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">TicketDeck</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">My tickets</Nav.Link>
                    <Nav.Link href="#link">My profile</Nav.Link>
                    <Nav.Link href="#logout">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        
    )
}