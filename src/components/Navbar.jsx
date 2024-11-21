import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cart from './Carts/Cart';
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import miniBrand from '../assets/mini_brand_white.png';
import brand from '../assets/brand_white.png';

const NavbarApp = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <Image
              alt=""
              src={brand}
              //width="30"
              height="50"
              className="d-inline-block align-top"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
          </Nav>
          <Nav>
            <Cart/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavbarApp;