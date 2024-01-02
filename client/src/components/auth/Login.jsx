import React, { useState  } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const [values, setValues] = useState({
    username: "",
    password: ""
    }
  )

  const decodeToken = (token) => {
    try {
      // Decode the token to get user information
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token:', error);
      return {};
    }
  };

  
  const navigate = useNavigate()
  const handleSubmit = (event) =>{
      event.preventDefault();
      const existingToken = localStorage.getItem('token');
      if (existingToken) {
        // Redirect to the appropriate dashboard or display a message
        const decodedToken = decodeToken(existingToken);
        
        if (decodedToken.role === 'employee') {
          console.log(decodeToken)
          navigate('/employee');
        } else if (decodedToken.role === 'admin') {
          navigate('/admin');
        }
        return;
      }
      axios.post('http://localhost:5000/api/login', values)
      .then((user)=>{
        if(user.data.success)
        {
          if(user.data.message === "Logged in as employee")
          {
            console.log(user)
            localStorage.setItem("token", user.data.token)
            console.log(user.data.message)
            navigate('/employee')
          }
          else if(user.data.message === "Logged in as admin")
          {
            console.log(user)
            localStorage.setItem("token", user.data.token)
            console.log(user.data.message)
            navigate('/admin')
          }
        }
        else{
          if(user.message === 'User not found')
          {
            console.log("user not founf")
          }
        }
      } )
      .catch(errr => 
        {
          if (errr.response && errr.response.status === 401) {
            if(errr.response.data.message === 'User not found')
          {
            console.log(errr)
            console.log("user not founf")
          }
          else
          {
            console.log('Incorrect password');
            alert('Incorrect password');
          }
            
          } else {
            console.error(errr.message || 'An unexpected error occurred. Please try again later.');
          }
        }
        )
  }


  return(
      <div>
  <div>
  <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-10000' >
    <div className='w-200 rounded bg-white  shadow p-4'>
        <h1>User Login</h1>
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

            
            <button className='btn btn-success' >Submit</button>
            <Link to="/" className='btn btn-primary ms-3' >Back</Link>
        </form>
        <div>
          <h5>Go to registration </h5>
          <Link to="/Registration" className='btn btn-primary ms-3' >Register</Link>
        </div>
    </div>
  </div>
</div>
</div>
    )
  }
  


export default Login

