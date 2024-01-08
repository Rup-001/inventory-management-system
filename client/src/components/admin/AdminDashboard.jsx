import React, { useEffect,useState } from 'react'
import Navbar from '../navbar/Navbar'
import axios from 'axios'
import { useParams, } from 'react-router-dom'


const AdminDashboard = () => {


    
    const {username} = useParams();
    const [data, setData] = useState(
    []
        
)
    useEffect(()=>{
        const token = localStorage.getItem("token")
            axios.get(`http://localhost:5000/api/user/admin/${username}/dashboard`,{
                headers: {
                    Authorization:token
                }
            })
            .then((res) => {
                setData(res.data)
                console.log(res.data);
              })
        .catch(err => console.log(err))
          
    
}, [username])



  return (
    <div>
      <Navbar />

      <h1>Admin Dashboard</h1>
      <h1>data</h1>
<h1>{data.role}</h1>
<h1>{data.username}</h1>
<h1>{data.department}</h1>
<h1>{data.fullName}</h1>
<h1>{data.email}</h1>
<h1>{data.phoneNumber}</h1>

    </div>
  )
}

export default AdminDashboard
