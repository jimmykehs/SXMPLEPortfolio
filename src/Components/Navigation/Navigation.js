import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Navigation = ({ loggedIn, setLoggedIn, setToken }) => {
  return (
    <Navbar id="Navigation" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">SXMPLE Studios</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="/#About">About Us</Nav.Link>
            <Nav.Link href="/#Team">Our Team</Nav.Link>
            <Nav.Link href="/#Projects">Projects</Nav.Link>
            <Nav.Link href="/#Contact">Contact Us</Nav.Link>
            {loggedIn ? (
              <>
                <Nav.Link href="/admin">Admin Options</Nav.Link>
                <Nav.Link
                  href="/"
                  onClick={() => {
                    localStorage.removeItem("SXMPLETOKEN");
                    setLoggedIn(false);
                    setToken(null);
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="/login">Admin Portal</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
