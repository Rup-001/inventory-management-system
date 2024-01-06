import React, { useState  } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const Registration = () => {



    const [values, setValues] = useState({
        username: "",
        password: "",
        email: "",
        role: "",
        department: "",
        fullName: "",
        phoneNumber: "",
        address: {
            city: "",
        zipCode: "",
        }
        
    })
    const navigate = useNavigate()
    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:5000/api/register', values)
        .then(res=>{
            console.log(res)
            navigate('/')
        } )
        .catch(err => console.log(err))
    }








  return (
    <div>
      <Container className="mt-5">
        <Row className="justify-content-center">
        <Col md={6}> 
            <Card>
              <Card.Header>Registration</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} >
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridUsername">
                      <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name='username' placeholder="Username" 
                        onChange={e => setValues({...values, username: e.target.value})}/>

                      </Form.Group>
                    <Form.Group as={Col} controlId="formGridFullName">
                      <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" name='fullName' placeholder="Full Name" 
                        onChange={e => setValues({...values, fullName: e.target.value})}/>

                      </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" placeholder="Enter email" 
                      onChange={e => setValues({...values, email: e.target.value})}/>

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridRole">
                      <Form.Label>Role</Form.Label>
                      <Form.Control type="text" name="role" placeholder="Enter Role" 
                      onChange={e => setValues({...values, role: e.target.value})}/>

                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name='password' placeholder="Password" 
                      onChange={e => setValues({...values, password: e.target.value})}/>

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPhone">
                      <Form.Label>Phone no</Form.Label>
                      <Form.Control type="text" name='phoneNumber' placeholder="Phone no" 
                      onChange={e => setValues({...values, phoneNumber: e.target.value})}/>

                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control type='text' name='city' 
                      value={values.address.city}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          address: {
                            ...values.address,
                            city: e.target.value,
                          }})}
                      />

                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control type='text' name='zipCode'
                      value={values.address.zipCode}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          address: {
                            ...values.address,
                            zipCode: e.target.value,
                          }}
                       )}/>

                    </Form.Group>
                  </Row>
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

export default Registration
