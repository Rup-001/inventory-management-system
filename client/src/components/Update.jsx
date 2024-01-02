import axios from 'axios'
import React from 'react'
import { useState , useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'



const Update = () => {
    // const [data, setData] = useState([])
    const {id} = useParams();
    
    const [values, setValues] = useState({
        name: "",
        phone: ""
    })  
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:3000/users/'+ id)
        .then(res=> {
            setValues(res.data)
        } )
        .catch(err => console.log(err))
    }, [])
     
    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:3000/users/'+id, values)
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
            <h1>update user</h1>
            <form onSubmit={handleUpdate}>
                <div className='mb-2'>
                    <label htmlFor='name' >Name: </label>
                    <input type='text' name='name' className='form-control' placeholder='Enter Name'
                       value={values.name} 
                       onChange={e => setValues({...values, name: e.target.value})}
                    />
                    
                </div>
                <div className='mb-2'>
                    <label htmlFor='phone' >Phone: </label>
                    <input type='text' name='phone' className='form-control' placeholder='Enter Phone'
                        value={values.phone}
                        onChange={e => setValues({...values, phone: e.target.value})}
                    />
                </div>
                <button className='btn btn-success' >update</button>
                <Link to="/" className='btn btn-primary ms-3' >Back</Link>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Update
