import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const ReadProducts = () => {
    const [data, setData] = useState([])
    const {name} = useParams();
    useEffect(()=>{
        axios.put('http://localhost:5000/api/product/products'+name)
        .then(res=> {
            setData(res.data)
            console.log(res)

        } )
        .catch(err => console.log(err))
    }, [name])
  return (
    <div>

<div className='d-flex w-150  justify-content-center align-items-center bg-light vh-10000' >
            <div className='w-100 rounded bg-white border shadow px-5 pt-3 pb-5'>
                <h1>details of user</h1>
                <div className='mb-2' >
                    <strong>Name: {name} </strong>
                </div>
                <div className='mb-2' >
                    <strong>Phone: {data.price} </strong>
                </div>
                <Link to={`/update/${name}`} className='btn btn-success' >Edit</Link>
                <Link to="/" className='btn btn-primary ms-3' >Back</Link>
            </div>
        </div>
      
      
    
      
   
    </div>
  )
}

export default ReadProducts
