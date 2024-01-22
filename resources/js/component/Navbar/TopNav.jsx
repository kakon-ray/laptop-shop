import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from "react-redux";
import {getCartList} from "../../redux/action/CartListAction";
import { all } from 'axios';

const TopNav = () => {
  const dispatch = useDispatch();

  const allcart = useSelector(
    (state) => state.product.cart
  );

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('cart'));
    console.log(data)
    if (data) {
      dispatch(getCartList(data));
    }

  }, []);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/add-new-laptop">Cart {allcart.length}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default TopNav;