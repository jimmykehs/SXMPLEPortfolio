import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">SXMPLE Studios</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#About">About Us</Nav.Link>
            <Nav.Link href="#Team">Our Team</Nav.Link>
            <Nav.Link href="#Projects">Projects</Nav.Link>
            <Nav.Link href="#Contact">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
