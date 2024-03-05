// import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Auth/Login'
import Registration from './components/Auth/Registration'
import Admin from './components/Admin/admin'
import Employee from './components/employee/Employee'
import Allproducts from './components/products/AllProducts'
import AddProducts from './components/products/AddProducts'
import UpdateProduct from './components/products/UpdateProducts'
import AllUsers from './components/users/AllUsers'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} >  </Route>
      <Route path='registration' element={<Registration />} >  </Route>
      <Route path='/admin/:username/dashboard' element={<Admin />} >  </Route>
      <Route path='/admin/:username/allUsers' element={<AllUsers />} >  </Route>
      <Route path='/employee/:username/dashboard' element={<Employee />} >  </Route>
      <Route path='/admin/allproducts' element={<Allproducts/>}></Route> 
      <Route path='/admin/AddProducts' element={<AddProducts/>}></Route> 
      <Route path='/admin/Products/:id' element={<UpdateProduct/>}></Route>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
