import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavbar = ({ totalQuantity }) => {
    return (
        <Navbar bg="danger" variant="dark" expand="md">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    FastFood
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Thực đơn
                        </Nav.Link>
                        <Nav.Link as={Link} to="/orders">
                            Đơn hàng
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/foods">
                            Quản lý món
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/cart">
                            Giỏ hàng <Badge bg="light" text="dark">{totalQuantity}</Badge>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
