import NavbarCmp from '../navbar/Navbar'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import React, { useState  } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const AddProducts = () => {

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        manufacturer: "",
        image: ""
       
        
    })
    const navigate = useNavigate()
    const handleSubmit = (event) =>{
        event.preventDefault();
        const token = localStorage.getItem('token');

  if (!token) {
    // Handle the case where the token is not available, maybe redirect to the login page
    console.error('Token not found in localStorage');
    return;
  }

  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `${token}`,
  };
        axios.post('http://localhost:5000/api/product/addProduct', values , { headers })
        .then(res=>{
            console.log(res)
            navigate('/')
        } )
        .catch(err => console.log(err))
    }




  return (
    <div>
        <NavbarCmp/>
        <Container className="mt-5">
        <Row className="justify-content-center">
        <Col md={6}> 
            <Card>
              <Card.Header>
                <h1>Add Products</h1>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} >

                    <Form.Group as={Col} controlId="formGridName">
                      <Form.Label>Products Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Product name" 
                        onChange={e => setValues({...values, name: e.target.value})}
                        />

                      </Form.Group>
                    <Form.Group as={Col} controlId="formGridFullDescription">
                      <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name='description' placeholder="Description" 
                        onChange={e => setValues({...values, description: e.target.value})}
                        />

                      </Form.Group>
                    <Form.Group as={Col} controlId="formGridPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control type="text" name="price" placeholder="Price" 
                      onChange={e => setValues({...values, price: e.target.value})}
                      />

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridQuantity">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control type="text" name="quantity" placeholder="Quantity" 
                      onChange={e => setValues({...values, quantity: e.target.value})}
                      />

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridManufacturer">
                      <Form.Label>manufacturer</Form.Label>
                      <Form.Control type="text" name='manufacturer' placeholder="Manufacturer" 
                      onChange={e => setValues({...values, manufacturer: e.target.value})}
                      />

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridImage">
                      <Form.Label>Image</Form.Label>
                      <Form.Control type="file" name='image' placeholder="image" 
                      onChange={e => setValues({...values, image: e.target.files[0]})}
                      />

                    </Form.Group>

                  
                 
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form> 
              </Card.Body>
            </Card>
        </Col>     
        </Row>
      </Container>  
      
    </div>
  )
}

export default AddProducts
