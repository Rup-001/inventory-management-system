import React from 'react'
import { useState, Link } from 'react';
// import './YourComponent'
import { Container,Nav,Navbar,NavDropdown } from 'react-bootstrap'

const navbar = () => {
  return (
    <div>

<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Inventory Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Products" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/admin/allproducts">
                All Products
              </NavDropdown.Item>
              <NavDropdown.Item href="/admin/AddProducts">
                Add Products
              </NavDropdown.Item>              
            </NavDropdown>
          </Nav>
          <Nav className="me-auto">
            <NavDropdown title="Users" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/admin/allproducts">
                All users
              </NavDropdown.Item>
              <NavDropdown.Item href="/admin/AddProducts">
                New Products
              </NavDropdown.Item>              
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
    </div>
  )
}

export default navbar
