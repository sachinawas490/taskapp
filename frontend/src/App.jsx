import React from 'react'
import {BrowserRouter,Routes,Route, Router} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App