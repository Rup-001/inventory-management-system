// import './App.css'
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
      <Route path='registration' element={<Registration />} >  </Route>
      <Route path='/admin' element={<Admin />} >  </Route>
      <Route path='/employee' element={<Employee />} >  </Route>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
