import React from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export const Navigation: React.FC = () => {
    const location = useLocation();
    const [expand, setExpand] = React.useState(false);

    return (
        <Navbar expand={false} role="navigation" className="bg-dark mb-3 w-100">
            <Container fluid>
                <Navbar.Toggle className="bg-white" aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Brand color="" className="text-white" href="#">
                    <img
                        src="logo.png"
                        alt="Canada Food Guide"
                        height="40px"
                        className="d-inline-block align-top me-2"
                    />
                </Navbar.Brand>

                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="start"
                    className="offcanvas bg-dark"
                    onHide={() => setExpand(false)}
                    onShow={() => setExpand(true)}
                    style={{
                        width: "300px",
                        padding: "20px",
                    }}

                >
                    <Offcanvas.Header>
                        <Offcanvas.Title className="text-white" id={`offcanvasNavbarLabel-expand-${expand}`}>
                            <img
                                src="logo.png"
                                alt="Canada Food Guide"
                                height="50px"
                                style={{marginLeft: -30}}
                                className="d-inline-block align-top"
                            />
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link
                                as={Link}
                                to="/"
                                className={location.pathname === "/" ? "active text-secondary" : "text-white"}
                            >Daily Menu</Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/family"
                                className={location.pathname === "/family" ? "active text-secondary" : "text-white"}
                            >Family Menu</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>

    );
};

