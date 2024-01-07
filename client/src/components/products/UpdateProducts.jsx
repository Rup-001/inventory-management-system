import NavbarCmp from '../navbar/Navbar'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import React, { useState ,useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate,useParams } from 'react-router-dom'

const UpdateProducts = () => {

    const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    manufacturer: '',
    image: '',
  });

  useEffect(() => {

    axios.get(`http://localhost:5000/api/product/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product data:', error));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    formData.append('manufacturer', product.manufacturer);
    formData.append('image', product.image);

    axios.put(`http://localhost:5000/api/product/products/updateProduct`, formData, {
      id: id,
      ...product,
    })
      .then(response => {
        console.log('Product updated successfully:', response.data);
      })
      .catch(error => console.error('Error updating product:', error));
  };  

    


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
                <Form  onSubmit={handleUpdate} >

                    <Form.Group as={Col} controlId="formGridName">
                      <Form.Label>Products Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Product name" 
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}

                        />

                      </Form.Group>
                    <Form.Group as={Col} controlId="formGridFullDescription">
                      <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name='description' placeholder="Description"
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}

                        />

                      </Form.Group>
                    <Form.Group as={Col} controlId="formGridPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control type="text" name="price" placeholder="Price"
                      value={product.price}
                      onChange={(e) => setProduct({ ...product, price: e.target.value })}
                      />

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridQuantity">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control type="text" name="quantity" placeholder="Quantity"
                      value={product.quantity} 
                      onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                      />

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridManufacturer">
                      <Form.Label>manufacturer</Form.Label>
                      <Form.Control type="text" name='manufacturer' placeholder="Manufacturer" 
                      value={product.manufacturer}
                      onChange={(e) => setProduct({ ...product, manufacturer: e.target.value })}
                      />

                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridImage">
                      <Form.Label>Image</Form.Label>
                      <div>
                        <img src={`http://localhost:5000/postImage/${product.image}`}style={{width:'100px',height:'100px'}}></img>
                      </div>
                      {/* onChange={(e) => setProduct({ ...product, image: e.target.files[0] })} */}
                      <Form.Control type="file" name='image' placeholder="image"
                     onChange={(e) => setProduct({ ...product, image: e.target.files[0]  })}
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
