import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Read = () => {
    const [data, setData] = useState([])
    const {id} = useParams();
    useEffect(()=>{
        axios.get('http://localhost:3000/users/'+ id)
        .then(res=> setData(res.data) )
        .catch(err => console.log(err))
    }, [])

  return (
    <div>
        <div className='d-flex w-150  justify-content-center align-items-center bg-light vh-10000' >
            <div className='w-100 rounded bg-white border shadow px-5 pt-3 pb-5'>
                <h1>details of user</h1>
                <div className='mb-2' >
                    <strong>Name: {data.name} </strong>
                </div>
                <div className='mb-2' >
                    <strong>Phone: {data.phone} </strong>
                </div>
                <Link to={`/update/${id}`} className='btn btn-success' >Edit</Link>
                <Link to="/" className='btn btn-primary ms-3' >Back</Link>
            </div>
        </div>
      
    </div>
  )
}

export default Read
