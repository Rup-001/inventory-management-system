import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Create from './components/Create'
import Update from './components/Update'
import Read from './components/Read'
import Login from './components/Auth/Login'
import Registration from './components/Auth/Registration'
import Admin from './components/Admin/admin'
import Employee from './components/employee/Employee'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css'
// import 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js'
// import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js'



function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} >  </Route>
      {/* <Route path='/' element={<Home />} >  </Route> */}
      <Route path='/create' element={<Create />} >  </Route>
      <Route path='/update/:id' element={<Update />} >  </Route>
      <Route path='/read/:id' element={<Read />} >  </Route>
      {/* <Route path='login' element={<Login />} >  </Route> */}
      <Route path='registration' element={<Registration />} >  </Route>
      <Route path='/admin' element={<Admin />} >  </Route>
      <Route path='/employee' element={<Employee />} >  </Route>
    </Routes>
    </BrowserRouter>
    
      {/* <h1>app</h1> */}
    </>
  )
}

export default App
