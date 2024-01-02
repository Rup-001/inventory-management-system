import React, { useState  } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

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
      <div>
      <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-10000' >
        <div className='w-200 rounded bg-white  shadow p-4'>
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor='username' >username: </label>
                    <input type='text' name='username' className='form-control' placeholder='Enter username'
                       onChange={e => setValues({...values, username: e.target.value})}
                    />
                    
                </div>
                <div className='mb-2'>
                    <label htmlFor='password' >password: </label>
                    <input type='text' name='password' className='form-control' placeholder='Enter password'
                      onChange={e => setValues({...values, password: e.target.value})}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='email' >email: </label>
                    <input type='Email' name='email' className='form-control' placeholder='Enter email'
                      onChange={e => setValues({...values, email: e.target.value})}
                    />
                </div><div className='mb-2'>
                    <label htmlFor='role' >role: </label>
                    <input type='text' name='role' className='form-control' placeholder='Enter role'
                      onChange={e => setValues({...values, role: e.target.value})}
                    />
                </div><div className='mb-2'>
                    <label htmlFor='department' >department: </label>
                    <input type='text' name='department' className='form-control' placeholder='Enter department'
                      onChange={e => setValues({...values, department: e.target.value})}
                    />
                </div><div className='mb-2'>
                    <label htmlFor='fullName' >fullName: </label>
                    <input type='text' name='fullName' className='form-control' placeholder='Enter fullName'
                      onChange={e => setValues({...values, fullName: e.target.value})}
                    />
                </div><div className='mb-2'>
                    <label htmlFor='phoneNumber' >phoneNumber: </label>
                    <input type='text' name='phoneNumber' className='form-control' placeholder='Enter phoneNumber'
                      onChange={e => setValues({...values, phoneNumber: e.target.value})}
                    />
                </div><div className='mb-2'>
                    <label htmlFor='city' >city: </label>
                    <input type='text' name='city' className='form-control' placeholder='Enter city'
                      onChange={e => setValues({...values, city: e.target.value})}
                    />
                </div><div className='mb-2'>
                    <label htmlFor='zipCode' >zipCode: </label>
                    <input type='text' name='zipCode' className='form-control' placeholder='Enter zipCode'
                      onChange={e => setValues({...values, zipCode: e.target.value})}
                    />
                </div>
                <button className='btn btn-success' >Submit</button>
                <Link to="/" className='btn btn-primary ms-3' >Back</Link>
            </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Registration
