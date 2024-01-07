import React,{ useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Form, Button, Navbar } from 'react-bootstrap';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import NavbarCmp from '../navbar/Navbar'

const AllProducts = () => {

    const [data, setData] = useState([])
    // const navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:5000/api/product/products')
        .then(res=> setData(res.data) )
        .catch(err => console.log(err))
    }, [])


    const deleteProduct = (name)=> {
        const confirm = window.confirm("sure delete?" +name)
        if(confirm){
            axios.delete(`http://localhost:5000/api/product/products/${name}`)
            .then(res => {
                console.log(res)
                location.reload();
                // setData((prevData) => prevData.filter(product => product._id !== id));

            }).catch(err => console.log(err))
        }

    } 
  return (
    <div>
        <NavbarCmp />
      
      <Container className='mt-10'>
        <Row className='justify-content-center'>
            <Col md ={9}>
                <Card className='mt-5'>
                    <Card.Header className='text-center'>
                        <h1>ALl products</h1>
                    </Card.Header>
                    <Card.Body>
                       <Table striped bordered hover>
                            <thead>
                                <tr>
                                {/* <th>Id</th> */}
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Manufacture</th>
                                <th>Created at</th>
                                <th>Image</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                    data.map((d, i) => (
                        <tr key={i}>
                            {/* <td>{d._id}</td> */}
                            <td>{d.name}</td>
                            <td>{d.description}</td>
                            <td>{d.price}</td>
                            <td>{d.quantity}</td>
                            <td>{d.manufacturer}</td>
                            <td>{d.createdAt}</td>
                            <td>
                                <img src={`http://localhost:5000/postImage/${d.image}`} style={{width:'100px',height:'100px'}}
                                
                                />
                            </td>
                            {/* <td>{d.image}</td> */}
                            <td>
                                {/* <Link to={`/read/${d.id}`}  className='btn btn-sm btn-info me-2 ' >Read</Link> */}

                                {/* <Link to={`/admin/ReadProducts/${d.name}`}  className='btn btn-sm btn-info me-2 ' >Read</Link> */}
                                <Link to={`/admin/Products/${d._id}`}  className='btn btn-sm btn-info me-2 ' >Update</Link>
                                <button className='btn btn-sm btn-danger me-2 ' onClick={e => deleteProduct(d.name)}>Delete</button>
                                {/* <button onClick={e => handleDelete(d.id)} className='btn btn-sm btn-danger ' >Delete</button> */}
                            </td>
                        </tr>
                    ) )
                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
      </Container>

    </div>
  )
}

export default AllProducts
