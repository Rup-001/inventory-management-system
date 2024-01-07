import NavbarCmp from '../navbar/Navbar'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import React, { useState ,useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate,useParams } from 'react-router-dom'

const UpdateProducts = () => {

    const [data, setData] = useState([])

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        manufacturer: "",
        image: ""
       
        
    })

    const {id} = useParams()  
    useEffect(()=>{
        axios.get('http://localhost:5000/api/product/products/'+id)
        .then(res=> {
            setData(res.data)
            console.log(res) })
        .catch(err => console.log(err))
    }, [])


  return (
    <div>
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
                <Form  >

                    <Form.Group as={Col} controlId="formGridName">
                      <Form.Label>Products Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Product name" 
                        value={data.name}
                        // onChange={e => setValues({...values, name: e.target.value})}
                        />

                      </Form.Group>
                    <Form.Group as={Col} controlId="formGridFullDescription">
                      <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name='description' placeholder="Description"
                         value={data.description}
                        // onChange={e => setValues({...values, description: e.target.value})}
                        />

                      </Form.Group>
                    <Form.Group as={Col} controlId="formGridPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control type="text" name="price" placeholder="Price"
                      value={data.price} 
                    //   onChange={e => setValues({...values, price: e.target.value})}
                      />

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridQuantity">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control type="text" name="quantity" placeholder="Quantity" 
                      value={data.quantity}
                    //   onChange={e => setValues({...values, quantity: e.target.value})}
                      />

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridManufacturer">
                      <Form.Label>manufacturer</Form.Label>
                      <Form.Control type="text" name='manufacturer' placeholder="Manufacturer" 
                      value={data.manufacturer}
                    //   onChange={e => setValues({...values, manufacturer: e.target.value})}
                      />

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridImage">
                      <Form.Label>Image</Form.Label>
                      <div>
                        <img src={`http://localhost:5000/postImage/${data.image}`} style={{width:'100px',height:'100px'}}></img>
                      </div>
                      <Form.Control type="file" name='image' placeholder="image" 
                    //   value={data.image}
                    //   onChange={e => setValues({...values, image: e.target.files[0]})}
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
    </div>
  )
}

export default UpdateProducts
