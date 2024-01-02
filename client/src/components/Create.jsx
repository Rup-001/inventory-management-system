import React, { useState  } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Create = () => {
    const [values, setValues] = useState({
        name: "",
        phone: ""
    })
    const navigate = useNavigate()
    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:3000/users', values)
        .then(res=>{
            console.log(res)
            navigate('/')
        } )
        .catch(err => console.log(err))
    }
  return (
    <div>
      <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-10000' >
        <div className='w-200 rounded bg-white  shadow p-4'>
            <h1>Add a user</h1>
            <form onSubmit={handleSubmit} >
                <div className='mb-2'>
                    <label htmlFor='name' >Name: </label>
                    <input type='text' name='name' className='form-control' placeholder='Enter Name'
                        onChange={e => setValues({...values, name: e.target.value})}
                    />
                    
                </div>
                <div className='mb-2'>
                    <label htmlFor='phone' >Phone: </label>
                    <input type='text' name='phone' className='form-control' placeholder='Enter Phone'
                        onChange={e => setValues({...values, phone: e.target.value})}
                    />
                </div>
                <button className='btn btn-success' >Submit</button>
                <Link to="/" className='btn btn-primary ms-3' >Back</Link>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Create
