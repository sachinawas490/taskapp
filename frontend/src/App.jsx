import React from 'react'
import {BrowserRouter,Routes,Route, Router} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App