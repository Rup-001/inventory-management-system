import React from 'react'
import { useState,useEffect, Link } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container,Nav,Navbar,NavDropdown } from 'react-bootstrap'

const navbar = () => {
  const [user, setUser] = useState([]
   
  );

  const decodeToken = (token) => {
    try {
      // Decode the token to get user information
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token:', error);
      return {};
    }
  };

  useEffect(() => {
    const existingToken = localStorage.getItem('token');
      if (existingToken) {
        // Redirect to the appropriate dashboard or display a message
        const decodedToken = decodeToken(existingToken);
        console.log(decodedToken.username)
        setUser(decodedToken)
        
      }
  }, []);
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    // Optionally, reset the user state
    setUser({});
    navigate('/')
  };


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
          
            <NavDropdown title="Users" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/admin/allUsers">
                All users
              </NavDropdown.Item>
              <NavDropdown.Item href="/admin/AddProducts">
                New Products
              </NavDropdown.Item>              
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link >
            {user.username}
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
    </div>
  )
}

export default navbar
